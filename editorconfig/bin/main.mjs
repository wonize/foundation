#!/bin/env node

import { default as chalk } from 'chalk';
import inquirer from 'inquirer';
import { existsSync as isExists } from 'node:fs';
import { readFile, unlink as removeFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TARGET_FILE_NAME = '.editorconfig';
const SOURCE_FILE_PATH = join(__dirname, '..', TARGET_FILE_NAME);
const STATUS_COLORS = {
	info: 'cyan',
	success: 'green',
	error: 'red',
};

function pretty(status, ...messages) {
	let _status = status;
	let _messages = messages;
	if (!(status in STATUS_COLORS)) {
		_status = 'info';
		_messages = [status, ...messages];
	}

	const prefix_color_name = STATUS_COLORS[_status];
	const prefix_bracket_color = chalk[prefix_color_name];
	const prefix_color = chalk[prefix_color_name.concat('Bright')];
	const prefix = ''
		.concat(prefix_bracket_color.bold('['))
		.concat(prefix_color.bold(_status.toUpperCase()))
		.concat(prefix_bracket_color.bold(']'));

	return prefix
		.concat(' ')
		.concat(..._messages)
		.trim();
}

pretty.echo = function pretty_echo(status, ...message) {
	let level = status;
	if (!(status in console)) level = 'log';
	return console[level](pretty(status, message));
};

async function prompt(message, { alt }) {
	const answer = await inquirer.prompt([
		{
			name: 'path',
			message: pretty(message),
			default: alt,
			prefix: '',
		},
	]);
	return answer['path'];
}

async function choice(message, { alt, choices }) {
	const answers = await inquirer.prompt([
		{
			type: 'list',
			name: 'select',
			message: pretty(message),
			default: alt,
			choices,
			prefix: '',
		},
	]);
	return answers['select'];
}

async function confirm(message, { alt }) {
	const answer = await inquirer.prompt([
		{
			type: 'confirm',
			name: 'yesOrNo',
			message: pretty(message),
			default: alt,
			prefix: '',
		},
	]);
	return answer['yesOrNo'];
}

async function writefile(where, content) {
	await writeFile(where, content, 'utf-8');
	return;
}

async function main(args) {
	let targetDirectory = args;
	if (!targetDirectory) {
		targetDirectory = await prompt('Where should the ".editorconfig" file be created?', {
			alt: '.',
		});
	}

	let contentConfigs = await readFile(SOURCE_FILE_PATH, 'utf-8');
	const targetFilePath = join(process.cwd(), targetDirectory, TARGET_FILE_NAME);

	if (isExists(targetFilePath)) {
		pretty.echo(`Already exists in "${chalk.bold(targetFilePath)}"`);
		const shouldDo = await choice('What operation do you want to perform?', {
			alt: 'Concatenate',
			choices: [
				{ name: 'Delete', value: 'Delete' },
				{ name: 'Concatenate', value: 'Concatenate' },
			],
		});

		if (shouldDo === 'Delete') {
			await removeFile(targetFilePath);
			pretty.echo('success', `Deleted from "${chalk.bold(targetFilePath)}"`);
		} else {
			const existConfigs = await readFile(targetFilePath, 'utf-8');
			if (existConfigs !== contentConfigs) {
				contentConfigs = contentConfigs.concat('\n').concat(existConfigs);
				pretty.echo('success', `Concatenate from "${chalk.bold(targetFilePath)}"`);
			}
		}
	}

	await writefile(targetFilePath, contentConfigs);
	pretty.echo('success', `Add to "${chalk.bold(targetFilePath)}"`);
}

main(process.argv[2]).catch(function exception(error) {
	pretty.echo('error', 'An unhandled exception occurred:', error);
	process.exit(1);
});
