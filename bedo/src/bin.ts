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
	const mod: BedoModule = await import(mod_filepath);

	if (typeof mod.default !== 'function') {
		throw 'Launch: Are you sure <default> export is function?';
	}

	await setup(mod.default);

	if ('loop' in mod === false) return;
	if (typeof mod.loop !== 'function') {
		throw 'Launch: Are you sure named <loop> export is function?';
	}

	return loop(mod.loop, {
		frame: mod.LOOP_FRAME,
		limit: mod.LOOP_LIMIT,
		duration: mod.LOOP_DURATION,
		clear_screen: mod.LOOP_CLEAR_SCREEN,
	});
}

bedo_bin().catch(function bedo_catch(err) {
	console.error(err);
	process.exit(1);
});
