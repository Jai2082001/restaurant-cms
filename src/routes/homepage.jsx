import { motion } from 'framer-motion'
import {CustomImage as Image} from '../components/CustomImage'
import { Carousel } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

import slider1 from '../images/slider_image/slider1.jpg'
import slider2 from '../images/slider_image/slider2.jpg'
import slider3 from '../images/slider_image/slider3.jpg'

import product_4001 from '../images/products_images/1.jpg'
import product_4002 from '../images/products_images/2.jpg'
import product_4003 from '../images/products_images/3.jpg'
import product_4004 from '../images/products_images/4.jpg'

import home_pramotions_5001 from '../images/home_pramotions_images/home_pramotions_5001.jpg'
import home_pramotions_5002 from '../images/home_pramotions_images/home_pramotions_5002.jpg'
import home_pramotions_5003 from '../images/home_pramotions_images/home_pramotions_5003.jpg'
import home_pramotions_5004 from '../images/home_pramotions_images/home_pramotions_5004.jpg'
import home_pramotions_5005 from '../images/home_pramotions_images/home_pramotions_5005.jpg'
import home_pramotions_5006 from '../images/home_pramotions_images/home_pramotions_5006.jpg'

const foodItems = [
  { name: 'Gourmet Burger', image: 'https://bite.ai/static/092566a027d081a7e19134c948fe93aa/0f3a1/full-breakfast.jpg', description: 'Juicy beef patty with artisanal toppings' },
  { name: 'Fresh Salad', image: 'https://bite.ai/static/092566a027d081a7e19134c948fe93aa/0f3a1/full-breakfast.jpg', description: 'Crisp greens with house-made dressing' },
  { name: 'Decadent Dessert', image: 'https://bite.ai/static/092566a027d081a7e19134c948fe93aa/0f3a1/full-breakfast.jpg', description: 'Sweet treats to satisfy your cravings' },
  { name: 'Signature Cocktail', image: 'https://bite.ai/static/092566a027d081a7e19134c948fe93aa/0f3a1/full-breakfast.jpg', description: 'Handcrafted drinks for every occasion' },
]

const MotionImage = motion(Image)

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img className="d-block w-100" src={slider3} alt=""></img>
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slider2} alt=""></img>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slider1} alt=""></img>
        </Carousel.Item>
      </Carousel>
      <header className="py-16 text-center">
        <motion.h5 
          className="text-xl text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Our Top Selling Products</h2>
        </motion.h5>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            <Container>
            <Row>
              <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={product_4001} />
                <Card.Body>
                  <Card.Title>Gulab Jamun (Light)</Card.Title>
                  <Card.Text>
                    Gulab Jamun is a traditional milk-based sweet that is juicy and soft in texture. These round shaped sweets which are smothered in a rich sugary syrup are a staple in South Asian culture. 
                  </Card.Text>
                  <Button variant="primary">Add to Cart</Button>
                </Card.Body>
              </Card>
              </Col>
              <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={product_4002} />
                <Card.Body>
                  <Card.Title>Kalakand</Card.Title>
                  <Card.Text>
                    Kalakand is a soft and creamy delicacy crafted purely from Khoya (traditional milk paste). Its delightful and creamy taste is enhanced by a garnish of finely chopped nuts, making it an irresistible treat.
                  </Card.Text>
                  <Button variant="primary">Add to Cart</Button>
                </Card.Body>
              </Card>
              </Col>
              <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={product_4003} />
                <Card.Body>
                  <Card.Title>Hubshi Halwa</Card.Title>
                  <Card.Text>
                    Indulge in the experience of our best-selling signature product, Hubshi Halwa. Made with a combination of the finest local ingredients, Hubshi Halwa can be described as sticky, chewy, soft and nutty. It is an irresistible blend of flavours in a ‘royal’ delicacy.
                  </Card.Text>
                  <Button variant="primary">Add to Cart</Button>
                </Card.Body>
              </Card>
              </Col>
              <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={product_4004} />
                <Card.Body>
                  <Card.Title>Sohan Halwa</Card.Title>
                  <Card.Text>
                    Sohan Halwa is a creamy dessert loaded with chunks of premium dates, giving it the perfect balance of rich taste and texture.
                  </Card.Text>
                  <Button variant="primary">Add to Cart</Button>
                </Card.Body>
              </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </main>
      <div>
        <motion.h5 
            className="text-xl text-gray-600 dark:text-gray-300 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Our Ongoing Pramotions</h2>
        </motion.h5>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <Link to="/">
                <img
                  src={home_pramotions_5001}
                  className="img-fluid rounded"
                  alt="..."
                />
              </Link>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col">
                  <Link to="/">
                    <img
                      src={home_pramotions_5002}
                      className="img-fluid rounded"
                      alt="..."
                    />
                  </Link>
                </div>
                <div className="col">
                  <Link to="/">
                    <img
                      src={home_pramotions_5003}
                      className="img-fluid rounded"
                      alt="..."
                    />
                  </Link>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <Link to="/">
                    <img
                      src={home_pramotions_5004}
                      className="img-fluid rounded"
                      alt="..."
                    />
                  </Link>
                </div>
                <div className="col">
                  <Link to="/">
                    <img
                      src={home_pramotions_5005}
                      className="img-fluid rounded"
                      alt="..."
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Gourmet Delights. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}