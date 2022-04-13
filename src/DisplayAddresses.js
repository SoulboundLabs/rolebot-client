import React, { useEffect, useState } from 'react'
import { getAddresses } from './firebase'

export const DisplayAddresses = () => {
  const [addresses, setAddresses] = useState([])

  useEffect(() => {
    getAddresses().then(dbAddresses => {
      setAddresses(dbAddresses)
    })
  }, [])

  return (
    <div>
      <h1>Addresses</h1>
      <ul>
        {addresses.map(account => (
          <li key={account.id}>{account.id}</li>
        ))}
      </ul>
    </div>
  )
}
