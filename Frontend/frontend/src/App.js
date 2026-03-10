import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import Login from './components/Login';
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/register", element: <Signup /> },
    { path: "/login", element: <Login /> }
]);

function App() {
    const [socket, setSocket] = useState(null);
    const { authUser } = useSelector(store => store.user);

    useEffect(() => {
        if (authUser) {
            const socket = io('http://localhost:8080', {
            });
            setSocket(socket);
            
        } 
    }, [authUser]);

    return (
        <div className="p-4 h-screen flex items-center justify-center">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;