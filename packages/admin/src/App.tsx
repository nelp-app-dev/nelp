import './App.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { useAuth } from './features/Auth/auth.api';
import { Loading } from './features/Common/Loading/Loading';
import { useEffect, useState } from 'react';
import loadable from '@loadable/component';

const ProductList = loadable(() => import('./features/Product/ProductList'), {
  resolveComponent: (components) => components.ProductList,
});

const ProductEdit = loadable(() => import('./features/Product/ProductEdit'), {
  resolveComponent: (components) => components.ProductEdit,
});

const ProductCreate = loadable(
  () => import('./features/Product/ProductCreate'),
  {
    resolveComponent: (components) => components.ProductCreate,
  },
);

const Login = loadable(() => import('./features/Auth/Login'), {
  resolveComponent: (components) => components.Login,
});

const App = () => {
  const { verify, authenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await verify();
      setLoading(false);
    })();
  }, [verify]);

  return (
    <>
      <Router>
        {!authenticated && !loading && (
          <Switch>
            <Route path="/login" component={Login} />
            <Redirect to="/login" />
          </Switch>
        )}
        {authenticated && (
          <Switch>
            <Route path="/products" component={ProductList} />
            <Route path="/products/create" component={ProductCreate} />
            <Route path="/products/:id" component={ProductEdit} />
            <Route path="/orders">orders</Route>
            <Redirect to="/products" />
          </Switch>
        )}
      </Router>
      <Loading loading={loading} />
    </>
  );
};

export default App;
