import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from 'ethers'
import React from 'react'
import { setNewAddress } from './firebase'
import { Button } from './general/Button'

export const signMessage = async (provider, address, discordID) => {
  const msg = `My Discord ID is ${discordID}`
  const signMsg = ethers.utils.toUtf8Bytes(msg)

  const signature = await provider.send('personal_sign', [
    ethers.utils.hexlify(signMsg),
    address.toLowerCase()
  ])

  console.log(signature)

  await setNewAddress(address, {
    discordID,
    signature: signature.result
  }).catch(e => console.log(e))
}

export const SignMessageButton = () => {
  const [{ wallet, connecting }] = useConnectWallet()

  const address = wallet?.accounts[0]?.address

  const discordID = `Fake Discord ID for ${address}`

  return (
    <div>
      <Button
        className="bn-demo-button"
        onClick={() => signMessage(wallet.provider, address, discordID)}
      >
        Sign Message
      </Button>
    </div>
  )
}
