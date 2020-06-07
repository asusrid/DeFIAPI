const Koa = require('koa');
const app = new Koa();
const Router = require('@koa/router');
const router = new Router();

const {controlOper} = require('../controllers')

app.use(router.post('/mint/:cToken/:amount', controlOper.mint));
app.use(router.post('/redeem/:cToken/:amount', controlOper.redeem));

module.exports = app