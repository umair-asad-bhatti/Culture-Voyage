import React, { useContext } from 'react'
import { UserContext } from '../../context/AuthContext'

const style={
    message:`flex items-center shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full`,
    sent:`bg-[#395dff] text-white flex-row-reverse text-end float-right rounded-bl-full `,
    received:`bg-[#e5e5ea] text-black float-left rounded-br-full`,
}

export default function Message({message}) {
    const {user} =useContext(UserContext)
    console.log(message)

    const messageClass = message.uid === user.uid ? `${style.sent}` : `${style.received}`

  return (
    <>
    <div>
        <div className={`${style.message} ${messageClass}`}>
            <p className='absolute mt-[-4rem] text-gray-600 text-xs'>{message.name}</p>
            <p>{message.text}</p>
        </div>
    </div>
    </>
  )
}
