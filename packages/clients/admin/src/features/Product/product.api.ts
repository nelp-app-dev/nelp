import { useQuery, useMutation } from 'react-query';
import { api } from '../Common/api';

interface Collection {
  id: string;
  name: string;
}

interface CollectionType {
  id: string;
  name: string;
  collection: Collection;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  collectionType: CollectionType;
}

export const useProducts = () =>
  useQuery<Product[]>(['products'], () => api(`/v1/products`));

export const useProduct = (id: string) =>
  useQuery<Product>(['product', id], () => api(`/v1/products/${id}`));

export const useCreateProduct = () =>
  useMutation<Product>((product) => api(`/v1/products`, 'post', product));
