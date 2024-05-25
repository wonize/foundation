## Usage

### By Functions (single-script)

```typescript
#!/usr/bin/env -S npx bedox
import { main, loop } from "bedo";

main((...args: unknown[]) => {
  console.log("main - example", args);
});

loop(
  (count: number) => {
    console.log("loop - example", count);
  },
  { limit: 10 },
);
```

then execute file by `./filename.ts --custom-arguments`

### By Functions

```typescript
import { main, loop } from "bedo";

main((...args) => {
  console.log("main - example", args);
});

loop(
  (count) => {
    console.log("loop - example", count);
  },
  { limit: 10 },
);
```

then execute file by `node` like `node ./filename.mjs --custom-arguments` or `tsx` like `tsx ./filename.mjs --custom-arguments` or `ts-node` or `bedox`

### By Exports (single-script)

```typescript
#!/usr/bin/env -S npx bedo
export default function main(...args: unknown[]) {
  console.log("main - example", args);
}

export const LOOP_LIMIT = 10;
export function loop(count: number) {
  console.log("loop - example ", count);
}
```

then execute file by `./filename.ts --custom-arguments`

### By Exports (single-script)

```typescript
export default function main(...args) {
  console.log("main - example", args);
}

export const LOOP_LIMIT = 10;
export function loop(count) {
  console.log("loop - example ", count);
}
```

then execute file by `nod` like `node ./filename.mjs --custom-arguments` or `tsx` or `ts-node` or `bedo`
