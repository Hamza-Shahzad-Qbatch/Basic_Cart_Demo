import React, { useEffect } from 'react'
import Product from './Product';
import { Grid, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from './redux/prodHandler';
import { fetchCartProducts, insertCartProduct } from './redux/cartProdHandler';

function Product_Dashboard() {

    const { prod_data } = useSelector(state => state.productReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCartProducts());
    }, [])

    const addProdToCart = (id) => {
        dispatch(insertCartProduct(id));
    };

    return (
        <Grid container style={{ paddingLeft: '25px' }}
            justifyContent="space-evenly"
            alignItems="center">

            <h1>Products</h1>
            <Grid
                container
                spacing={10}
                direction="row"
                alignItems="center">

                {prod_data && prod_data.map((ele, i) => {   //prod_data?.map
                    return (
                        <Grid item xs={2}>
                            <Product product={ele} />
                            <Button variant="contained" color="default" onClick={() => addProdToCart(ele._id)}>Add to Cart</Button>
                        </Grid>
                    );
                })}

            </Grid>
        </Grid>
    )
}

export default Product_Dashboard;
