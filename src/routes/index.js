const Router = require('@koa/router');
const router = new Router();
//const mount = require('koa-mount')
//const rBalance = require('./balance.js')
//const rOperations = require('./operations.js')

const {controlBal} = require('../controllers')
const {controlOper} = require('../controllers')


router.get('/tokenBalance/old/:cToken/:address', controlBal.getTokenBalance);
router.get('/tokenBalance/:cToken/:address', controlBal.getCTokenBalance);

router.post('/operations/mint/:cToken/:amount', controlOper.mint);
router.post('/operations/redeem/:cToken/:amount', controlOper.redeem);

//router.use(mount('/tokenBalance', rBalance));
//router.use(mount('/operations', rOperations));

module.exports = router