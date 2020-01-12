import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Register from '#Features/user/pages/Register';
import Confirm from '#Features/user/pages/Confirm';
import Login from '#Features/user/pages/Login';
import Dashboard from '#Base/pages/Dashboard';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/confirm/:token" component={Confirm} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
