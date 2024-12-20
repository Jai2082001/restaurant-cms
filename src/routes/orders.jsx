import Product from '../components/Product';
import Filter from '../components/Filter';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Orders() {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filter, setFilter] = useState({
        priceRange: [0, 100], // Adjust based on your product prices
        isVeg: false,
        isDairyFree: false, 
    });

    const Newproducts = [
        {
          id: 1,
          productName: "Vegan Chocolate Cake",
          description: "Delicious vegan chocolate cake made with natural ingredients.",
          price: "15.99",
          imageUrl: "https://via.placeholder.com/300",
        },
        {
          id: 2,
          productName: "Gluten-Free Pasta",
          description: "Tasty gluten-free pasta made from chickpeas.",
          price: "10.49",
          imageUrl: "https://via.placeholder.com/300",
        },
        {
          id: 3,
          productName: "Organic Green Tea",
          description: "Refreshing organic green tea for a healthy lifestyle.",
          price: "7.99",
          imageUrl: "https://via.placeholder.com/300",
        },
      ];

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get(`${process.env.REACT_APP_FETCH_LINK}/api/products`); // Replace with your API endpoint
            setProducts(response.data);
            setFilteredProducts(response.data);
            
        };
        fetchProducts();
    }, []);

    const handleFilterChange = (newFilter) => {
        console.log(newFilter)
        setFilter(newFilter);
        const filtered = products.filter(product => 
          product.price >= newFilter.priceRange[0] &&
          product.price <= newFilter.priceRange[1] &&
          (newFilter.isVeg ? product.isVeg : true) &&
          (newFilter.isDairyFree ? product.isDairyFree : true)
        );
        setFilteredProducts(filtered);
      };
    

    return (
    <>
        <Filter filter={filter} onFilterChange={handleFilterChange} />
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Product products={filteredProducts} />
        </div>
    </>
    )
}

export default Orders