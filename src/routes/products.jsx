import BaseContainer from "../components/common/container/BaseContainer";
import HomeCarousel from "../components/header/HomeCarousel";
import CategoryList from "../components/home/CategoryList";
import { Button, Card, Col, Row } from "react-bootstrap";
import ProductList from "../components/home/ProductList";
import { useState } from "react";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("sweets");
    return (<>
        <header>
            <HomeCarousel  />
        </header>
        <BaseContainer>
            <Row className="py-3 mt-2 mb-2 border-bottom">
                <Col md="12">
                    <h1 className="text-center text-color-d12 ft-30 fw-bold mb-2 ">
                        Bakery Products & Categories
                    </h1>
                </Col>
            </Row>
            <CategoryList
              
            />
            <ProductList products={products} loading={loading} />


        </BaseContainer>
    </>)
}

export default Products