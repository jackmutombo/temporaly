import { TableComponent } from '../../components/generics/TableComponent';
import ActionMenu from '../../components/generics/ActionMenu';
import { AddButton } from '../../components/buttons/AddButton';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { farmSelectors, fetchFarmAsync } from './farmSlice';
import {
  blockSelectors,
  fetchBlocksAsync,
  setBlockFarmId,
  setBlockParams,
} from '../block/blockSlice';
import { logDebug, formatDateTime } from '../../util/general';
import FarmDetailSection from './FarmDetailSection';
import { SelectChangeEvent } from '@mui/material';
import CustomPagination from '../../components/generics/CustomPagination';

export interface IFarmOverviewProps {}

export function FarmOverviewPage() {
  const {
    blockLoaded,
    status,
    blockFarmId,
    metaData: { pageSize, totalPages, currentPage },
  } = useAppSelector(state => state.block);
  const [show, setShow] = useState(false);
  //const { status: farmStatus } = useAppSelector(state => state.block);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const farm = useAppSelector(state => farmSelectors.selectById(state, id!));
  const blocks = useAppSelector(blockSelectors.selectAll);
  const [page, setPage] = useState(currentPage);
  const [SelectPageSize, setSelectPageSize] = useState('8'); // to do in configuration file
  const { blockParams } = useAppSelector(state => state.block);

  const handleShow = () => {
    setShow(true);
  };

  // this will fetch farm detail
  useEffect(() => {
    // this will fetch farm detail if you reload the page
    if (!farm) dispatch(fetchFarmAsync(id!));
    dispatch(setBlockFarmId(id));
  }, [id, farm, dispatch]);

  // this will fetch all block for the farm id
  useEffect(() => {
    if (!blockLoaded || blockFarmId !== id) dispatch(fetchBlocksAsync(id!));
  }, [id, blockFarmId, blockLoaded, dispatch]);

  function onChangeSearch(val: any) {
    dispatch(setBlockParams({ textSearch: val }));
  }
  const handlePaginate = (event: any, pageNumber: any) => {
    setPage(pageNumber);
    logDebug(pageNumber);
    dispatch(
      setBlockParams({
        pageNumber,
        pageSize,
      })
    );
  };

  const onChangeSetSize = (event: SelectChangeEvent) => {
    setSelectPageSize(event.target.value);
    dispatch(
      setBlockParams({
        pageSize: event.target.value,
      })
    );
    // logDebug(event.target.value as string);
  };

  const BlockColumn = [
    {
      name: 'Block Name', // TODO use textConstant
      selector: (row: { name: string }) => row.name,
    },
    {
      name: 'Target Yield', // TODO use textConstant
      selector: (row: { targetYield: number }) => row.targetYield,
    },

    {
      name: 'Plante Date', // TODO use textConstant
      selector: (row: { plantDate: Date }) => formatDateTime(row.plantDate),
    },
    {
      name: 'Harvest Date', // TODO use textConstant
      selector: (row: { harvestDate: Date }) => formatDateTime(row.harvestDate),
    },
    {
      name: 'Block size', // TODO use textConstant
      selector: (row: { blockSize: number }) => row.blockSize,
    },
    {
      name: <AddButton onClick={() => handleShow()} />,
      button: true,
      cell: (row: { id: string }) => <ActionMenu viewRoute={`/block/${row.id}`} />, // TODO use textConstant
    },
  ];

  // logDebug('Block display', blocks);
  return (
    <>
      <FarmDetailSection
        farm={farm}
        show={show}
        setShow={setShow}
      />
      <TableComponent
        data={blocks}
        columns={BlockColumn}
        withImport={false}
        isExpanded={false}
        title='Blocks'
        extraStyle='p-3'
        pending={status.includes('pending')}
        pendingMessage={'Loading blocks...'}
        searchValue={blockParams.textSearch}
        searchPlaceHolder='Search block'
        onChangeSearch={onChangeSearch}
        navigateRoute={'/block'}
      />

      {/* {!status.includes('pending') ? ( */}
      <CustomPagination
        totalPages={totalPages}
        paginateClick={handlePaginate}
        currentPage={page}
        selectValue={SelectPageSize}
        selectOnChange={onChangeSetSize}
      />
      {/* // ) : null} */}
    </>
  );
}
