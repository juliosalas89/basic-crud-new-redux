import React from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { setProductToEdit, deleteProductAction } from '../redux/products.slice.js';
import { useNavigate } from 'react-router-dom';

const Product = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { name, price, id } = product;

    const handleDelete = () => {
        dispatch(deleteProductAction(product))
    }

    const handleEdit = () => {
        dispatch(setProductToEdit(product));
        navigate('/products/new')
    }

    return (
        <tr>
            <td>{name}</td>
            <td className='text-center'>$ {price}</td>
            <td className='actions'>
                <button
                    onClick={handleEdit}
                    className='btn btn-primary mr-2'>Edit</button>
                <button
                    onClick={handleDelete}
                    type='button'
                    className='btn btn-danger'
                >Delete</button>
            </td>
        </tr>
    );
};

export default Product;