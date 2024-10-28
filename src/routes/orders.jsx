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

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users/'); // Replace with your API endpoint
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
        <Product products={filteredProducts} />
    </>
    )
}

export default Orders