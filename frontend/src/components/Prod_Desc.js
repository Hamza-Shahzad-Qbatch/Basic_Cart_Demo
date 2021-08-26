import React from 'react'
import { Grid } from '@material-ui/core';

function Prod_Desc(props) {

    const splitRight = {
        height: '500px', width: '21%', position: 'fixed', zIndex: '1', top: '155px',
        padding: '20px', right: '15px', backgroundColor: '#0c5853', textAlign: 'center'
    };

    return (
        <>
            <Grid style={splitRight}>
                <h1 style={{ color: 'turquoise' }}>Description</h1>
                {props.prod_desc}
                
            </Grid>
        </>
    )
}

export default Prod_Desc;
