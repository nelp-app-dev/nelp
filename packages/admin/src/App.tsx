import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './features/Common/Layout/Layout';
import { useAuth } from './features/Auth/auth.api';
import { Loading } from './features/Common/Loading/Loading';
import { Login } from './features/Auth/Login';

const App = () => {
  const { data, isLoading } = useAuth();

  return isLoading ? (
    <Loading loading={true} />
  ) : data?.authenticated ? (
    <Router>
      <Layout />
    </Router>
  ) : (
    <Login />
  );
};

export default App;
