import { motion } from 'framer-motion'
import { CustomImage as Image } from '../components/CustomImage'
import BannerCarousel from '../components/Carousel'
import { useEffect, useState } from 'react'
import axios from 'axios'
import HomeProductDisplay from '../components/HomeProductDisplay'
const foodItems = [
  { name: 'Gourmet Burger', image: 'https://bite.ai/static/092566a027d081a7e19134c948fe93aa/0f3a1/full-breakfast.jpg', description: 'Juicy beef patty with artisanal toppings' },
  { name: 'Fresh Salad', image: 'https://bite.ai/static/092566a027d081a7e19134c948fe93aa/0f3a1/full-breakfast.jpg', description: 'Crisp greens with house-made dressing' },
  { name: 'Decadent Dessert', image: 'https://bite.ai/static/092566a027d081a7e19134c948fe93aa/0f3a1/full-breakfast.jpg', description: 'Sweet treats to satisfy your cravings' },
  { name: 'Signature Cocktail', image: 'https://bite.ai/static/092566a027d081a7e19134c948fe93aa/0f3a1/full-breakfast.jpg', description: 'Handcrafted drinks for every occasion' },
]



export default function HomePage() {

  const [site_info, changeSiteInfo] = useState(false);
  const [product, changeProduct] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_FETCH_LINK}/api/get_info`).then((response) => {
      changeSiteInfo(response.data[0])
    });

    const MotionImage = motion(Image)



  }, [])

  console.log(product.length, product)
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
      <header className="py-16 text-center">
        <motion.h1
          className="text-5xl font-bold mb-4 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {site_info && `${site_info.Name}`}
        </motion.h1>
        <motion.p
          className="text-xl text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Experience culinary excellence
        </motion.p>
        {site_info && <BannerCarousel images={site_info.BannerImages} ></BannerCarousel>}

      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {site_info && <>
            {site_info.ProductDisplays.map((item, index) => (
              <HomeProductDisplay id={item} index={index}></HomeProductDisplay>
            ))}
          </>}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Ready to place an order?</h2>
          <motion.button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Order Now
          </motion.button>
        </motion.div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Gourmet Delights. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}