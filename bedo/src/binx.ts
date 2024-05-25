#!/usr/bin/env -S npx tsx
import { resolve as path_resolve } from 'node:path';
import process from 'node:process';
import type { BedoModule } from './mod';
import { loop, setup } from './mod';

const __cwdname = path_resolve(process.cwd());

async function bedo_bin(): Promise<unknown> {
	if (process.argv.length <= 2) {
		throw 'Launch: Where is your file path to launch?';
	}

	const argument = process.argv.at(2);
	if (typeof argument === 'undefined') {
		throw 'Launch: the thrid argument you pass is undefined! should be a file path?';
	}

	const mod_filepath = path_resolve(__cwdname, argument);
	return import(mod_filepath);
}

bedo_bin().catch(function bedo_catch(err) {
	console.error(err);
	process.exit(1);
});
