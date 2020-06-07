
const Web3 = require('web3');
const web3 = new Web3(process.env.INFURA_URL);
console.log(process.env.INFURA_URL);
web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

const adminAddress = web3.eth.accounts.wallet[0];
const config = require('../config.json');


const cTokens = {
	cBat: new web3.eth.Contract(
		config.cTokenAbi,
		config.cBatAddress
	),
	cDai: new web3.eth.Contract(
		config.cTokenAbi,
		config.cDaiAddress
	)
};


const getTokenBalance = async (ctx) => {
	const cToken = cTokens[ctx.params.cToken];

	await checkCToken(cToken, ctx);

	try{
		const tokenBalance = await cToken
			.methods
			.balanceOfUnderlying(ctx.params.address)
			.call();
		ctx.body = {
			cToken: ctx.params.cToken,
			address: ctx.params.address,
			tokenBalance
		};
	}catch(e){
		console.log(e);
		ctx.status = 500;
		ctx.body = {
			error: 'internal server error'
		}
	}
};

const getCTokenBalance = async (ctx) => {
	const cToken = cTokens[ctx.params.cToken];
	
	await checkCToken(cToken, ctx);

	try{
		const cTokenBalance = await cToken
			.methods
			.balanceOf(ctx.params.address)
			.call();
		ctx.body = {
			cToken: ctx.params.cToken,
			address: ctx.params.address,
			cTokenBalance
		};
	}catch(e){
		console.log(e);
		ctx.status = 500;
		ctx.body = {
			error: 'internal server error'
		}
	}
};

const checkCToken = async (cToken, ctx) => {

	if(typeof cToken === 'undefined'){
		ctx.status = 400;
		ctx.body = {
			error: `cToken ${ctx.params.cToken} does not exist`
		};
		return;
	}
};

module.exports = {
	getTokenBalance,
	getCTokenBalance
}
