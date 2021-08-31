import React, { useEffect } from 'react'
import { Grid, Paper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Link, useRouteMatch } from 'react-router-dom';
import { CircularProgress, LinearProgress } from '@material-ui/core';

import { fetchProducts } from '../redux/prodHandler';
import { fetchUserCart } from '../redux/cartHandler';
import Product from './Product';
import Prod_Desc from './Prod_Desc';
import { setCookie, getCookie } from '../CookieHandler';

function Product_Dashboard() {
    const { prod_data } = useSelector(state => state.product);
    const { email } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { path, url } = useRouteMatch();
    const u_id = email ? email : getCookie('Token') ? getCookie('Token') : null;

    useEffect(() => {
        setTimeout(() => {
            dispatch(fetchProducts())
            if (u_id){
                dispatch(fetchUserCart(u_id));
            }
        }, 500);
    }, [])

    if (prod_data.length) {
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
                                        <Link to={`${url}/desc/${ele._id}`}>
                                            <Product product={ele} />
                                        </Link>
                                    </Grid>
                                </Paper>
                            );
                        })}
                    </Grid>
                </Grid>

                <Route path={`${path}/desc/:p_id`} >
                    <Prod_Desc />
                </Route>
            </>
        )
    }
    else {
        return (
            <div style={{ marginTop: '100px', textAlign: 'center' }}>
                <CircularProgress color="secondary" /> <br /> <br /> <br />
                <LinearProgress color="secondary" />
            </div>
        );
    }
}

export default Product_Dashboard;
