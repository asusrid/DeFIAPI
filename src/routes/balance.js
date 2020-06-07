const Router = require('@koa/router');
const router = new Router();

const {controlBal} = require('../controllers')


router.get('/old/:cToken/:address', controlBal.getTokenBalance);
router.get('/:cToken/:address', controlBal.getCTokenBalance);


module.exports = router