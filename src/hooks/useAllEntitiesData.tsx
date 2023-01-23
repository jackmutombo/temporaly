import { useEffect } from 'react';
import { fetchAllBusinessesAsync } from '../features/business/businessSlice';
import { fetchAllFarmsAsync } from '../features/farm/farmSlice';
import { useAppSelector, useAppDispatch } from '../store/configureStore';
import { logDebug } from '../util/general';
// import { fetchAllBlocksAsync } from '../features/block/blockSlice';

export default function useAllEntitiesData() {
  const { allBusinesses } = useAppSelector(state => state.business);
  const { allFarms } = useAppSelector(state => state.farm);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      dispatch(fetchAllBusinessesAsync());
      dispatch(fetchAllFarmsAsync());
    //   dispatch(fetchAllBlocksAsync());
    } catch (error) {
      logDebug(error);
    }
  }, [dispatch]);

  return {
    allBusinesses,
    allFarms,
  };
}
