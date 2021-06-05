import { Avatar, Box } from '@material-ui/core';
import { GridCellParams, GridColDef } from '@material-ui/data-grid';
import { useEffect } from 'react';
import { useNav } from '../Common/Layout/layout.store';
import { List, EditButton } from '../Common/Layout/List/List';
import { useProducts } from './product.api';

const Image = ({ params }: { params: GridCellParams }) => {
  return (
    <Avatar
      alt={(params.value || '').toString()}
      src={(params.value || '').toString()}
      style={{ width: ' 40px', height: '40px', backgroundColor: '#eee' }}
    />
  );
};

const columns: GridColDef[] = [
  {
    field: 'image',
    headerName: 'Image',
    headerClassName: 'table-header',
    sortable: false,
    width: 90,
    renderCell: (params: GridCellParams) => <Image params={params} />,
  },
  {
    field: 'name',
    headerName: 'Name',
    headerClassName: 'table-header',
    flex: 1,
  },
  // {
  //   field: 'collectionType',
  //   headerName: 'Collection Type',
  //   headerClassName: 'table-header',
  //   flex: 1,
  //   sortable: false,
  //   renderCell: (params: any) => (
  //     <Box>{params.value.collection.name + ' - ' + params.value.name}</Box>
  //   ),
  // },
  {
    field: 'price',
    headerName: 'Price',
    headerClassName: 'table-header',
    flex: 1,
  },
  {
    field: 'id',
    headerName: 'Actions',
    headerClassName: 'table-header',
    sortable: false,
    flex: 1,
    disableClickEventBubbling: true,
    renderCell: (params: any) => (
      <EditButton to={`/products/${params.value}`} />
    ),
  },
];

export const ProductList = () => {
  const { setTitle } = useNav();
  const { data = [], isLoading } = useProducts();

  useEffect(() => {
    setTitle('Products');
  }, []);

  return (
    <List
      loading={isLoading}
      resource="products"
      columns={columns}
      rows={data}
    />
  );
};
