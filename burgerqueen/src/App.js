import React from 'react';
import Header from './components/header/header';
import Menu from './components/menus/menus';
import TableStatus from './components/tableStatus/tableStatus';
import TakingOrders from './components/takingOrders/takingOrders';
import Kitchen from './components/kitchen/kitchen';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";


function App() {
    const handleAction = (id) => {
        alert(id);
    }
    return(
        <Router>
             <div>
                <Header />
                <Switch>
                    <Route path='/mesero'>
                        <Menu name="Equis" onAction = {(id)=> handleAction(id)}  />
                        <TakingOrders  />
                        <TableStatus  />
                    </Route>
                    <Route path='/cocina'>
                        <Kitchen />
                    </Route>
                    <Route path='/'>
                        <Menu name="Equis" onAction = {(id)=> handleAction(id)}  />
                        <TakingOrders />
                        <TableStatus />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App;