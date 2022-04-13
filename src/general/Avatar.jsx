import React, { useEffect, useRef } from 'react'
const jdenticon = require('jdenticon')

export const Avatar = ({ address = '0xtest', size = '40' }) => {
  const icon = useRef(null)
  useEffect(() => {
    jdenticon.update(icon.current, address)
  }, [address])

  return (
    <div>
      <svg
        data-jdenticon-value={address}
        height={size}
        ref={icon}
        width={size}
      />
    </div>
  )
}
