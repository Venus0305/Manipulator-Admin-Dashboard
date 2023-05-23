import i18n from 'i18n';
import { create } from 'zustand';

export interface GlobalState {
  lng: string;
  setLng: (payload: string) => void;
}
const useGlobalState = create<GlobalState>((set) => ({
  lng: i18n.language,
  setLng: (payload) => set({ lng: payload }),
}));

export default useGlobalState;
