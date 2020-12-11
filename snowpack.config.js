/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    mount: {
      // directory name: 'build directory'
      public: "/",
      src: "/_dist_",
      /* ... */
    },
    plugins: [
      /* ... */
    ],
    install: [
      /* ... */
    ],
    installOptions: {
      polyfillNode: true,
      /* ... */
    },
    devOptions: {
      /* ... */
    },
    buildOptions: {
      /* ... */
    },
    proxy: {
      /* ... */
    },
    alias: {
      /* ... */
    },
  };
  