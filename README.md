# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Technology Stack

- **Runtime**: Node.js v24.6.0 (LTS) | [Docs](https://nodejs.org/docs/latest-v24.x/)
- **Package Manager**: [pnpm](https://pnpm.io) | [Docs](https://pnpm.io/cli)
- **Framework**: [Svelte](https://svelte.dev) | [Creating a Project](https://svelte.dev/docs/kit/creating-a-project) | [Docs](https://svelte.dev/docs)
- **Linting**: [oxlint](https://oxc.rs) | [Linter Guide](https://oxc.rs/docs/guide/usage/linter.html)
- **Code Formatting**: [dprint](https://dprint.dev) | [CLI Documentation](https://dprint.dev/cli/)

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
pnpm create sv

# create a new project in my-app
pnpm create sv my-app
```

## Developing

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```sh
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```sh
pnpm run build
```

You can preview the production build with `pnpm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
