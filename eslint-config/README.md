## INSTALL

**Install `@wonize/eslint-config`**

> npm

```sh
$ npm install @wonize/eslint-config --save-dev
```

> yarn

```sh
$ yarn add @wonize/eslint-config --dev
```

> pnpm

```sh
$ pnpm add @wonize/eslint-config --save-dev
```

> bun

```sh
$ bun add @wonize/eslint-config --dev
```

## USAGE

**Install with CLI**

In **interactive** way, via run:

```sh
$ npx w-eslint
```

> [!NOTE]
>
> There is [MANUAL](#MANUAL) way.\
> To Configure **All-In-One**, try [FOUNDATION](https://github.com/wonize/foundation).

### MANUAL

**1. Remove ESLint Configuration File**

Include:

- `.eslintrc`
- `.eslintrc.js`
- `.eslintrc.mjs`
- `.eslintrc.cjs`
- `.eslintrc.ts`
- `.eslintrc.mts`
- `.eslintrc.cts`
- `.eslintrc.json`
- `.eslintrc.yml`
- `.eslintrc.yaml`

**2. Extend**

In your `package.json` file, add below snippet:

```jsonc
"eslintConfig": {
  "extends": "@wonize/eslint-config"
}
```

For more customizable the rules, you can:

```jsonc
"eslintConfig": {
  "extends": [
    // your rest extention configs
    "@wonize/eslint-config"
  ],
  "rules": {
    // also, can you overrride rules
  }
}
```

To Extend Seperated Way, possible inside `@wonize/eslint-config` as default:

```jsonc
"eslintConfig": {
  "extends": [
    // another configurations
    "@wonize/eslint-config/prettier",
    "@wonize/eslint-config/typescript",
    "@wonize/eslint-config/imports",
  ],
}
```

For More [Possibles](#POSIBBLES)

**3. Add To `scripts`**

```jsonc
"scripts": {
  "eslint": "eslint . --ext .ts,.tsx"
}
```

Execute Once the `$ npm run eslint`

**4. Enjoy**

## POSIBBLES

|   # | name                                | status    |
| --: | ----------------------------------- | --------- |
|   1 | `@wonize/eslint-config/vue`         | planned   |
|   2 | `@wonize/eslint-config/vue-ts`      | planned   |
|   3 | `@wonize/eslint-config/astro`       | planned   |
|   4 | `@wonize/eslint-config/react`       | planned   |
|   5 | `@wonize/eslint-config/react-ts`    | planned   |
|   6 | `@wonize/eslint-config/svelte`      | planned   |
|   7 | `@wonize/eslint-config/sveltekit`   | planned   |
|   8 | `@wonize/eslint-config/prettier`    | planned   |
|   9 | `@wonize/eslint-config/typescript`  | planned   |
|  10 | `@wonize/eslint-config/imports`     | planned   |
|  11 | `@wonize/eslint-config/unocss`      | planned   |
|  12 | `@wonize/eslint-config/tailwindcss` | planned   |
|  13 | `@wonize/eslint-config/javascript`  | unplanned |
|  14 | `@wonize/eslint-config/css`         | unplanned |
|  15 | `@wonize/eslint-config/html`        | unplanned |
|  16 | `@wonize/eslint-config/json`        | unplanned |
|  17 | `@wonize/eslint-config/markdown`    | unplanned |
