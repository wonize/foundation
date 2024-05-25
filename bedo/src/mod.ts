import type { LoopModule } from './loop';
import type { SetupModule } from './setup';

export interface BedoModule extends LoopModule, SetupModule { }

export { loop, tick, update } from './loop';
export type { LoopFn, LoopModule, LoopOption } from './loop';

export { init, main, setup } from './setup';
export type { SetupFn, SetupModule, SetupOption } from './setup';
