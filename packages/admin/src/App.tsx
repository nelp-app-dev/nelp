import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './features/Common/Layout/Layout';

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
