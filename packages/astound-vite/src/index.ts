import express from 'express';
import vite from 'vite';
import astound from 'astound';
import url from 'url';
import { join, relative } from 'path';
import { match, pathToRegexp } from 'path-to-regexp';
import { readFileSync } from 'fs';

export default async function start() {
  const config = astound.getConfig();

  const viteServer = await vite.createServer({
    root: join(process.cwd(), config.public || 'public'),
    server: {
      middlewareMode: true,
      watch: {
        ignored: ['**/*/__*.js'],
      },
    },
    appType: 'custom',
  });

  const app = express();

  app.use(viteServer.middlewares);

  app.all('*', (req, res) => {
    const originalurl = url.parse(req.url).pathname;
    astound.ConfigureRoutes(config).forEach(async (routes) => {
      if (match(`/${routes.path.replace(/\\/g, '/')}`)(`${originalurl}/`)) {
        const matches = pathToRegexp(`/${routes.path.replace(/\\/g, '/')}`).exec(`${originalurl}/`);
        const params = {};
        routes.params?.forEach((param, i) => {
          params[param] = matches[i + 1];
        });
        req.params = params;
        if (['ts', 'js'].includes(routes.ext)) {
          const hash = readFileSync(
            join(process.cwd(), config.public || 'public', '.astound', 'client.json')
          ).toString();
          const module = require(relative(
            __dirname,
            join(process.cwd(), config.public || 'public', '.astound', 'server', `${JSON.parse(hash)[routes.file]}.js`)
          ));

          switch (req.method.toLowerCase()) {
            case 'get':
              if (module.get) {
                module.get({ req, res });
              } else if (module.all) {
                module.all({ req, res });
              }
              break;

            case 'post':
              if (module.post) {
                module.post({ req, res });
              } else if (module.all) {
                module.all({ req, res });
              }
              break;

            default:
              break;
          }
        } else {
          let index = readFileSync(join(process.cwd(), config.public || 'public', 'index.html')).toString();

          const hash = readFileSync(
            join(process.cwd(), config.public || 'public', '.astound', 'client.json')
          ).toString();
          index = index.replace(
            '<!--body-->',
            [
              `<script pagemodule src="/.astound/js/${JSON.parse(hash)[routes.file]}.client.js"></script>`,
              `<script pagemodule src="/.astound/js/${JSON.parse(hash)[routes.file]}.js" type="module"></script>`,
            ].join('\n')
          );
          index = index.replace(
            '<!--head-->',
            [
              `<script type="application/json" id="_astound">${`{"astound":true,"params":${JSON.stringify(
                params
              )},"query":${JSON.stringify(req.query)},"url":"${req.url}"}`}</script>`,
              `<script type="application/json" id="_astound_script">["${JSON.parse(hash)[routes.file]}.js", "${
                JSON.parse(hash)[routes.file]
              }.client.js"]</script>`,
            ].join('\n')
          );

          res.send(index);
        }
      }
    });
  });

  app.listen(config.server?.port || 3000);
}
