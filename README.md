# Introduction

Congratulations, you've stumbled upon Open-Source-Economy POC— the future of open-source competitiveness.

[Live website link](https://frontend-alpha-umber.vercel.app/)

If you run the project locally, you will need to create an `.env` file at the root of the project with the following variables:

```
# github token. You can get one here: https://github.com/settings/tokens
REACT_APP_GITHUB_TOKEN
```

`npm install` And then run `npm start` to start the project.

The backend is deployed on Solana DevNet, so you will need to connect to it to interact with the smart contracts.

The default and only asset to exchange for different project token right now is devUSDC of mint `BRjpCHtyQLNCo8gqRUr8jtdAj5AjPYQaoqbvcZiHok1k`
Mint them [here](https://everlastingsong.github.io/nebula/)

# Disclaimer

```diff
-This is still just a POC. Tests and feedback will go a long way.
-However, for the love of open-source, please do not use it to attract funds or fund projects as it is not yet ready for that.
```

# What is Open-Source-Economy?

Open-Source-Economy (OSE) is an open-source marketplace aiming to disrupt the current imbalance with closed software by bringing more funding to our ecosystem.

Our marketplace bridges the gap between all open-source actors:

    Maintainers: Responsible for software quality and project development.

    Contributors: Submit code upgrades.

    Users: Utilize an open-source program.

    Backers: Fund open-source projects.

Each open-source project can easily create its own token, allowing all the actors around them to easily exchange value, and bringing more funding to the ecosystem.

[Read more about OSE](https://blog.open-source-economy.com/make-open-source-finally-work-c8ab46fcc331)

## Manual

Here's how to identify yourself, register a project, create its token, select a project, donate, or swap project tokens.

### Connect a Wallet

Start on the home page — the hub of our marketplace.

Connect a Phantom wallet to identify yourself. If you don't have one, you can download the Phantom browser wallet at: https://phantom.app/download

We are currently running on the Solana testnet; use your wallet accordingly.

### Project Registration

#### Action

Prerequisite:

    Connect a wallet

To register a project on our marketplace, navigate to our home page: TODO

Press "Register a Project" and enter:

    Owner: The GitHub project owner's name.

    Repository: The name of the project repository on GitHub.

Example : in this page : https://github.com/facebook/react
the Owner is `Facebook` and Repository is `React`

#### Specification

Once submitted, two IDL functions are called:

```rust
pub fn initialize(
        ctx: Context<Initialize>,
        owner: String, // project owner
        repository: String, // repository name
        project_bump: u8,
    ) -> Result<()>
```

Anyone can register a project; you just need the owner and repository name.

```rust
pub fn set_up_abc(
    ctx: Context<SetUpABC>,
    constant_mint: u64, //project token mint price
    constant_redeem: u64, //project token redeem price
    ) -> Result<()>
```

Currently, we only support a flat curve. The augmented bonding curve is yet to be implemented. Users get an automatic and constant minting and redeeming price.

The quote asset is devUSDC, it will be the currency use to buy and sell project tokens.

```diff
-Disclaimer
- devUSD public key is : BRjpCHtyQLNCo8gqRUr8jtdAj5AjPYQaoqbvcZiHok1k
- Do not buy different ones if you wish to interact with our smartcontracts
```

_We aim to allow projects to customize these parameters in the near future._

#### Result

Once registered, your project will appear alongside others on the home page.

### Donation

#### Action

Donate to a project you want to support

Prerequisites:

    1. Connected wallet
    2. Project you want to support is already registered

Click on a project on the home page to arrive at the project page. In addition to project metrics, you'll see a panel with two options: donate and swap.

Select "Donate" and enter the amount you wish to give.

#### Specification

Once submitted an IDL function is called -

```rust
    // abc does not have to be set up
    pub fn donate(ctx: Context<Donate>,
     quote_amount: u64 //amount of assets to be donated
     ) -> Result<()>
```

Donations must be made in the asset the project operates with, which in this poc is devUSDC.

```diff
-Disclaimer
- devUSD public key is : BRjpCHtyQLNCo8gqRUr8jtdAj5AjPYQaoqbvcZiHok1k
- Do not buy different ones if you wish to interact with our smartcontracts
```

_We aim to offer more choices in donation currencies in the near future._

#### Result

Upon completion, the donation will be converted to the project token, which the project will receive.

![Alt text](<Screenshot 2023-10-15 162002.png>)

### Swap

#### Action

Prerequisites:

    1. Connected wallet
    2. Project you want to support is already registered

To mint or redeem a token, press the "Swap" option on the project panel.

Enter the amount you wish to swap; for now, you must use the project's attributed asset.

`minting` - Two options to **get** project tokens:

    1. Enter the desired amount of devUSDC you wish to pay in the upper panel (labeled "You Pay").

    2. Enter the desired number of project tokens you wish to receive in the lower panel (labeled "You Get").

`Redeeming` - Two options to **sell** project tokens:

    1. Enter the desired number of project tokens you wish to sell in the upper panel (labeled "You Pay").

    2. Enter the desired amount of devUSDC you wish to receive in the lower panel (labeled "You Get").

#### Specification

Minting and redeeming call two different IDL functions:

Minting:

```rust
 pub fn mint_project_token(
        ctx: Context<MintProjectToken>,
        min_project_token_amount: u64, //Minimum amount of project tokens you can get
        quote_amount: u64,//amount of paid devUSDC
    ) -> Result<()
```

Redeeming:

```rust
 pub fn redeem_project_token(
        ctx: Context<RedeemProjectToken>,
        project_token_amount: u64, //amount of paid project tonkens
        min_quote_amount: u64, // Minimal amount of devUSDC to get
    ) -> Result<()>
```

Like in "Donate," the asset you use for redeeming and minting is the one **attributed** upon project registration - devUSDC.

```diff
-Disclaimer
- devUSD public key is : BRjpCHtyQLNCo8gqRUr8jtdAj5AjPYQaoqbvcZiHok1k
- Do not buy different ones if you wish to interact with our smartcontracts
```

_We aim to offer more choices in swap currencies in the future._

#### Result

If you've minted, you will receive the project tokens in your wallet.

If you've redeemed, you will receive devUSDC in your wallet.

# DEVELOPMENT

If you run the project locally, you will need to create an `.env` file at the root of the project with the following variables:

```shell
# github token
REACT_APP_GITHUB_TOKEN
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Formatting

```shell
# Typescript
npx prettier --write .
```

# TODO:

I installed all dependencies to solve the problem discussed. Do we really need all of them ? https://stackoverflow.com/questions/71085181/import-web3-into-react-js-getting-breaking-change-webpack-5-used-to-incl
Could use: https://github.com/viaprotocol/web3-wallets/

Displaying README.md.

Naming convention: adopt https://github.com/airbnb/javascript/tree/master/react
