import { createSlice } from "@reduxjs/toolkit";


function caclTot(prods) {
    var tot = 0;
    prods.forEach((v, k) => {
        tot += parseInt(v.selectedVariantPrice) * parseInt(v.quantity)
    });
    return tot;
}
function caclQuan(prods) {
    var quan = 0;
    prods.forEach((v, k) => {
        quan += parseInt(v.quantity)
    });
    return quan;
}



const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        // addProduct: (state, action) => {
        //     state.quantity += 1;
        //     console.log(state.products);
        //     state.products.push(action.payload);
        //     state.total += action.payload.price * action.payload.quantity;
        // },

        addProduct: (state, action) => {
            const { _id } = action.payload;
            const { selectedVariantName } = action.payload;
            const existingProduct = state.products.find((product) => (product._id === _id && product.selectedVariantName == selectedVariantName));

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.products.push({ ...action.payload, quantity: 1 });
            }

            // state.total += parseInt(action.payload.selectedVariantPrice) || parseInt(action.payload.price);
            state.total = caclTot(state.products);
            state.quantity += 1;
        },
        incrementProduct: (state, action) => {
            const { _id } = action.payload;
            const { selectedVariantName } = action.payload;
            const existingProduct = state.products.find((product) => (product._id === _id && product.selectedVariantName == selectedVariantName));

            if (existingProduct) {
                existingProduct.quantity += 1;
                // state.total += parseInt(action.payload.selectedVariantPrice) || parseInt(action.payload.price);
                state.total = caclTot(state.products)
                state.quantity += 1;
            }
        },
        decrementProduct: (state, action) => {
            const { _id } = action.payload;
            const { selectedVariantName } = action.payload;
            const existingProduct = state.products.find((product) => (product._id === _id && product.selectedVariantName == selectedVariantName));
            existingProduct.quantity -= 1;
            // state.total -= parseInt(action.payload.selectedVariantPrice) || parseInt(action.payload.price);
            state.total = caclTot(state.products);
            state.quantity -= 1;


        },
        deleteProduct: (state, action) => {
            state.products = action.payload;
            state.total = caclTot(action.payload);
            state.quantity = caclQuan(action.payload);
        },
        resetCart: (state) => {
            state.products = [];
            state.total = 0;
            state.quantity = 0;
        },
    },
});

export const { addProduct, incrementProduct, decrementProduct, deleteProduct, resetCart } = cartSlice.actions;
export default cartSlice.reducer;