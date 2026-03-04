
import React from 'react'

const SendInput = () => {
  return (
    <div>                  
      <form  className='px-4 my-3'>

        <div>
            <input type="text"  placeholder ='Send a message....' 
            className = 'border text-sm rounded-lg block w-full bg-gray-600 text-white'/>
        </div>
      </form>
    </div>
  )
}

export default SendInput
