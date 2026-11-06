module.exports = ({ config }) => ({
  ...config,
  android: {
    ...config.android,
    config: { ...config.android?.config, googleMaps: { apiKey: process.env.GOOGLE_MAPS_ANDROID_API_KEY || '' } },
  },
  experiments: {
    ...config.experiments,
    baseUrl: (process.env.DEMO_BASE_PATH ?? '/demos/medlive').replace(/\/$/, ''),
  },
});
