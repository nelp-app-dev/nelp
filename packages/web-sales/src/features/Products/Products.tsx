import * as React from 'react';
import { Product } from './Product';
import axios from 'axios';
import Masonry from 'react-masonry-css';
import './Products.css';

const breakpointColumns = {
  default: 4,
  1224: 3,
  1024: 2,
  768: 1,
};

export const Products = (props: any) => {
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get('https://nelp.com:8000/v1/products');
      setProducts(data);
    })();
  }, []);

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {products.map((product: any) => (
        <Product key={product.id} {...product} {...props} />
      ))}
    </Masonry>
    // <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing="40px">
    //   {products.map((product: any) => (
    //     <Product key={product.id} {...product} />
    //   ))}
    // </SimpleGrid>
  );
};
