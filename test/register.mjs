import { registerHooks } from "node:module";

const src = new URL("../src/", import.meta.url);

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      const url = new URL(`${specifier.slice(2)}.ts`, src);
      return nextResolve(url.href, context);
    }
    return nextResolve(specifier, context);
  },
});
