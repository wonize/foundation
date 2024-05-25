/** Loop Ticks
 * @alias update
 * @alias tick */
async function loop(fn: LoopFn, option?: LoopOption) {
	const FRAME_PER_MILISECOND: number = option?.duration ?? ((option?.frame ?? 30) / 1000);
	const LOOP_COUNT_LIMIT: number = option?.limit ?? Number.POSITIVE_INFINITY;
	const SHOULD_CLEAR_SCREEN_PER_FRAME: boolean = option?.clear_screen ?? false;
	let count: number = -1;
	let timeout_instance = setTimeout(inner_loop, FRAME_PER_MILISECOND);
	async function inner_loop() {
		clearTimeout(timeout_instance);
		count += 1;
		if (count >= LOOP_COUNT_LIMIT) return;
		if (SHOULD_CLEAR_SCREEN_PER_FRAME === true) console.clear();
		await fn(count);
		timeout_instance = setTimeout(inner_loop, FRAME_PER_MILISECOND);
	}
}

interface LoopFn {
	(count: number): unknown | Promise<unknown>;
}

interface LoopOption {
	limit?: number;
	frame?: number;
	duration?: number;
	clear_screen?: boolean;
}

interface LoopModule {
	loop: LoopFn;
	LOOP_LIMIT?: number;
	LOOP_FRAME?: number;
	LOOP_DURATION?: number;
	LOOP_CLEAR_SCREEN?: boolean;
}

export { loop, loop as tick, loop as update };
export type { LoopFn, LoopModule, LoopOption };
export default loop;
