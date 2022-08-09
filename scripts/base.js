const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
const { join } = require('path');

module.exports = (pkg, type = 'node') => {
  esbuild.build({
    entryPoints: [join('packages', pkg, 'src/index.ts')],
    bundle: true,
    minify: true,
    platform: 'node',
    outfile: join(process.cwd(), 'packages', pkg, 'dist/index.js'),
    plugins: [
      nodeExternalsPlugin({
        packagePath: join('packages', pkg, 'package.json'),
      }),
    ],
  });
};
