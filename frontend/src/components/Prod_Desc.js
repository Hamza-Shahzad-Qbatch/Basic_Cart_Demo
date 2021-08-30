import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';

import { fetchProduct } from '../redux/prodHandler';
import { useSelector, useDispatch } from 'react-redux';

function Prod_Desc() {
    const dispatch = useDispatch();
    const { p_id } = useParams();
    const { selectedProduct } = useSelector(state => state.product);

    const splitRight = {
        height: 'fitContent', minHeight: '450px', width: '21%', position: 'fixed', zIndex: '1', top: '90px',
        padding: '0px 15px 20px', right: '15px', backgroundColor: '#0c5853', textAlign: 'center'
    };

    useEffect(() => {
        dispatch(fetchProduct(p_id));
    }, [p_id])

    return (
        <>
            <Grid style={splitRight}>
                <h1 style={{ color: 'turquoise' }}>Description</h1>
                {selectedProduct !== null?
                    <>
                        <img src={selectedProduct.image} width='200' height='150'
                            style={{
                                textAlign: 'center',
                                objectFit: 'fill'
                            }} /> <br /><br />

                        {selectedProduct.description}
                    </> : <h1>No Product Found</h1>
                }
            </Grid>
        </>
    )
}

export default Prod_Desc;
