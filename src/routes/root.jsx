import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from '../components/Sidebar'
import Header from '../components/Header';
import { useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
export default function Root() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)

    const items = useSelector(state => state.cart)
    console.log(items)
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