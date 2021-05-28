import create from 'zustand';

interface NavState {
  title: string;
  setTitle: (title: string) => void;
}

export const useNav = create<NavState>((set: any) => ({
  title: '',
  setTitle: (title: string) => set({ title }),
}));
