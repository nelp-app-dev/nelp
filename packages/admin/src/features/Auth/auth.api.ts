import { useQuery } from 'react-query';
import { api } from '../Common/api';

export interface Auth {
  authenticated: boolean;
}

export const useAuth = () =>
  useQuery<Auth>(['authenticated'], () => api(`/v1/auth/authenticated`));
