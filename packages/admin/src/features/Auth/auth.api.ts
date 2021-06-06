import create from 'zustand';
import { api } from '../Common/api';

interface IAuthState {
  authenticated: boolean | null;
  login: (loginData: any) => any;
  verify: () => any;
}

const login = (auth: any) => api(`/v1/auth/login`, 'post', auth);
const verify = () => api(`/v1/auth/verify`);

export const useAuth = create<IAuthState>((set: any) => ({
  authenticated: null,
  error: null,
  login: async (loginData) => {
    set({ authenticated: null, error: null });
    try {
      await login(loginData);
      set({ authenticated: true });
    } catch (error) {
      set({ authenticated: false, error });
    }
  },
  verify: async () => {
    set({ authenticated: null, error: null });
    try {
      await verify();
      set({ authenticated: true });
    } catch (error) {
      set({ authenticated: false, error });
    }
  },
}));
