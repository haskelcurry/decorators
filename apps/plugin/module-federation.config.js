module.exports = {
  name: 'plugin',
  exposes: {
    './Module': 'apps/plugin/src/app/remote-entry/entry.module.ts',
  },
};
