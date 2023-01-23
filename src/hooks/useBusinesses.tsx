import { useEffect } from 'react';
import { businessSelectors, fetchBusinessesAsync } from '../features/business/businessSlice';
import { useAppSelector, useAppDispatch } from '../store/configureStore';

export default function useBusinesses() {
  const businesses = useAppSelector(businessSelectors.selectAll);
  const { businessLoaded, status, metaData } = useAppSelector(state => state.business);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!businessLoaded) dispatch(fetchBusinessesAsync());
  }, [businessLoaded, dispatch]);

  return {
    businesses,
    businessLoaded,
    status,
    metaData,
  };
}
