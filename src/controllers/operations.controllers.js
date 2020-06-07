const Web3 = require('web3');
const web3 = new Web3(process.env.INFURA_URL);
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


const mint = async (ctx) => {
	const cToken = cTokens[ctx.params.cToken];
	
	if(typeof cToken === 'undefined'){
		ctx.status = 400;
		ctx.body = {
			error: `cToken ${ctx.params.cToken} does not exist`
		};
		return;
	}

	const tokenAddress = await cToken
		.methods
		.underlying()
		.call();

	const token = new web3.eth.Contract(
		config.ERC20Abi,
		tokenAddress
	);

	await token
		.methods
		.approve(cToken.options.address, ctx.params,amount)
		.send({from: adminAddress});


	try{
		const tokenBalance = await cToken
			.methods
			.mint(ctx.params.amount)
			.send({from: adminAddress});
		ctx.body = {
			cToken: ctx.params.cToken,
			address: adminAddress,
			amountMinted: ctx.params.amount
		};
	}catch(e){
		console.log(e);
		ctx.status = 500;
		ctx.body = {
			error: 'internal server error'
		}
	}
};

const redeem = async (ctx) => {
	const cToken = cTokens[ctx.params.cToken];
	
	if(typeof cToken === 'undefined'){
		ctx.status = 400;
		ctx.body = {
			error: `cToken ${ctx.params.cToken} does not exist`
		};
		return;
	}

	try{
		const tokenBalance = await cToken
			.methods
			.redeem(ctx.params.amount)
			.send({from: adminAddress});
		ctx.body = {
			cToken: ctx.params.cToken,
			address: adminAddress,
			amountRedeemed: ctx.params.amount
		};
	}catch(e){
		console.log(e);
		ctx.status = 500;
		ctx.body = {
			error: 'internal server error'
		}
	}
};


module.exports = {
	mint,
	redeem
}	