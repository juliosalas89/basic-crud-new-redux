import { createSlice } from "@reduxjs/toolkit";
import axiosClient from '../config/axiosClient.js';
import Swal from 'sweetalert2';

const initialState = {
    products: [],
    error: false,
    loading: false,
    productToEdit: null
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        addProductSuccess(state, action) {
            return {
                ...state,
                loading: false,
                products: [...state.products, action.payload]
            }
        },
        addProductError(state, action) {
            return {
                ...state,
                loading: false
            }
        },
        getProducts(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getProductsSuccess(state, action) {
            return {
                ...state,
                error: false,
                loading: false,
                products: action.payload
            }
        },
        getProductsError(state, action) {
            return {
                ...state,
                loading: false,
                error: true
            }
        },
        deleteProductSuccess(state, action) {
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload.id)
            }
        },
        setProductToEdit(state, action) {
            return {
                ...state,
                productToEdit: action.payload
            }
        },
        editProduct(state, action) {
            return {
                ...state,
                productToEdit: null,
                products: state.products.map(product => product.id === action.payload.id ? action.payload : product)
            }
        }
    }
})

//aqui pongo los thunks:
//ADD PRODUCTS THUNK
export const createProductAction = newProduct => {
    return async dispatch => {
        dispatch(addProduct());
        try {
            await axiosClient.post('/products', newProduct);
            dispatch(addProductSuccess(newProduct));
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Product added correctly',
            })
        } catch (error) {
            console.log(error)
            dispatch(addProductError());
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong...',
            })
        }
    }
}

//GET PRODUCTS THUNK
export const getProductsAction = () => {
    return async dispatch => {
        dispatch(getProducts())

        try {
            const apiRequest = await axiosClient.get('/products');
            dispatch(getProductsSuccess(apiRequest.data));
        } catch (error) {
            dispatch(getProductsError());
        }
    }
}

//DELETE PRODUCT THUNK
export const deleteProductAction = product => {
    return dispatch => {
        Swal.fire({
            title: `Do you want to delete this product?: ${product.name}`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosClient.delete(`/products/${product.id}`)
                    dispatch(deleteProductSuccess(product))
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                } catch (error) {
                    Swal.fire(
                        'Ooops!',
                        'Something went wrong...',
                        'error'
                    )
                }

            }
        })
    }
}

//EDIT PRODUCT THUNK
export const editProductAction = product => {
    return async dispatch => {
        try {
            await axiosClient.put(`products/${product.id}`, product);
            dispatch(editProduct(product));
            Swal.fire(
                'Updated!',
                'The product has been updated succesfully',
                'success'
            )
        } catch (error) {
            Swal.fire(
                'Ooops!',
                'Something went wrong...',
                'error'
            )
        }
    }
}

//Así accedo a los action que estan en el createSlice en la key "reducers", además tambien los puedo ejecutar en los thunk.
export const {
    addProduct,
    addProductSuccess,
    addProductError,
    getProducts,
    getProductsSuccess,
    getProductsError,
    deleteProductSuccess,
    setProductToEdit,
    editProduct
} = productsSlice.actions;

export default productsSlice.reducer;