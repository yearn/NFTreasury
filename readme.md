<p align="center">
  <img src="https://user-images.githubusercontent.com/7863230/177352000-91cf996f-8ea5-4841-97e2-2ab6d0b72cbc.png">
</p>

# Quickstart

## Clone

`git clone git@github.com:yearn/NFTreasury.git`

## Install

`yarn install`

## Develop

`yarn dev`

## Build

`yarn start`

## Config

Open [next.config.js](next.config.js) to customize global addresses, keys, and RPC urls

# About

NFTreasury is a simple yet powerful treasury management tool, powered by Yearn. 

We’ll give you a mix of stables and ETH for your short-term project needs, and put your long-term assets in a vault to earn yield until you need them.

## How does it work?

Use the NFTreasury tool to decide what % of your project funds you’ll need for the short term (i.e the next 6 months). The rest of your Eth will be sent to a Yearn vault, safely secured and earning yield.

Next we’ll help you swap your short term funds into a mixture of ETH and USDC which will remain in your wallet so you can start building your project right away.

# Disclaimers

## Yearn Vaults

Vaults are a passive investing strategy, enabling people to put their capital to work via automation.

Each Vault auto-compounds earned tokens, meaning Yearn reinvests earned tokens to generate additional earnings over time.

A strategy is an automated smart contract. It puts your tokens into different protocols to generate yield.

Users benefit from socializing gas costs and need not be experts in defi or the underlying protocols to utilize Yearn Vaults.

## Risk

Vaults and other Yearn decentralized finance systems, while superficially similar to traditional financial transactions in some ways, are in fact very different.

**DeFi and TradFi each have unique costs and benefits, risks and protection mechanisms.**

Please bear this fact in mind when using this website, and do not use Yearn vaults without a sufficient understanding of their unique risks and how they differ from traditional financial transactions.

The only way to fully understand such risks is to have a strong understanding of the relevant technical systems and the incentive design mechanisms they embody - we strongly encourage you to review Yearn’s technical documentation and code before use.

## Why Cowswap?

We use Cowswap because we like cows, swaps, and because they use gas-less orders that are settled peer-to-peer while providing MEV* protection.

You can find out [more](https://cowswap.exchange/#/faq?chain=mainnet) about how they settle trades without incurring slippage & fees.

## *wtf is MEV?

**MEV** stands for **Miner Extractable Value**, and is the term given to the value extracted by miners through the reordering or censoring of blocks.

Imagine if you had to call a broker every time you wanted to buy a monkey jpeg. You tell the broker which monkey you want to buy, she places the order, the order gets filled and you receive your monkey picture. Now imagine there was someone listening in on the call who was able to place an order ahead of yours (which they now know is coming) frontrunning you and making money from the opportunity.

