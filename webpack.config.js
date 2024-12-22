import { browserTypescriptApp, copy, html, isWebpackProduction } from '@premierstacks/webpack-stack';

export default function (env, argv) {
  const config = browserTypescriptApp(env, argv);

  config.entry = { index: ['./src/index.ts', './src/index.scss'] };

  config.plugins.push(
    new webpack.EnvironmentPlugin({
      API_DNS: isWebpackProduction(env, argv) ? 'https://api.premierstacks.com' : 'http://localhost:8000',
    }),
  );

  html(env, argv, config, { inject: true, template: './src/index.html', filename: 'index.html', chunks: ['index'] });
  copy(env, argv, config, { patterns: [{ from: './public', to: '.' }] });

  return config;
}
