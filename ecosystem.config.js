module.exports = {
  apps: [
    {
      name: 'multiple-app',
      script: 'yarn',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
