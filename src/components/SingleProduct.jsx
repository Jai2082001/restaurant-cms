// Sample products array for demonstration. Replace with your actual product data or fetch it from an API.
import { addToCart } from "../store/slices/cartSlices"
import { useDispatch } from "react-redux";
 
function SingleProduct ({product}) {
 
   
    const dispatch = useDispatch()
 
    function pushToCart(){
        dispatch(addToCart({product}));
        
    }
 
    return (
        <>
           <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.imageUrl}
        alt={product.productName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.productName}</h2>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <p className="text-lg font-bold text-blue-600 mb-4">${product.price}</p>
        <div className="flex justify-between">
          <button onClick={pushToCart} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
            Add to Cart
          </button>
          {/* <button className="text-blue-500 hover:underline transition duration-200">
            View Details
          </button> */}
        </div>
      </div>
    </div>
        </>
    )
}
 
 
export default SingleProduct