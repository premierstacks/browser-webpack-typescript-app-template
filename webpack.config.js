import { browserTypescriptApp, chunks, copy, html } from '@premierstacks/webpack-stack';

export default function (env, argv) {
  const config = browserTypescriptApp(env, argv);

  config.entry = { index: ['./src/index.ts', './src/index.scss'] };

  config.output.publicPath = '/';

  html(env, argv, config, { inject: true, template: './src/index.html', filename: 'index.html', chunks: ['index'] });
  chunks(env, argv, config);
  copy(env, argv, config, { patterns: [{ from: './public', to: '.' }] });

  return config;
}
