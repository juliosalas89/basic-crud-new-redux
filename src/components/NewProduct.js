import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { createProductAction, editProductAction } from '../redux/products.slice.js';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { showAlert, hideAlert } from '../redux/alert.slice.js';

const NewProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [newProduct, setNewProduct] = useState({ name: '', price: '' });

    const loading = useSelector(state => state.products.lading);
    
    const { name, price } = newProduct;
    const productToEdit = useSelector(state => state.products.productToEdit);
    const alert = useSelector(state => state.alert.alert);
    
    useEffect(()=> {
        setNewProduct({
            name: productToEdit ? productToEdit.name : '',
            price: productToEdit ? productToEdit.price : ''
        });
    },[productToEdit]);
    
    const handleChange = e => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        })
    };
    

    const handleSubmit = e => {
        e.preventDefault();

        if (!name.trim() || !price.trim()) return dispatch(showAlert('All fields are required.'));
        
        dispatch(hideAlert());

        productToEdit && dispatch(editProductAction({ ...newProduct, id: productToEdit.id }));
        !productToEdit && dispatch(createProductAction(newProduct));
        
        navigate('/');
    }

    return (
        <div className='row justify-content-center'>
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4">{productToEdit ? 'Edit Product' : 'Add Porduct'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    className='form-control'
                                    placeholder='Product Name'
                                    name='name'
                                    value={name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Product Price</label>
                                <input
                                    type="number"
                                    className='form-control'
                                    placeholder='Price'
                                    name='price'
                                    value={price}
                                    onChange={handleChange}
                                />
                            </div>
                            {alert ? <p className='alert alert-warning'>{alert}</p> : null}
                            <button
                                type='submit'
                                className='btn btn-primary d-block w-100 text-uppercase'
                            >{productToEdit ? 'Edit' : 'Add'}</button>
                        </form>
                        {loading ? <p>Loading...</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewProduct;