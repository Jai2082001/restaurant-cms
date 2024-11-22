import { useNavigate } from "react-router-dom";
import { addToCart, updateCart } from "../store/slices/cartSlices"
import { useDispatch, useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";
function SingleProduct ({product}) {

    const {isAuthenticated} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    function pushToCart(){
      if(isAuthenticated){
        dispatch(addToCart({product}));
        dispatch(updateCart())
        NotificationManager.info('Added to the Cart')
      }else{
        navigate('/account')
      }
        
    }

    function navigateSingle(){
      navigate(`/product/${product._id}`)
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
          <button onClick={navigateSingle} className="text-blue-500 hover:underline transition duration-200">
            View Details
          </button>
        </div>
      </div>
    </div>
        </>
    )
}


export default SingleProduct