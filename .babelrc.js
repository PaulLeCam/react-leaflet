const targets = {
  node: "current",
  browsers: [
    "last 2 Chrome versions",
    "last 2 Edge versions",
    "last 2 Firefox versions",
    "last 2 iOS versions",
    "last 2 Opera versions",
    "last 2 Safari versions",
    "last 2 Samsung versions",
  ],
};

module.exports = {
  presets: ["@babel/preset-react", "@babel/preset-typescript"],
  env: {
    development: {
      presets: [
        [
          "@babel/preset-env",
          {
            loose: true,
            modules: "commonjs",
            targets,
          },
        ],
      ],
      plugins: ["@babel/plugin-proposal-nullish-coalescing-operator"],
    },
    rollup: {
      presets: [
        [
          "@babel/preset-env",
          {
            loose: true,
            modules: false,
            targets,
          },
        ],
      ],
    },
    esm: {
      presets: [
        [
          "@babel/preset-env",
          {
            loose: true,
            modules: false,
            targets,
          },
        ],
      ],
      plugins: ["@babel/plugin-proposal-nullish-coalescing-operator"],
    },
  },
};
