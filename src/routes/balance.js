const Koa = require('koa');
const app = new Koa();
const Router = require('@koa/router');
const router = new Router();

const {controlBal} = require('../controllers')


app.use(router.get('/old/:cToken/:address', controlBal.getTokenBalance));
app.use(router.get('/:cToken/:address', controlBal.getCTokenBalance));


module.exports = app