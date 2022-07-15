import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { setProductToEdit } from '../redux/products.slice.js';
import { useDispatch } from 'react-redux/es/exports';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setProductToEdit(null));
        navigate('/products/new')
    }

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-primary justify-content-between'>
            <div className='container'>
                <Link to='/'><h3>CRUD - React, Redux, REST API and axios.</h3></Link>
                <button
                    onClick={handleClick}
                    className='btn btn-danger  nuevo-post d-block d-dm-inline-block'
                >Add Product &#43;</button>
            </div>
        </nav>
    );
};

export default Header;