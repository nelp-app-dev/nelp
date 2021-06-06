import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './features/Auth/auth.api';
import { Loading } from './features/Common/Loading/Loading';
import { useEffect, useState } from 'react';
import loadable from '@loadable/component';

const Layout = loadable(() => import('./features/Common/Layout/Layout'), {
  resolveComponent: (components) => components.Layout,
});

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
      {authenticated && (
        <Router>
          <Layout />
        </Router>
      )}
      {authenticated === false && <Login />}
      <Loading loading={loading} />
    </>
  );
};

export default App;
