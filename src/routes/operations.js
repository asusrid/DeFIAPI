const Router = require('@koa/router');
const router = new Router();

const {controlOper} = require('../controllers')

router.post('/mint/:cToken/:amount', controlOper.mint);
router.post('/redeem/:cToken/:amount', controlOper.redeem);

module.exports = router