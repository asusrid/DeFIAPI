const Router = require('@koa/router');
const router = new Router();
const rBalance = require('./balance.js')
const rOperations = require('./operations.js')


router.use('/tokenBalance', rBalance.routes());
router.use('/operations', rOperations.routes());


module.exports = router