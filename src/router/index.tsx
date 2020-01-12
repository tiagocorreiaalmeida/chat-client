import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Register from '#Features/user/pages/Register';
import Confirm from '#Features/user/pages/Confirm';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Register} />
        <Route path="/confirm/:token" component={Confirm} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
