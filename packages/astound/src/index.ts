import * as builder from './builder';
import * as config from './config';
import * as configure from './router/configure';
import watch from './watch';
import client from './plugins/client';
import htmlPlugin from './plugins/html';
import { loadModule } from './loader/loader';

export default { ...builder, client, ...config, watch, htmlPlugin, ...configure, loadModule };
