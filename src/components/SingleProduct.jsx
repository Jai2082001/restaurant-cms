import { addToCart } from "../store/slices/cartSlices"
import { useDispatch } from "react-redux";

function SingleProduct ({product}) {

    
    const dispatch = useDispatch()
    console.log(product)

    function pushToCart(){
        dispatch(addToCart(product));
    }

    return (
        <>
            <h3>{product.productName}</h3>
            <p>{product.description}</p>
            <p>{product.price}$</p>
            <p>{product.stockQuantity}</p>
            <button onClick={pushToCart}>Add to Cart</button>
        </>
    )
}


export default SingleProduct