import { useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react'
import { ethers } from 'ethers'
import { default as React, useEffect, useState } from 'react'
import { DisplayAddresses } from './DisplayAddresses'
import { Button } from './general/Button'
import { initNotify, initWeb3Onboard } from './services'
import { SignMessageButton } from './SignMessageButton'
import Header from './views/Header/Header.js'
import { DiscordAuthURL } from './discordAuth';

let provider

const App = () => {
  const [{ wallet }, connect, disconnect] = useConnectWallet()
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()
  const connectedWallets = useWallets()

  const [web3Onboard, setWeb3Onboard] = useState(null)
  const [notify, setNotify] = useState(null)
  const [discordUser, setDiscordUser] = useState(null);

  useEffect(() => {
    // Check for OAuth token
    const fragment = new URLSearchParams(window.location.hash.slice(1));
		const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];
    if (!accessToken) return;

    window.fetch('https://discord.com/api/users/@me', {
			headers: {
				authorization: `${tokenType} ${accessToken}`,
			},
		}).then(result => result.json())
			.then(response => { setDiscordUser(response); })
			.catch(console.error);

    // TODO Security stuff?
  
  }, [])

  useEffect(() => {
    setWeb3Onboard(initWeb3Onboard)
    setNotify(initNotify())
  }, [])

  useEffect(() => {
    /* 
      This is where we have access to the nested arrays in this format: connectedWallets -> accounts -> address 
      TODO: See if this can be done in a callback and not in an effect... check BlockNatives' docs
    */
    if (!connectedWallets.length) return

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    )

    window.localStorage.setItem(
      'connectedWallets',
      JSON.stringify(connectedWalletsLabelArray)
    )
  }, [connectedWallets])

  useEffect(() => {
    if (!wallet?.provider) {
      provider = null
    } else {
      provider = new ethers.providers.Web3Provider(wallet.provider, 'any')
    }
  }, [wallet])

  useEffect(() => {
    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem('connectedWallets')
    )

    if (previouslyConnectedWallets?.length) {
      async function setWalletFromLocalStorage() {
        await connect({ autoSelect: previouslyConnectedWallets[0] })
      }
      setWalletFromLocalStorage()
    }
  }, [web3Onboard, connect])

  if (!web3Onboard || !notify) return <div>Loading...</div>

  return (
    <main>
      <Header
        connectedChain={wallet ? connectedChain : null}
        address={wallet?.accounts[0]?.address}
        balance={wallet?.accounts[0]?.balance}
        ens={wallet?.accounts[0]?.ens}
      />
      <section className="main container mx-auto max-w-4xl">
        <div className="main-content">
          <div className="vertical-main-container">
            <div className="container onboard">
              <h2>Get verified for your on-chain activity in three simple steps</h2>
              <Button
                className="bn-demo-Button"
                onClick={() => {
                  window.location.replace(DiscordAuthURL)
                }}
                disabled={discordUser}
              >
                1. Log in with Discord
              </Button>
              {discordUser && (
                <div>{ discordUser.username } ({ discordUser.id })</div>) 
              }
              {wallet && (
                <div className="network-select">
                  <label>Switch Chains</label>
                  {settingChain ? (
                    <span>Switching Chains...</span>
                  ) : (
                    <select
                      onChange={({ target: { value } }) =>
                        setChain({ chainId: value })
                      }
                      value={connectedChain?.id}
                    >
                      {chains.map(({ id, label }) => {
                        return (
                          <option value={id} key={id}>
                            {label}
                          </option>
                        )
                      })}
                    </select>
                  )}
                </div>
              )}
              <div>
                {!wallet && (
                  <Button
                    className="bn-demo-Button"
                    onClick={() => {
                      connect()
                    }}
                  >
                    2. Select a Wallet
                  </Button>
                )}

                {wallet && (
                  <Button
                    className="bn-demo-Button"
                    onClick={() => {
                      connect()
                    }}
                  >
                    Connect Another Wallet
                  </Button>
                )}

                {wallet && (
                  <Button
                    className="bn-demo-Button"
                    onClick={() => {
                      disconnect(wallet)
                      const connectedWalletsList = connectedWallets.map(
                        ({ label }) => label
                      )
                      window.localStorage.setItem(
                        'connectedWallets',
                        JSON.stringify(connectedWalletsList)
                      )
                    }}
                  >
                    Reset Wallet State
                  </Button>
                )}
                {wallet && wallet?.dashboard && (
                  <Button
                    className="bn-demo-Button"
                    onClick={wallet?.dashboard}
                  >
                    Open Wallet Dashboard
                  </Button>
                )}
                {wallet &&
                  wallet?.type === 'hardware' &&
                  wallet.accounts[0].address && (
                    <Button
                      className="bn-demo-Button"
                      onClick={web3Onboard.accountSelect}
                    >
                      Switch Account
                    </Button>
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-32">
          <DisplayAddresses />
          <SignMessageButton discordID={discordUser?.id} />
        </div>
      </section>
    </main>
  )
}

export default App
