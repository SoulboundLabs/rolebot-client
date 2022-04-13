import { verifyMessage } from '@ethersproject/wallet'
import { useConnectWallet } from '@web3-onboard/react'
import React from 'react'

export const signMessage = async (provider, address, signMsg) => {
  console.log('signMessage', provider, address, signMsg)
  const signature = await provider.request({
    method: 'eth_sign',
    params: [address, signMsg]
  })

  const recoveredAddress = verifyMessage(signMsg, signature)
  console.log({ signMsg, signature, recoveredAddress })
}

export const SignMessageButton = () => {
  const [{ wallet, connecting }] = useConnectWallet()

  const discordID = 'Some Discord ID'

  return (
    <div>
      <button
        className="bn-demo-button"
        onClick={() => signMessage(wallet.provider, wallet.address, discordID)}
      >
        Sign Message
      </button>
    </div>
  )
}
