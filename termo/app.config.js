module.exports = ({ config }) => ({
  ...config,
  experiments: {
    ...config.experiments,
    baseUrl: (process.env.DEMO_BASE_PATH ?? '/demos/termo').replace(/\/$/, ''),
  },
});
