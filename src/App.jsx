import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, updateProduct } from "./store/productSlice";

const App = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.productSlice.products);
    // when the page loads, dispatch will happen (useEffect). It will dispatch getProducts() function that is exported from productSlice. It will mock an axios request. When the promise is fufilled, it will run the function that will change the state from  the payload.
    useEffect(()=> {
      dispatch(getProducts())
    }, [dispatch])

    return (
    <div>
      {products.map((product) => (
      <p key={product._id} onClick={()=> dispatch(updateProduct({product, amount: - 1}))}>
        {product.name}: {product.inStock}
        </p>
        ))} 
        </div>
  )
}

export default App;