import React, { useEffect, useState } from 'react'
import { getAddresses } from './firebase'
import { Avatar } from './general/Avatar'

export const DisplayAddresses = () => {
  const [addresses, setAddresses] = useState([])

  useEffect(() => {
    getAddresses().then(dbAddresses => {
      setAddresses(dbAddresses)
    })
  }, [])

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mx-auto items-center justify-center">
      {addresses.map(address => (
        <div
          key={address.id}
          className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          <div className="flex-shrink-0">
            <Avatar address={address.id} />
          </div>
          <div className="flex-1 min-w-0">
            <a href="#" className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">{address.id}</p>
              <p className="text-sm text-gray-500 truncate">
                {address.discordID}
              </p>
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
