import React from 'react'

const OtherUser = () => {
  return (
    <div>
       
      <div className='flex gap-2 items-center text-slate-300 hover:bg-zinc-600 rounded p-2 cursor-pointer'>
        <div className='avatar online'>
          <div className='w-12 rounded-full'>
            <img 
              src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg" 
              alt="user avatar"
            />
          </div>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='flex justify-between items-center gap-2 flex-1 ' >
            <p>Abhishek CEDS </p>
          </div>
        </div>
      </div >
      <div className  = 'divider my-0 py-0 h-1'> </div>
    
    </div>
  )
}

export default OtherUser
