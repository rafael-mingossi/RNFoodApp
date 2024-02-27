import {create} from 'zustand';
import {categories} from '@assets';

type Categories = {
  text: string;
  img: any;
};

export type CategoryState = {
  categories: Categories[];
  setFilteredData: (categoriesNew: Categories[]) => void;
};

const useCategoryStore = create<CategoryState>()(set => ({
  categories,
  setFilteredData: categoriesFiltered => {
    set(state => ({
      ...state,
      categories: [...categoriesFiltered],
    }));
  },
}));
export default useCategoryStore;
