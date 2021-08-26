import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Card, Button, Typography } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import { insertCartProduct } from '../redux/cartHandler';
import { useDispatch } from 'react-redux';
import { updateCurrentProdId } from '../redux/prodHandler';
import Prod_Desc from './Prod_Desc';
import Error from './Error';

function Product(props) {
    const dispatch = useDispatch();
    let match = useRouteMatch();

    const addProdToCart = (id) => {
        dispatch(insertCartProduct(id));
    };

    const displayProdDesc = (e) => {
        if (e.target.checked) {
            const all_prods = document.getElementsByName('prod_description');
            for (const item in all_prods) {
                if (all_prods[item].checked && e.target.id !== all_prods[item].id) {
                    all_prods[item].checked = false;
                }
            }
            dispatch(updateCurrentProdId(props.product.description));
        }
        else {
            dispatch(updateCurrentProdId('No Description'));
        }
    }

    return (
        <>
            <Card
                style={{
                    minWidth: '220px',
                    backgroundColor: 'grey',
                    padding: '8px'
                }}
                variant='elevation' elevation={15}>
                <CardActionArea>
                    <CardMedia
                        component='img'
                        image={props.product.image}
                        style={{
                            width: '200px',
                            height: '150px',
                            display: 'inline',
                            objectFit: 'contain'
                        }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='h2'>
                            {props.product.name}
                        </Typography>
                        <Typography variant='body1' color='textSecondary' component='h3'>
                            <b style={{ color: 'turquoise' }}>${props.product.price}</b>
                        </Typography>
                        <Typography variant='body1' color='textSecondary' component='h3'>
                            {/* <Link to={`${match.url}/desc`}> */}
                                <input type='checkbox' name='prod_description' id={`prodId_${props.product._id}`}
                                    onClick={(e) => displayProdDesc(e)} /><b>Description</b>
                            {/* </Link> */}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button variant='contained' color='default'
                        onClick={() => addProdToCart(props.product._id)}>Add to Cart</Button>
                </CardActions>
            </Card>

            {/* <Switch>
                <Route path={`${match.path}/:desc`}>
                    <Prod_Desc />
                </Route>
                <Route>
                    <Error />
                </Route>
            </Switch> */}
        </>
    )
}

export default Product;
