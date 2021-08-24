import React, { useEffect } from 'react'
import Product from './Product';
import { Grid, Paper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/prodHandler';
import { fetchCartProducts } from '../redux/cartHandler';

function Product_Dashboard() {

    const { prod_data } = useSelector(state => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCartProducts());
    }, [])


    return (
        <Grid container style={{ paddingLeft: '25px' }}
            justifyContent="space-evenly"
            alignItems="center">

            <h1 style={{ marginBottom: '50px' }}>Products</h1>
            <Grid
                container
                spacing={10}
                direction="row"
                alignItems="center">

                {prod_data && prod_data.map((ele, i) => {   //prod_data?.map
                    return (
                        <Paper elevation={24} style={{ display: 'flex', justifyContent: 'center', padding: '10px'}}>
                            <Grid item xs={10}>
                                <Product product={ele} />
                            </Grid>
                        </Paper>
                    );
                })}

            </Grid>
        </Grid>
    )
}

export default Product_Dashboard;
