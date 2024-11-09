import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from '../components/Sidebar.jsx'
import Header from '../components/Header.jsx';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from "../store/slices/cartSlices.js";
import { checkAuthStatus } from "../store/slices/userSlices.js";
export default function Root() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)
    const dispatch=useDispatch();
    const { isAuthenticated, user, status, error } = useSelector((state) => state.auth);

    useEffect(() => {
      dispatch(checkAuthStatus());
        dispatch(fetchCart())
    }, [dispatch]);


    console.log({
        "isAuthenticated": isAuthenticated,
        "user": user,
        "status": status,
        "error": error
    })


    const items = useSelector(state => state.cart)
    console.log("items", items)
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
    const toggleDarkMode = () => setIsDarkMode(!isDarkMode)



    return (
        <>
            <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
                <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                    <Header toggleSidebar={toggleSidebar} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                    
                    <Outlet></Outlet>
                </div>

            </div>
        </>
    );
}