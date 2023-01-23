import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputText } from '../../components/inputs/InputText';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { setFarmParams } from './farmSlice';
import { debounce } from '@mui/material';

export interface ISearchProps {
  name: string;
  extraStyle?: string;
  placeHolder?: string;
}

export default function FarmSearch() {
  const { register } = useForm();
  const { farmParams } = useAppSelector(state => state.farm);
  const [textSearch, setTextSearch] = useState(farmParams.textSearch);
  const dispatch = useAppDispatch();

  const debouncedSearch = debounce((even: any) => {
    dispatch(setFarmParams({ textSearch: even.Target.value }));
  }, 1000);

  return (
    <InputText
      type='text'
      id='search'
      placeHolder='Search'
      name='search'
      register={register}
      onChangeHandler={(event: any) => {
        setTextSearch(event.target.value);
        debouncedSearch(event);
      }}
    />
  );
}
