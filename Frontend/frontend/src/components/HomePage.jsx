import React from 'react';
import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';
import OtherUser from './OtherUser'
const HomePage = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <Sidebar />
      <MessageContainer />
       <OtherUser/>
    </div>
  );
};

export default HomePage;