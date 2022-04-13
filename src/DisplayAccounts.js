import React, { useEffect, useState } from 'react'
import { getAddresses } from './firebase'

export const DisplayAccounts = () => {
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    getAddresses().then(addresses => {
      setAccounts(addresses)
    })
  }, [])

  return (
    <div>
      <h1>Accounts</h1>
      <ul>
        {accounts.map(account => (
          <li key={account.id}>{account.id}</li>
        ))}
      </ul>
    </div>
  )
}
