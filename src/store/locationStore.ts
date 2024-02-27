import {create} from 'zustand';

export type LocationState = {
  country: string;
  setCountry: (country: string) => void;
};

const useLocationStore = create<LocationState>()(set => ({
  country: 'Select Location',
  setCountry: country => set(() => ({country: country})),
}));

export default useLocationStore;
