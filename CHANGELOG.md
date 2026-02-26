# Changelog

Entries are ordered newest first. Format: `## [vX] - YYYY-MM-DD — summary`.

## [v5] - 2026-02-26 — webpack 5 migration & cleanup

### Removed packages
- `clean-webpack-plugin` — replaced by `output.clean: true` in webpack config
- `file-loader` — replaced by webpack 5 native asset modules (`type: 'asset/resource'`)
- `node-sass` — replaced by `sass` (dart-sass); node-sass was deprecated and broken on Node 18+
- `optimize-css-assets-webpack-plugin` — replaced by `css-minimizer-webpack-plugin`
- `terser-webpack-plugin` — webpack 5 includes Terser by default in production mode
- `html-webpack-injector` — not compatible with webpack 5; replaced by explicit `inject: 'body'` on HtmlWebpackPlugin instances
- `module-to-cdn` — was unused in the webpack config
- `svg-inline-loader` — no SVG imports exist in the codebase
- `worker-loader` — only served the (now removed) splash page physics worker
- `three-orbit-controls` — only used by the splash page
- `lodash.get`, `lodash.set` — only used by the splash page

### Upgraded packages
| Package | Old | New |
|---|---|---|
| `webpack` | ^4.44.2 | ^5.97.1 |
| `webpack-cli` | ^3.3.12 | ^5.1.4 |
| `webpack-dev-server` | ^3.11.0 | ^5.2.0 |
| `html-webpack-plugin` | ^3.2.0 | ^5.6.3 |
| `mini-css-extract-plugin` | ^0.5.0 | ^2.9.2 |
| `css-loader` | ^2.1.1 | ^7.1.2 |
| `sass-loader` | ^7.3.1 | ^16.0.4 |
| `style-loader` | ^0.23.1 | ^4.0.0 |
| `copy-webpack-plugin` | ^4.6.0 | ^12.0.2 |
| `image-webpack-loader` | ^4.6.0 | ^8.1.0 |
| `express` (serve-production-assets) | ^4.16.4 | ^4.21.2 |

### webpack config changes
- `CopyWebpackPlugin`: array API `[{from, to}]` → object API `{patterns: [{from, to}]}`
- `[hash]` → `[contenthash]` in output filenames for correct cache busting
- `pngquant.quality`: string `'65-90'` → array `[0.65, 0.90]` (updated loader API)
- Dev server start command: `webpack-dev-server` → `webpack serve`
- Removed unused externals (`three`), loader rules (`svg-inline-loader`, `worker-loader`) from both configs

### Splash page removed
- Deleted `src/js/splash-page/` (Three.js WebGL animation with physics worker)
- The splash page had been commented out at the entry point and was never included in any build
