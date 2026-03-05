import React from 'react';
import OtherUser from './OtherUser.jsx';
 import useGetOtherUsers from '../hooks/useGetOtherUsers.jsx';

const OtherUsers = () => {

  useGetOtherUsers();

  return (
   <div className ='overflow-auto'>
    <OtherUser/>
    
    <OtherUser/>
  
    <OtherUser/>
    <OtherUser/>
    <OtherUser/>
    <OtherUser/>
    <OtherUser/>
    <OtherUser/>
   </div>
  );
};

export default OtherUsers;