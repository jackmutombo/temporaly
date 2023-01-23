import { useEffect } from 'react';
import { farmSelectors, fetchFarmsAsync } from '../features/farm/farmSlice';
import { useAppSelector, useAppDispatch } from '../store/configureStore';

export default function useFarms() {
  const farms = useAppSelector(farmSelectors.selectAll);
  const { farmLoaded, status, metaData } = useAppSelector(state => state.farm);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!farmLoaded) dispatch(fetchFarmsAsync());
  }, [farmLoaded, dispatch]);

  return {
    farms,
    farmLoaded,
    status,
    metaData,
  };
}
