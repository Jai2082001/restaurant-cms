import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { addToCart, updateCart } from "../store/slices/cartSlices"
import { useDispatch, useSelector } from "react-redux";
import { NotificationManager } from 'react-notifications';

const SingleProductRoutePage = () => {
    // Sample product data

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const params = useParams();
    const {isAuthenticated} = useSelector((state)=>state.auth);
    const [singleproduct, setSingleProduct] = useState({
        id: 1,
        productName: "Deluxe Vegan Chocolate Cake",
        description: `Indulge in our Deluxe Vegan Chocolate Cake made from the finest organic ingredients.
          This rich and moist cake has layers of chocolate flavor with a creamy, dairy-free frosting
          that will satisfy even the strongest chocolate cravings. Perfect for special occasions or
          as a luxurious treat.`,
        price: 25.99,
        ingredients:
            "Organic cocoa powder, Almond flour,Coconut sugar,Dairy-free chocolate chips",

        images:
            "https://th.bing.com/th/id/OSK.HEROIIx-3ztRa1qChBU2wraAnDjIl88ihiYmAfOqwPRRyhM?rs=1&pid=ImgDetMain",

    })
    function pushToCart() {
        if(isAuthenticated){
            dispatch(addToCart({ singleproduct }));
            dispatch(updateCart())
        }else{
            navigate('/account')
        }   
               
    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/product', {
            headers: {
                'id': params.details
            }
        }).then((response) => {
            // console.log(response)
            setSingleProduct(response.data[0])
        })
    }, [])
    console.log(singleproduct)


    // State for the current image index in the carousel
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Function to go to the previous image in the carousel
    // const prevImage = () => {
    //     setCurrentImageIndex((prevIndex) =>
    //         prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    //     );
    // };

    // // Function to go to the next image in the carousel
    // const nextImage = () => {
    //     setCurrentImageIndex((prevIndex) =>
    //         prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    //     );
    // };

    return (
        <div className="flex flex-col md:flex-row p-6 md:p-12 bg-gray-100">
            {/* Carousel Section */}
            <div className="md:w-1/2 flex justify-center items-center relative">
                {/* <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white px-2 py-1 rounded-full"
                >
                    &#8592;
                </button> */}
                <img
                    src={singleproduct.imageUrl}
                    //   alt={Product ${currentImageIndex + 1}}
                    className="rounded-lg w-full h-96 object-cover"
                />
                {/* <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white px-2 py-1 rounded-full"
                >
                    &#8594;
                </button> */}
            </div>

            {/* Product Details Section */}
            <div className="md:w-1/2 md:pl-10 pt-6 md:pt-0 flex flex-col justify-center">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">{singleproduct.productName}</h1>
                <p className="text-lg text-gray-700 mb-6">{singleproduct.description}</p>

                <h2 className="text-2xl font-semibold text-blue-600 mb-4">${singleproduct.price}</h2>

                <h3 className="text-xl font-semibold text-gray-800 mb-2">Ingredients:</h3>
                <ul className="list-disc list-inside mb-4">
                    {singleproduct.ingredients.split(',').map((ingredient, index) => (
                        <li key={index} className="text-gray-700">{ingredient}</li>
                    ))}
                </ul>

                <button
                    className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-200"
                    onClick={pushToCart}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default SingleProductRoutePage;