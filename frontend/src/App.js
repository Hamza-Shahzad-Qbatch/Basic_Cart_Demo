//import dotenv from 'dotenv';
import React from 'react'
import { Route, Switch } from 'react-router-dom';

import Navbar from '../src/components/Navbar';
import Error from '../src/components/Error';
import Product_Dashboard from '../src/components/Product_Dashboard';
import Cart_Dashboard from '../src/components/Cart_Dashboard';

//dotenv.config();

function App() {
  return (
    <div>
      <Navbar/>

        <Switch>
          <Route path='/products' component={Product_Dashboard} />
          <Route path='/cart' component={Cart_Dashboard} />
          <Route component={Error}></Route>
        </Switch>
    </div>
  )
}

export default App;
