const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
const { join } = require('path');

module.exports = (pkg) => {
  esbuild.build({
    entryPoints: [join('packages', pkg, 'client/index.ts')],
    bundle: true,
    minify: true,
    platform: 'neutral',
    outfile: join(process.cwd(), 'packages', pkg, 'dist/client.js'),
    plugins: [
      nodeExternalsPlugin({
        packagePath: join('packages', pkg, 'package.json'),
      }),
    ],
  });
};
