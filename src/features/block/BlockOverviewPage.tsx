import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { a11yProps, TabPanel } from '../../components/tab/TabPanel';
import { crop_data } from '../crop/column/CropColumn';
import { block_data } from './column/BlockColumn';
import { TableComponent } from '../../components/generics/TableComponent';
import { LeafSampleDetail } from '../leaf/LeafSampleDetail';
import { SoilSampleDetail } from '../soil/SoilSampleDetail';
import { AddButton } from '../../components/buttons/AddButton';
import ActionMenu from '../../components/generics/ActionMenu';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import BlockDetailSection from './BlockDetailSection';
import {
  fetchSoilSamplesAsync,
  soilSampleSelectors,
} from '../soil/soilSampleSlice';
import {
  leafSampleSelectors,
  fetchLeafSamplesAsync,
} from '../leaf/leafSampleSlice';

import {
  blockSelectors,
  fetchBlockAsync,
  setCurrentBlockId,
} from './blockSlice';
import { formatDateTime } from '../../util/general';

export interface IBlockOverviewProps {}

export function BlockOverviewPage() {
  const [value, setValue] = useState(0);
  const [modal, setModal] = useState('');
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { soilSampleLoaded, blockId: soilBlockId } = useAppSelector(
    state => state.soilSample
  );
  const { leafSampleLoaded, blockId: leafBlockId } = useAppSelector(
    state => state.leafSample
  );
  const block = useAppSelector(state => blockSelectors.selectById(state, id!));
  const soilSamples = useAppSelector(soilSampleSelectors.selectAll);
  const leafSamples = useAppSelector(leafSampleSelectors.selectAll);
  const handleShow = (value: string) => {
    setShow(true);
    setModal(value);
  };

  // this will fetch block detail
  useEffect(() => {
    if (!block) dispatch(fetchBlockAsync(id!));
    dispatch(setCurrentBlockId(id));
  }, [id, block, dispatch]);

  // this will fetch all Soil sample for the block id
  useEffect(() => {
    if (!soilSampleLoaded || soilBlockId !== id)
      dispatch(fetchSoilSamplesAsync(id!));
  }, [soilSampleLoaded, soilBlockId, id, dispatch]);

  // this will fetch all Leaf sample for the block id
  useEffect(() => {
    if (!leafSampleLoaded || leafBlockId !== id)
      dispatch(fetchLeafSamplesAsync(id!));
  }, [leafSampleLoaded, leafBlockId, id, dispatch]);

  const CropColumn = [
    {
      name: 'Crop Name',
      selector: (row: { crop_name: any }) => row.crop_name,
    },
    {
      name: 'Cultivar',
      selector: (row: { cultivar: any }) => row.cultivar,
    },

    {
      name: 'Fertilizer',
      selector: (row: { fertilizer: any }) => row.fertilizer,
    },
    {
      name: 'Expected Yield',
      selector: (row: { expected_yield: any }) => row.expected_yield,
    },
    {
      name: 'Plant Date',
      selector: (row: { plant_date: any }) => row.plant_date,
    },
    {
      name: 'Bloom Date',
      selector: (row: { bloom_date: any }) => row.bloom_date,
    },

    {
      name: 'Harvest Date',
      selector: (row: { harvest_date: any }) => row.harvest_date,
    },

    {
      name: <AddButton onClick={() => handleShow('crop')} />,
      button: true,
      cell: () => <ActionMenu viewRoute='' />,
    },
  ];
  // TODO move this column into own file
  const LeafColumn = [
    {
      name: 'Lab',
      selector: (row: { inteligroLabNumber: string }) => row.inteligroLabNumber,
    },
    {
      name: 'Sample Date',
      selector: (row: { createdDate: Date }) => formatDateTime(row.createdDate),
    },

    {
      name: 'Crop',
      selector: (row: { crop: string }) => row.crop,
    },
    {
      name: 'N (%)',
      selector: (row: { n: number }) => row.n,
    },
    {
      name: 'P (%)',
      selector: (row: { p: number }) => row.p,
    },
    {
      name: 'K (%)',
      selector: (row: { k: number }) => row.k,
    },
    {
      name: 'Ca (%)',
      selector: (row: { ca: number }) => row.ca,
    },
    {
      name: 'Mg (%)',
      selector: (row: { mg: number }) => row.mg,
    },

    {
      name: <AddButton onClick={() => handleShow('leaf')} />,
      button: true,
      cell: () => <ActionMenu viewRoute='' />,
    },
  ];

  // TODO move this column into own file
  const SoilColumn = [
    {
      name: 'Lab',
      selector: (row: { inteligroLabNumber: string }) => row.inteligroLabNumber,
    },
    {
      name: 'Sample Date',
      selector: (row: { createdDate: Date }) => formatDateTime(row.createdDate),
    },

    {
      name: 'Crop',
      selector: (row: { blockCrop: string }) => row.blockCrop,
    },
    {
      name: 'Depth Top (cm)',
      selector: (row: { depthTop: number }) => row.depthTop,
    },
    {
      name: 'Depth Bottom (cm)',
      selector: (row: { depthBottom: number }) => row.depthBottom,
    },
    {
      name: 'Texture',
      selector: (row: { texture: string }) => row.texture,
    },

    {
      name: 'pH (KCl)',
      selector: (row: { ph: number }) => row.ph,
    },
    {
      name: 'Resistance (ohm)',
      selector: (row: { resistance: number }) => row.resistance,
    },

    {
      name: <AddButton onClick={() => handleShow('soil')} />,
      button: true,
      cell: () => <ActionMenu viewRoute='' />,
    },
  ];

  const BlockColumn = [
    {
      name: 'Block Name',
      selector: (row: { block_name: any }) => row.block_name,
    },
    {
      name: 'Target Yield',
      selector: (row: { target_yield: any }) => row.target_yield,
    },

    {
      name: 'Plante Date',
      selector: (row: { plante_date: any }) => row.plante_date,
    },
    {
      name: 'Harvest Date',
      selector: (row: { harvest_date: any }) => row.harvest_date,
    },
    {
      name: 'Block size',
      selector: (row: { block_size: any }) => row.block_size,
    },
    {
      name: <AddButton onClick={() => handleShow('block')} />,
      button: true,
      cell: () => <ActionMenu viewRoute='/blockOverview' />,
    },
  ];
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  return (
    <>
      <BlockDetailSection
        block={block}
        farm={block}
        show={show}
        setShow={setShow}
        modal={modal}
      />

      <Row className='p-3'>
        <Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              sx={{
                '& .MuiTabs-indicator': { backgroundColor: '#4DA02B' },

                '& .Mui-selected': { color: '#4DA02B !important' },
              }}
            >
              <Tab
                style={{ minWidth: 230 }}
                label='Crop History'
                {...a11yProps(0)}
              />
              <Tab
                style={{ minWidth: 230 }}
                label='Leaf Samples'
                {...a11yProps(1)}
              />
              <Tab
                style={{ minWidth: 230 }}
                label='Soil Samples'
                {...a11yProps(2)}
              />
              <Tab
                style={{ minWidth: 230 }}
                label='Recommandations'
                {...a11yProps(3)}
              />
            </Tabs>
          </Box>
          <TabPanel
            value={value}
            index={0}
          >
            <TableComponent
              data={crop_data}
              columns={CropColumn}
              withImport={false}
              title='Crop History'
              isExpanded={false}
            />
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
          >
            <TableComponent
              isExpanded={true}
              data={leafSamples}
              columns={LeafColumn}
              withImport={false}
              title='Leaf Samples'
              expandedComponent={LeafSampleDetail}
            />
          </TabPanel>
          <TabPanel
            value={value}
            index={2}
          >
            <TableComponent
              isExpanded={true}
              data={soilSamples}
              columns={SoilColumn}
              withImport={false}
              title='Soil Samples'
              expandedComponent={SoilSampleDetail}
            />
          </TabPanel>
          <TabPanel
            value={value}
            index={3}
          >
            <TableComponent
              isExpanded={false}
              data={block_data}
              columns={BlockColumn}
              withImport={false}
              title='Recommendations'
            />
          </TabPanel>
        </Box>
      </Row>
    </>
  );
}
