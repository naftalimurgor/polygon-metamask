import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import { InjectedConnector } from '@web3-react/injected-connector'
import MetaMaskOnboarding from '@metamask/onboarding'
import './App.css'

import { Navbar } from './components/Navbar'
import { POLYGON_TESTNET_PARAMS } from './constants'
const ONBOARD_TEXT = 'Click here to install MetaMask!'
const CONNECT_WALLET = 'Connect Wallet'

declare var window: any

const abstractConnectorArgs = {
  supportedChainIds: [137, 80001]
}
const injected: InjectedConnector = new InjectedConnector(abstractConnectorArgs)

type AccountsProps = {
  key: number,
  acc: string
}
// widget to display accounts once MetaMask is connect
const Accounts = ({ key, acc }: AccountsProps) => {
  return (<div className="col col-md-6 mx-auto" style={{ marginTop: '120px' }}>
    <ol>
      <li key={key}>{acc}</li>
    </ol>
  </div>)
}

const App = () => {
  // onboarding button text
  const [buttonText, setButtonText] = useState<string>('')

  // state to store the web3 instance
  const [web3, setWeb3] = useState<Web3 | null>(null)

  const [accounts, setAccounts] = useState<Array<string>>([])
  
  const [account, setCurrentAccount] = useState<string>('')
  const onboarding = React.useRef<MetaMaskOnboarding>()
  const [flashMessage, setFlashMsg] = useState<string>('')


  useEffect(() => {
    if (!onboarding.current) {
      // create an instance fo MetamaskOnboarding class when component mounts for the first time
      onboarding.current = new MetaMaskOnboarding()
    }
  }, [])

  // check for if user has metamask extension already installed on their browser
  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setButtonText(CONNECT_WALLET)
      onboarding.current?.stopOnboarding()
    } else {
      setButtonText(ONBOARD_TEXT)
    }
  }, [])



  // https://eips.ethereum.org/EIPS/eip-3085
  // Custom networks for Ethereum compatible chains can be added to Metamask
  async function addPolygonNetwork() {
    try {
      const provider = await injected.getProvider()
      // rpc request to switch chain to an ethereum compatible chain
      await provider.request({ method: 'wallet_addEthereumChain', params: [POLYGON_TESTNET_PARAMS] })

      // create web3 instance based on the provider
      const _web3 = new Web3(Web3.givenProvider)
      setWeb3(_web3)
      console.log(provider)
    } catch (e) {
      setFlashMsg('Failed to switch to Polygon chain, Please check your internet connect reconnect again')
      console.log(e)
    }
  }


  const handleAccounts = (accounts: Array<string>) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.')
    } else if (accounts[0] !== account) {
      setCurrentAccount(accounts[0])
      setAccounts(accounts)
      console.debug(web3)
      console.debug(account)
      console.debug(accounts)
    }
  }

  // connect initialize onboarding or connect wallet
  const onClick = async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      try {

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        handleAccounts(accounts)
      } catch (e) {
        console.log(e)
      }
    } else {
      // opens a new tab to the <chrome | firefox> store for user to install the MetaMask browser extension
      onboarding.current?.startOnboarding()
    }
  }

  return (
    <div className="container-fluid">
      <Navbar
        buttonText={buttonText}
        onClick={() => onClick()}
        switchNetwork={() => addPolygonNetwork()} />


      <div className="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Please switch to Polygon Network first before sending Matic. Switch from the <em>Menu</em></strong>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>

      <div className="container">
        {flashMessage && <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>{flashMessage}</strong>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>}
      </div>

      <div className="container mb-5">
        <div className="row">
          <div className="col-md-5 mx-auto" style={{ minHeight: '200px' }}>
            <h1 className="mx-auto">Connect Accounts:</h1>
            <div className="card">
              {accounts && accounts.map((acc, index) => <Accounts key={index} acc={acc} />)}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
        </div>
      </div>
    </div >
  )
}

export default App
