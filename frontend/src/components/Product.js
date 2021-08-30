import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Card, Button, Typography } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import { insertCartProduct } from '../redux/cartHandler';
import { useDispatch } from 'react-redux';
import Error from './Error';
import { setCookie, getCookie } from '../CookieHandler';

function Product(props) {
    const dispatch = useDispatch();
    const { url } = useRouteMatch();

    const addProdToCart = (id) => {
        let obj = { p_id: id, u_id: getCookie('Token') };
        if (!getCookie('Token')) {
            setCookie('Token', Math.random().toString(36).substring(2));
            obj.u_id = getCookie('Token');
        }
        dispatch(insertCartProduct(obj));
    };

    const displayProdDesc = (element) => {
        if (!element.checked) {
            element.checked = true;
            element.disabled = false;
        }
        else {
            element.checked = false;
            element.disabled = true;
        }

        if (element.checked) {
            const all_prods = document.getElementsByName('prod_description_check');
            for (const item in all_prods) {
                if (all_prods[item].checked && element.id !== all_prods[item].id) {
                    all_prods[item].checked = false;
                    all_prods[item].disabled = true;
                }
            }
        }
        else {
            element.checked = false;
            element.disabled = true;
        }
    };

    // setCookie('Token', Math.random().toString(36).substring(2));

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
                            {/* <input type='checkbox' name='prod_description_check' disabled id={`prodId_${props.product._id}`}
                                onChange={(e) => !e.target.checked ? e.target.checked = true : e.target.checked = false} /> */}
                            {/* <Link to={`${url}/desc/${props.product._id}`}
                                onClick={() => displayProdDesc(document.getElementById(`prodId_${props.product._id}`))}>
                                <b>Description</b>
                            </Link> */}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button variant='contained' color='default'
                        onClick={() => addProdToCart(props.product._id)}>Add to Cart</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default Product;
