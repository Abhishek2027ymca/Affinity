import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import Login from './components/Login';
import { useSelector  , useDispatch} from "react-redux";
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { setOnlineUsers } from './redux/userSlice';
import { setSocket } from './redux/socketSlice';


const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/register", element: <Signup /> },
    { path: "/login", element: <Login /> }
]);

function App() {
    const { authUser } = useSelector(store => store.user);
    const { socket } = useSelector(store => store.socket);

const dispatch = useDispatch();

    useEffect(() => {
        if (authUser) {
            const socket = io('${process.env.REACT_APP_BACKEND_URL}', {
                query: { userId: authUser._id }
                
            });
            dispatch(setSocket(socket));
            
            socket.on('getOnLineUsers' , (OnLineUsers)=>{
           
                dispatch(setOnlineUsers(OnLineUsers))
            })
          
            return ()=> socket.close(); // cleanup

       }

       else{
        if(socket){
            socket.close();
            dispatch(setSocket(null))
        }
       }

    }, [authUser]);

    return (
        <div className="p-4 h-screen flex items-center justify-center">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;