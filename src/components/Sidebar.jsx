import { motion, AnimatePresence } from 'framer-motion'
import { FileStack, Contact, X, Home, ClipboardList, ShoppingCart, User, Gift, Search, CarTaxiFront } from 'lucide-react'
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navItems = [
      { icon: Home, text: 'Dashboard', path: '/' },
      { icon: ClipboardList, text: 'Orders', path: '/orders' },
      { icon: User, text: 'Profile', path: '/account' },
      { icon: Gift, text: 'Promotions', path: '/promotions' },
      {icon: ShoppingCart, text: 'Cart', path: '/checkout'},
      {icon: Contact, text: 'Contact us', path: '/contactus'},
      {icon: FileStack, text: 'About us', path: '/aboutus'}
    ]
  
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white p-5 shadow-lg"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold">Gourmet CMS</h2>
              <button onClick={toggleSidebar} className="text-white">
                <X size={24} />
              </button>
            </div>
            <nav>
              <ul className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={item.path}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                      onClick={toggleSidebar}
                    >
                      <item.icon size={20} />
                      <span>{item.text}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  export default Sidebar