import React from 'react';

const EditProduct = () => {
    return (
        <div className='row justify-content-center'>
        <div className="col-md-8">
            <div className="card">
                <div className="card-body">
                    <h2 className="text-center mb-4">Edit Porduct</h2>
                    <form>
                        <div className='form-group'>
                            <label>Product Name</label>
                            <input
                                type="text"
                                className='form-control'
                                placeholder='Name'
                                name='name'
                            />
                        </div>
                        <div className='form-group'>
                            <label>Product Price</label>
                            <input
                                type="number"
                                className='form-control'
                                placeholder='Price'
                                name='price'
                            />
                        </div>
                        <button
                            type='submit'
                            className='btn btn-primary d-block w-100 text-uppercase'
                        >Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
};

export default EditProduct;