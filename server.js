const env = process.env.NODE_ENV || 'developpement';
require('dotenv').config({ path: `${__dirname}/config/.env.${env}` });
const Koa = require('koa');
const Router = require('koa-router');
const mobxReact = require('mobx-react');
const next = require('next');
const compress = require('koa-compress');
const zlib = require('zlib');

const dev = env !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

mobxReact.useStaticRendering(true);

app
  .prepare()
  .then(() => {
    const server = new Koa();
    const router = Router();

    if (env !== 'production') {
      server.use(
        compress({
          filter: contentType => /text/i.test(contentType),
          threshold: 2048,
          flush: zlib.Z_SYNC_FLUSH
        })
      );
    }

    router.get('/post/:id', ctx => {
      const actualPage = '/post';
      const queryParams = { id: ctx.params.id };
      ctx.respond = false;
      app.render(ctx.req, ctx.res, actualPage, queryParams);
    });

    router.get('*', async ctx => {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
    });

    server.use(async (ctx, cb) => {
      ctx.res.statusCode = 200;
      await cb();
    });

    server.use(router.routes()).use(router.allowedMethods());
    const port = process.env.PORT || 3000;
    server.listen(port, err => {
      if (err) throw err;
      console.log(`ready on port ${port}`); // eslint-disable-line
    });
  })
  .catch(ex => {
    process.exit(1);
    throw ex.stack;
  });
