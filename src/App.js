import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <AuthWrapper>
        <Router>
          <Switch>
              <PrivateRoute path='/' exact={true}>
                <Dashboard />
              </PrivateRoute>

              <Route path='/login' component={Login} />
              <Route path='*' component={Error} />

          </Switch>

        </Router>
      </AuthWrapper>
    </div>
  );
}

export default App;
