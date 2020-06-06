# DeFiAPI
 
Project to learn how to build an Defi API. It is implemented using Koa framework from NodeJS, Web3, Infura, Compound and Heroku. There are 4 endpoints: 

1. Get the current balance of the current contract

/tokenBalance/:cToken/:address

2. Current balance of another contract

/cTokenBalance/:cToken/:address

3. Send tokens

/mint/:cToken/:amount

4. Redeem tokens

/redeem/:cToken/:amount

As an example, here is one of the endpoints to call the token balance GET call from the API:

https://radiant-plains-40866.herokuapp.com/tokenBalance/cDai/0x0d0289e9f3eae696fa38e86fc4456228dc1792a7
