import { useEffect, useState } from "react"
import { motion } from 'framer-motion'
import { CustomImage as Image } from '../components/CustomImage'
import axios from "axios"
import { useNavigate } from "react-router-dom"
const HomeProductDisplay = ({ id, index }) => {

    const [item, setItem] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_FETCH_LINK}/api/product`, {
            headers: {
                'id': id
            }
        }).then((response) => {
            setItem(response.data[0]);
        })
    }, [])
    const MotionImage = motion(Image)
    const detailHandler=() => {
        navigate(`product/${id}`)
    }
    return (
        <>

            {item &&
                <motion.div
                    key={item.productName}
                    className="bg-white cursor-pointer dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    onClick={detailHandler }
                >
                    <img
                        src={item.imageUrl}
                        alt={item.productName}
                        width={600}
                        height={400}
                        className="w-full h-64 object-cover"
                    // whileHover={{ scale: 1.05 }}
                    // transition={{ duration: 0.3 }}
                    />
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{item.productName}</h2>
                        <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    </div>
                </motion.div>
            }

        </>
    )
}

export default HomeProductDisplay