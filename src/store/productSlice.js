import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = import.meta.env.VITE_API_URL


// takes in a title and an async function
// this sets up a function taht will run asynchronously and return something
export const getProducts = createAsyncThunk("GET/products", async () => {
    //this is a set timeout because it doesn't automatically happen below (commented out)
    // it is a placeholder for making an async request (mocking an await call that will await a request to an api) that will resolve after two seconds and return an array of data
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // return [{name: "dummy product"}];

    // ^^^ demo only

    const response = await fetch(`${url}/products`);
    const json = await response.json();
    return json.results;

});

//update a single product 

export const updateProduct = createAsyncThunk("PUT/products/:id", async ({ product, amount }) => {
    // id is the id of the product I want to update.
    const updatedProduct = { ...product, inStock: product.inStock + amount };

    // must stringify the object for it to fetch that data
    const response = await fetch(`${url}/products/${product._id}`, {
        method: "PUT", body: JSON.stringify(updatedProduct), headers: { "Content-Type": "application/json" },
    })
    console.log(response)
    // I expect to get back from a response after jsoning it I will get the updated response back.
    const json = await response.json();
    return json;
})

const productSlice = createSlice({
    name: "productSlice",
    initialState: {
        products: [],
        selectProduct: {}
    },
    reducers: {},
    // new property after reducers (extraReducers) that will take in a function
    // will act as a switch case and listens for that async function to be run. Wait for a function to be run. 
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and halde loading state as needed
        //when the promise comes back, promise pending promise will be fufilled => when promise is fulfilled, do the behavior after the comma
        builder.addCase(getProducts.fulfilled, (state, action) => {
            console.log(action.payload);
            state.products = action.payload
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            console.log(action.payload);
            const updatedProduct = action.payload;

            const index = state.products.findIndex(p => p._id === updatedProduct._id);
            console.log(index);
            state.products[index] = updatedProduct;
        })
    },
})

export default productSlice;