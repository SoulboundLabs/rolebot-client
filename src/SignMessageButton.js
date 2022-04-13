import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from 'ethers'
import React from 'react'

export const signMessage = async (provider, address) => {
  const signMsg = ethers.utils.toUtf8Bytes('some txt message')

  console.log('signMessage', provider, address, signMsg)

  // const signer = await provider.getSigner()
  // console.log('signer', signer)
  // const addr = await signer.getAddress()
  // console.log('addr', addr)
  // console.log('signer', signer)
  const sig = await provider.send('personal_sign', [
    ethers.utils.hexlify(signMsg),
    address.toLowerCase()
  ])

  console.log({ sig })

  // const signature = await provider.request({
  //   method: 'eth_sign',
  //   params: [address, signMsg]
  // })

  // console.log('signature', signature)

  // const recoveredAddress = utils.verifyMessage(signMsg, signature)
  // console.log({ signMsg, signature, recoveredAddress })
}

export const SignMessageButton = () => {
  const [{ wallet, connecting }] = useConnectWallet()

  const discordID = 'Some Discord ID'

  const address = wallet?.accounts[0]?.address

  return (
    <div>
      <button
        className="bn-demo-button"
        onClick={() => signMessage(wallet.provider, address, discordID)}
      >
        Sign Message
      </button>
    </div>
  )
}
