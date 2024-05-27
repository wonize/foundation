<div align="center">

[![BANNER][BANNER]][HOMEPAGE]

**Entry Point Script File Executor**

<br/>

![version][VERSION_BADGE]
![MIT License][LICENSE_BADGE]

</div>

The `bedo` is a script file executor that allows defining entry points in various ways and supports TypeScript. It offers features such as the ability to define loop and main entry points with options for clear screen, limit counts, and delay execution.

## Features

- Support Typescript
- Support loop entry point
- Support main entry point
- Support functional or export syntax

## Installation

[![npm][INSTALLATION_NPM_BADGE]][INSTALLATION_NPM]
[![Yarn][INSTALLATION_YARN_BADGE]][INSTALLATION_YARN]
[![pnpm][INSTALLATION_PNPM_BADGE]][INSTALLATION_PNPM]
[![bun][INSTALLATION_BUN_BADGE]][INSTALLATION_BUN]
[![deno][INSTALLATION_DENO_BADGE]][INSTALLATION_DENO]

### npm :

```sh
$ npm install --save-dev bedo
```

### yarn :

```sh
$ yarn add --dev bedo
```

### pnpm :

```sh
$ pnpm add --save-dev bedo
```

### Bun :

```sh
$ bun add --dev bedo
```

## Usage

Bedo accepts entry points in several ways: by defining them directly in the script file or by exporting functions. It supports defining both main and loop entry points.

### Defining Entry Points (single-executable):

```typescript
#!/usr/bin/env -S npx bedox
import { main, loop } from 'bedo';

main((...args: unknown[]) => {
  console.log('main - example', args);
});

loop((count: number) => {
    console.log('loop - example', count);
}, { limit: 10 });
```

Then, To make the script file executable:

```shell
$ sudo chmod +x ./SCRIPT_FILE.ts
```

Next, you can run it with:

```shell
$ ./SCRIPT_FILE.ts
```

or pass the flag arguments to it:

```shell
$ ./SCRIPT_FILE.ts --help
```

### Defining Entry Points

```typescript
import { main, loop } from 'bedo';

main((...args) => {
  console.log('main - example', args);
});

loop(
  (count) => {
    console.log('loop - example', count);
  },
  { limit: 10 },
);
```

Then, to execute the script file, you can follow one of `deno`/`bun`/`node` (or `ts-node`/`tsx` if TypeScript) or `bedox` itself:

```shell
$ bedox ./SCRIPT_FILE.ts
```

### Exporting Entry Points (single-executable):

```typescript
#!/usr/bin/env -S npx bedo
export default function main(...args: unknown[]) {
  console.log('main - example', args);
}

export const LOOP_LIMIT = 10;
export function loop(count: number) {
  console.log('loop - example ', count);
}
```

Make the script file executable:

```shell
$ sudo chmod +x ./SCRIPT_FILE.ts
```

Next, run the script:

```shell
$ ./SCRIPT_FILE.ts
```

or pass the flag arguments:

```shell
$ ./SCRIPT_FILE.ts --help
```

### Exporting Entry Points:

```typescript
export default function main(...args) {
  console.log('main - example', args);
}

export const LOOP_LIMIT = 10;
export function loop(count) {
  console.log('loop - example ', count);
}
```

Then, to execute the script file, you should run it using the `bedo` command:

```shell
$ bedo ./SCRIPT_FILE.ts
```

## API Documentation

Bedo provides the following entry points:

- `main`: To execute once in the entire life of the script execution.
- `loop`: To execute at every duration or frame per second until the limit count is reached.

### Main Entry

To execute once in the entire life of the script execution.
There are two ways to declare the Main Entry Point: _`export default`_ or _functional_.

> [!NOTE]
> Aliases: `main`, `init` and `setup` in functional mode

- Functional Mode:

| Options        | Type       | Default value | Description                                                     |
| -------------- | ---------- | ------------- | --------------------------------------------------------------- |
| `clear_screen` | `boolean?` | `false`       | clear the terminal before executing the `main` entry point once |

- Callback Parameter:

| Parameters | Type        | Description                                  |
| ---------- | ----------- | -------------------------------------------- |
| `...args`  | `unknown[]` | will pass `process.argv.slice(2)` or similar |

### Loop Entry

To execute at every `duration` or `frame` per second (`frame / 1000`) until the `limit` count is reached.
There are two ways to declare the Loop Entry Point: _`export loop`_ or _functional_.

> [!NOTE]
> Aliases: `loop`, `update` and `tick` in functional mode

- Functional Mode:

| Options        | Type       | Default value     | Description                                        |
| -------------- | ---------- | ----------------- | -------------------------------------------------- |
| `clear_screen` | `boolean?` | `false`           | clear screen before each execution of `loop` entry |
| `duration`     | `number?`  | -                 | delay between each execution of `loop` entry.      |
| `frame`        | `number?`  | `30`              | how many frame per seconds can run.                |
| `limit`        | `number?`  | `Number.Infinity` | define limit to how many loop can be run           |

- Exporting Mode:

| Options             | Type       | Default value     | Description                                        |
| ------------------- | ---------- | ----------------- | -------------------------------------------------- |
| `LOOP_CLEAR_SCREEN` | `boolean?` | `false`           | clear screen before each execution of `loop` entry |
| `LOOP_DURATION`     | `number?`  | -                 | delay between each execution of `loop` entry.      |
| `LOOP_FRAME`        | `number?`  | `30`              | how many frame per seconds can run.                |
| `LOOP_LIMIT`        | `number?`  | `Number.Infinity` | define limit to how many loop can be run           |

> ![NOTE]
> if use `duration`, it's override `frame` value

- Callback Parameter:

| Parameters | Type     | Description                                |
| ---------- | -------- | ------------------------------------------ |
| `count`    | `number` | will cache `count` of each execution ticks |

## LICENSE

Under [GPLv3](./LICENSE) for Open Source by [Wonize Group][WONIZE].

<!-- URL -->

[BANNER]: https://raw.githubusercontent.com/wonize/foundation/main/assets/foundation/dark.png
[HOMEPAGE]: https://github.com/wonize/foundation/tree/main/bedo
[INSTALLATION_NPM_BADGE]: https://img.shields.io/static/v1?style=for-the-badge&message=npm&color=CB3837&logo=npm&logoColor=FFFFFF&label=
[INSTALLATION_YARN_BADGE]: https://img.shields.io/static/v1?style=for-the-badge&message=Yarn&color=2C8EBB&logo=Yarn&logoColor=FFFFFF&label=
[INSTALLATION_PNPM_BADGE]: https://img.shields.io/static/v1?style=for-the-badge&message=pnpm&color=FF6C37&logo=pnpm&logoColor=FFFFFF&label=
[INSTALLATION_BUN_BADGE]: https://img.shields.io/static/v1?style=for-the-badge&message=bun&color=E2BD8C&logo=bun&logoColor=FFFFFF&label=
[INSTALLATION_DENO_BADGE]: https://img.shields.io/static/v1?style=for-the-badge&message=deno&color=323232&logo=deno&logoColor=FFFFFF&label=
[INSTALLATION_NPM]: #npm-
[INSTALLATION_YARN]: #yarn-
[INSTALLATION_PNPM]: #pnpm-
[INSTALLATION_BUN]: #bun-
[INSTALLATION_DENO]: https://deno.land/manual@v1.36.4/examples/manage_dependencies
[VERSION_BADGE]: https://img.shields.io/npm/v/bedo?color=00273F&label=VERSION&style=flat-square
[LICENSE_BADGE]: https://img.shields.io/npm/l/bedo?color=00273F&label=LICENSE&style=flat-square
[WONIZE]: https://github.com/wonize
