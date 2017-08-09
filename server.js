const env = process.env.NODE_ENV || 'developpement';
require('dotenv').config({path: `${__dirname}/config/.env.${env}`});
const koa = require('koa');
const Router = require('koa-router');
const mobxReact = require('mobx-react')
const next = require('next');
const compress = require('koa-compress');
const dev = env !== 'production';
const app = next({ dir: './src', dev });
const handle = app.getRequestHandler();

mobxReact.useStaticRendering(true)

app
  .prepare()
  .then(() => {
    const server = new koa();
    const router = Router();

    if (env !== 'production') {
      server.use(
        compress({
          filter: function(content_type) {
            return /text/i.test(content_type);
          },
          threshold: 2048,
          flush: require('zlib').Z_SYNC_FLUSH
        })
      );
    }

    router.get('*', async ctx => {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
    });

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200;
      await next();
    });

    server.use(router.routes()).use(router.allowedMethods());
    const port = process.env.PORT || 3000;
    server.listen( port, err => {
      if (err) throw err;
      console.log(`ready on port ${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
