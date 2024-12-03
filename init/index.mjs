#!/usr/bin/env node

import { confirm } from '@inquirer/prompts';
import axios from 'axios';
import chalk from 'chalk';
import { Command } from 'commander';
import fs from 'node:fs';
import path from 'node:path';

// Value Object: TemplateFile
class TemplateFile {
  constructor(source, target) {
    if (!source || !target) {
      throw new Error('Both source and target must be provided.');
    }
    this.source = source;
    this.target = target;
  }

  getSourcePath() {
    return this.source;
  }

  getTargetPath() {
    return this.target;
  }
}

// Value Object: Template
class Template {
  constructor(name) {
    if (!name) {
      throw new Error('Template name must be provided.');
    }
    this.name = name;
    this.files = [];
  }

  addFile(source, target) {
    const templateFile = new TemplateFile(source, target);
    this.files.push(templateFile);
  }

  getFiles() {
    return this.files;
  }

  async createFiles(fileManager) {
    let allFilesCreated = true;

    for (const templateFile of this.files) {
      const success = await fileManager.createFile(
        templateFile.getSourcePath(),
        templateFile.getTargetPath(),
      );
      if (!success) {
        allFilesCreated = false;
      }
    }

    return allFilesCreated;
  }
}

// Factory: TemplateFactory (Creates templates dynamically)
class TemplateFactory {
  static createTemplate(name) {
    const template = new Template(name);

    switch (name) {
      case 'editorconfig':
        template.addFile('editorconfig.txt', '.editorconfig');
        break;
      case 'prettier':
        template.addFile('prettier.txt', 'prettier.config.mjs');
        template.addFile('prettierignore.txt', '.prettierignore');
        break;
      case 'vscode':
        template.addFile('vscodesettings.txt', '.vscode/settings.json');
        template.addFile('vscodeextensions.txt', '.vscode/extensions.json');
        break;
      case 'gitignore':
        template.addFile('gitignore.txt', '.gitignore');
        break;
      case 'gitattributes':
        template.addFile('gitattributes.txt', '.gitattributes');
        break;
      case 'gitconfig':
        template.addFile('gitattributes.txt', '.gitattributes');
        template.addFile('gitignore.txt', '.gitignore');
        break;
      case 'license':
        template.addFile('license.txt', 'LICENSE');
        break;
      default:
        throw new Error(`Unknown template: ${name}`);
    }

    return template;
  }
}

// Strategy: FileCreationStrategy (Handles different file creation behaviors)
class FileCreationStrategy {
  constructor(force, verbose) {
    this.force = force;
    this.verbose = verbose;
  }

  async handleExistingFile(filePath, fileManager) {
    if (fs.existsSync(filePath)) {
      if (this.force) {
        console.log(chalk.yellow(`Force overwriting: ${filePath}`));
        return true; // Continue to create the file
      } else {
        const { overwrite } = await confirm({
          message: `File ${chalk.bold(
            filePath,
          )} already exists. Do you want to overwrite it?`,
          default: false,
        });
        return overwrite;
      }
    }
    return true; // No file exists, continue to create
  }

  async createFile(source, target, fileManager) {
    const targetPath = path.resolve(target);
    const shouldCreate = await this.handleExistingFile(targetPath, fileManager);

    if (shouldCreate) {
      if (this.verbose) {
        console.log(chalk.blue(`Fetching template: ${chalk.bold(source)}`));
      }

      try {
        const templateContent = await fileManager.fetchTemplateContent(source);
        fs.writeFileSync(targetPath, templateContent);

        console.log(chalk.green(`Created: ${chalk.bold(targetPath)}`));
      } catch (error) {
        console.error(chalk.red(`Error creating ${chalk.bold(target)}: ${error.message}`));
        return false;
      }
    } else {
      console.log(chalk.red(`Skipping: ${chalk.bold(target)}`));
    }
    return true;
  }
}

// Template Method: FileManager (Template for creating files)
class FileManager {
  constructor(strategy) {
    this.strategy = strategy;
  }

  async fetchTemplateContent(fileName) {
    try {
      const response = await axios.get(`${Config.BASE_URL}/${fileName}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch template ${fileName}: ${error.message}`);
    }
  }

  async createFile(source, target) {
    return await this.strategy.createFile(source, target, this);
  }
}

class Dependency {
  static list = [
    `npm init -y`,
    `alias pnpmadd='pnpm add --save-exact --save-peer --strict-peer-deps --verbose'`,
    `pnpmadd --save-dev typescript`,
    `pnpmadd --save-dev @types/node`,
    `pnpmadd --save-dev vitest`,
    `pnpmadd --save-dev tsup`,
    `pnpmadd --save-dev tsx`,
    `pnpmadd --save-dev terser`,
    `pnpmadd --save-dev tasuku`,
    `pnpmadd --save-dev lint-staged`,
    `pnpmadd --save-dev jsdom`,
    `pnpmadd --save-dev husky`,
    `pnpmadd --save-dev @vitest/ui`,
    `pnpmadd --save-dev @vitest/coverage-v8`,
    `pnpmadd --save-dev @vitest/browser`,
    `pnpmadd --save-dev @testing-library/jest-dom`,
    `pnpmadd --save-dev @testing-library/dom`,
    `pnpmadd --save-dev @changesets/cli`,
    `pnpmadd --save-dev @antfu/ni`
  ]
}

// CLI - Manages the command-line interface
class CLI {
  constructor() {
    this.program = new Command();
    this.fileManager = null;
    this.setupCLI();
  }

  setupCLI() {
    console.log(chalk.cyan(`\nApp Version: ${Config.VERSION}\n`));

    const templates = [
      'editorconfig',
      'prettier',
      'gitignore',
      'gitattributes',
      'gitconfig',
      'license',
    ];

    templates.forEach((templateName) => {
      this.program
        .command(templateName)
        .description(`Create ${templateName} config files`)
        .option('-v, --verbose', 'Enable verbose logging')
        .option('--force', 'Force overwrite existing files without prompt')
        .action(async (cmd) => {
          const { verbose, force } = cmd;

          this.logFlags(verbose, force);

          const strategy = new FileCreationStrategy(force, verbose);
          this.fileManager = new FileManager(strategy);

          console.log(
            chalk.cyan(`\nRunning ${chalk.bold(templateName)} template creation...`),
          );

          const template = TemplateFactory.createTemplate(templateName);
          const allFilesCreated = await template.createFiles(this.fileManager);

          if (!allFilesCreated) {
            console.log(
              chalk.yellow(`Some files were skipped or failed to be created.`),
            );
          }
        });
    });
  }

  logFlags(verbose, force) {
    console.log(chalk.yellow(`\nFlags enabled:`));
    if (verbose) {
      console.log(chalk.green(' - Verbose logging enabled'));
    }
    if (force) {
      console.log(chalk.green(' - Force overwrite enabled'));
    }
  }

  start() {
    this.program.parse(process.argv);
  }
}

// Config: Global constants
class Config {
  static BASE_URL = 'https://unpkg.com/@wonize/init@latest/templates';
  static VERSION = '1.0.9';
  static MAX_RETRIES = 3;
  static RETRY_DELAY = 1000;
}

// App - Runs the CLI
class App {
  constructor() {
    this.cli = new CLI();
  }

  run() {
    this.cli.start();
  }
}

new App().run();
