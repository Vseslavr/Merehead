import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AppTopBar from './AppTopBar';
import CreateUser from './users/components/CreateUser';
import EditUser from './users/components/EditUser';
import Users from './users/components/Users';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const App = () => {
  return (
    <main>
      <AppTopBar />

      <div className="p-mx-3 layout-content" >
        <Switch>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/create_user">
            <CreateUser />
          </Route>
          <Route exact path="/edit_user/:id">
            <EditUser />
          </Route>
        </Switch>
      </div>
    </main>
  )
}

export default App

