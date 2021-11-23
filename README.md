# How to Switch From Ethereum to  Polygon Chain in MetaMask
- Onboarding / Install MetaMask extension
- Switch to Polygon Chain
- Send MATIC Token from MetaMask

Get tesnet MATIC Token here [Mumbai Matic](https://polygon.technology/matic-token/)

## Step one: Adding MetamaskOnboarding

This is a library provided by metamask if a new user has not yet installed the Metamask library. Kickstarts an Installation procedure that directs user tho the extension store for their browser

1. add `@metamask/onboarding` dependency to your project
```bash
npm install @metamask/onboarding
```

2. import `MetamaskOnboarding` at the top level of component:
```typescript
import MetaMaskOnboarding from '@metamask/onboarding'
```
3. Ideally, we would like to have a button that user clicks to initiate wallet connect to dapp or onboarding:
Declare constants to hold various button labels during the wallet connect or Installation
```typescript
const ONBOARD_TEXT = 'Click here to install MetaMask!'
const CONNECT_WALLET = 'Connect Wallet'

```
3. create a `ref` to store instance of `MetamaskOnboarding` inside component i.e `App.tsx` (if using TypeScript):

```typescript
const App = () => {
  ....
  const onboarding = React.useRef<MetaMaskOnboarding>()
  ...
}
```
3. Declare a `useEffect` hook to create an instance of `MetamaskOnboarding`:
```typescript
  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding()
    }
  }, [])

```

4. Create another hook to check that is trigger to check if user has MetaMask extension already installed, if installed, "stop" the onboarding process:

```typescript
  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setButtonText(CONNECT_WALLET)
      onboarding.current?.stopOnboarding()
    } else {
      setButtonText(ONBOARD_TEXT)
    }
  }, [])
```

5. Finally:
We add a `onClick` function to that we will attach to an `click` button Event. Like:

```typescript
  const onClick = async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      try {

        let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        handleAccounts(accounts)
      } catch (e) {
        console.log(e)
      }
    } else {
      // opens a new tab on the browser to install extension from the web extension store
      onboarding.current?.startOnboarding()
    }
  }
```
Read more about `MetamaskOnboarding` at [docs.metamask.com]()

## Step two: Switch To an Ethereum-compatible chain
In this, we will switch to polygon (formerly Matic)

1. create two Objects to hold the parameters, for connecting to `Mainnet` or `Testnet` networks:
2. Add `@web3-react/injected-connector` depency to project using yarn or npm
```bash
npm install @web3-react/injected-connected
```
3. import `InjectedConnector` class inside `App.tsx`:
```typescript
import { InjectedConnector } from '@web3-react/injected-connector'
```
Declare an object with a property `supportedChainIds`, this property holds an array of  `chainId`s in decimal for your network, `Mainnet` and `Testnet`:
```typescript
const abstractConnectorArgs = {
  supportedChainIds: [137, 80001]
}

```
Instantiate `InjectedConnector` and pass in the above object:
```typescript
// an instance of InjectedConnect for retrieving the provider once injected
const injected: InjectedConnector = new InjectedConnector(abstractConnectorArgs)

```

`constants.ts`
```typescript
// Polygon Mainnet Params
export const POLYGON_MAINNET_PARAMS = {
  chainId: '0x89', // 137
  chainName: 'Polygon Mainnet',
  nativeCurrency: {
    name: 'MATIC Token',
    symbol: 'MATIC',
    decimals: 18
  },
  rpcUrls: ['https://rpc-mainnet.matic.quiknode.pro'],
  blockExplorerUrls: ['https://polygonscan.com/']
}

// Polygon Testnet params
export const POLYGON_TESTNET_PARAMS = {
  chainId: '0x13881', // 8001
  chainName: 'Mumbai',
  nativeCurrency: {
    name: 'MATIC Token',
    symbol: 'MATIC',
    decimals: 18
  },
  rpcUrls: ['https://matic-mumbai.chainstacklabs.com/'],
  blockExplorerUrls: ['https://mumbai.polygonscan.com/']
}
```

2. Inside `app.tsx`, create a function that will be attached to a button `click` event:

`App.tsx`
```typescript
  async function addPolygonNetwork() {
    try {
      const provider = await injected.getProvider()
      // rpc request to switch chain to an ethereum compatible chain
      await provider.request({ method: 'wallet_addEthereumChain', params: [POLYGON_TESTNET_PARAMS] })
      
      // create web3 instance based on the provider
      let _web3 = new Web3(Web3.givenProvider)
      setWeb3(_web3)
      console.log(provider)
    } catch (e) {
      setFlashMsg('Failed to switch to Polygon chain, Please check your internet connect reconnect again')
      console.log(e)
    }
  }
```

We then use the above function inside a component like:
```html
<Navbar
  buttonText={buttonText}
  onClick={() => onClick()}
  switchNetwork={() => addPolygonNetwork()} 
/>

```
gif:


### Note: 
In case of errors,
- Try switching to another  provider as the current rpc could be "busy" or takes longer to 
connect. Change the `rpcUrls` in the `constants.ts`
to other for the respective `chainName`
- Try using `Hexadecimal` for `chainId`s instead of decimal,

## Step 3: Sending Matic(wip)
We'd want to be able to send Matic Token after switching the Chain to polygon now that we have switch to `Polygon` from our website/dapp.
***


Further reading:
- https://eips.ethereum.org/EIPS/eip-3085

Full Example: https://github.co/naftalimurgor/polygon-metamask/src/components/App.tsx

Demo link:

Found this tutorial helpful? You may donate
ETH:
BTC:


## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


