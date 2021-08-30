//import dotenv from 'dotenv';
import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Navbar from '../src/components/Navbar';
import Error from '../src/components/Error';
import Product_Dashboard from '../src/components/Product_Dashboard';
import Cart_Dashboard from '../src/components/Cart_Dashboard';
import Login from '../src/components/Login';
import SignUp from '../src/components/SignUp';
import Prod_Desc from './components/Prod_Desc';

//dotenv.config();

function App() {
  let { path } = useRouteMatch();

  return (
    <div>
      <Navbar/>

        <Switch>
          {/* <Route path={['/products', `${path}/desc/:id`]} component={Product_Dashboard} /> */}
          <Route path='/products' component={Product_Dashboard} />
          <Route path='/cart' component={Cart_Dashboard} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          {/* <Route path={`${match.path}/desc/:id`} component={Prod_Desc} /> */}
          <Route component={Error}></Route>
        </Switch>
    </div>
  )
}

export default App;
