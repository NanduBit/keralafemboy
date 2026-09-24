import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { createServer, getServerPort } from '@devvit/web/server';
import { api } from './routes/api';
import { forms } from './routes/forms';
import { menu } from './routes/menu';
import { triggers } from './routes/triggers';

const app = new Hono();

app.route('/api', api);
app.route('/internal/menu', menu);
app.route('/internal/form', forms);
app.route('/internal/triggers', triggers);

serve({
  fetch: app.fetch,
  createServer,
  port: getServerPort(),
});
