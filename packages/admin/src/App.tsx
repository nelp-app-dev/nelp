import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './features/Common/Layout/Layout';

// const App = () => (
//   <Admin dataProvider={dataProvider}>
//     <Resource
//       name="products"
//       list={ProductList}
//       edit={ProductEdit}
//       create={ProductCreate}
//     />
//     <Resource
//       name="collections"
//       list={CollectionList}
//       edit={CollectionEdit}
//       create={CollectionCreate}
//     />
//     <Resource name="collection-types" />
//     {/* <Resource
//       name="product-types"
//       options={{ label: 'Product Types' }}
//       list={ProductTypesList}
//       edit={ProductTypesEdit}
//       create={ProductTypesCreate}
//     />
//     <Resource
//       name="collections"
//       list={CollectionList}
//       edit={CollectionEdit}
//       create={CollectionCreate}
//     /> */}
//   </Admin>
// );

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
