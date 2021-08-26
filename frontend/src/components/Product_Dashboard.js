import React, { useEffect } from 'react'
import { Grid, Paper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { fetchProducts } from '../redux/prodHandler';
import { fetchCartProducts } from '../redux/cartHandler';
import Product from './Product';
import Prod_Desc from './Prod_Desc';

function Product_Dashboard() {
    const { prod_data, current_prod_desc } = useSelector(state => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCartProducts());
    }, [])

    return (
        <>
            <Grid container style={{ width: '80%', marginLeft: '2%' }}
                justifyContent='space-evenly'
                alignItems='center'>

                <h1 style={{ marginBottom: '50px', marginTop: '90px' }}>Products</h1>
                <Grid
                    container
                    spacing={8}
                    direction='row'
                    alignItems='center'>

                    {prod_data?.map((ele, i) => {   //prod_data?.map === (prod_data && prod_data.map)
                        return (
                            <Paper elevation={24} key={`prod_${i}`}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    padding: '10px'
                                }}>
                                <Grid item xs={10}>
                                    <Product product={ele} />
                                </Grid>
                            </Paper>
                        );
                    })}
                </Grid>
            </Grid>

            <Prod_Desc prod_desc = { current_prod_desc } />
        </>
    )
}

export default Product_Dashboard;
