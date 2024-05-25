/** Entry Points
 * @alias init
 * @alias main
 * @alias setup */
async function setup(fn: SetupFn, option?: SetupOption) {
	if (option?.clear_screen === true) console.clear();
	return fn(...process.argv.slice(2));
}

interface SetupFn {
	(...args: unknown[]): void | unknown | Promise<void | unknown>;
}

interface SetupOption {
	clear_screen?: boolean;
}

interface SetupModule {
	default: SetupFn;
}


export { setup as init, setup as main, setup };
export type { SetupFn, SetupModule, SetupOption };
export default setup;
