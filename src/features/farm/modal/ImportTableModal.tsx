import { Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { CustomLoadingButton } from '../../../components/buttons/LoadingButton';

// import textConstants from '../../../util/textConstants';
import Select from 'react-select';
import { TableComponent } from '../../../components/generics/TableComponent';
import { getSampleArray, logDebug } from '../../../util/general';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import {
  setRowBusinessId,
  setRowFarmId,
  setRowBlockId,
  togglePreviewModalSample,
} from '../../excelUpload/excelSlice';
import useAllEntitiesData from '../../../hooks/useAllEntitiesData';
import { useState } from 'react';
import { Farm } from '../../../models/farm';
import { Block } from '../../../models/block';
import { logErrors } from '../../../util/general';
import agent from '../../../api/agent';
import systemConstants from '../../../util/systemConstants';

export interface IImportTableProps {
  status: boolean;
  onClose?: () => void;
}
// const {
//   genericsText: {
//     input: { farm },
//   },
// } = textConstants;

const styles = {
  control: (base: any) => ({
    ...base,
    fontFamily: 'Times New Roman',
    fontSize: 14,
  }),
  menu: (base: any) => ({
    ...base,
    fontFamily: 'Times New Roman',
    fontSize: 14,
  }),
};
// const soilSHeader = soilSampleHeaderArray;
const optionBuilder = (value: string, label: string) => {
  return {
    value,
    label,
  };
};

export function ImportTableModal(props: IImportTableProps) {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [selectFarmOpts, setSelectFarmOpts] = useState<Farm[]>([]);
  const [farmOptValue, setFarmOptValue] = useState(null);
  const [blockOptValue, setBlockOptValue] = useState(null);
  const [selectBlockOpts, setSelectBlockOpts] = useState<Block[] | undefined>([]);
  const [selectCropOpts, setSelectCropOpts] = useState<Block[] | undefined>([]);

  const { LabNo, Crop, SubCrop, Cultivar } =
    systemConstants;

  const { previewSampleModalOpenOrCloseState } = useAppSelector(
    (state: { excel: any }) => state.excel
  );
  const { importSamples, finalSamples, sampleType } = useAppSelector(
    (state: { excel: any }) => state.excel
  );
  const dispatch = useAppDispatch();
  const { allBusinesses, allFarms } = useAllEntitiesData();
  const businessOpt = allBusinesses.map((item: { id: string; name: string }) =>
    optionBuilder(item.id, item.name)
  );
  const handleBusinessChange = (e: any, row: any = null) => {
    const farmOptions = allFarms.filter(item => item.businessId === e.value);
    const obj = {
      businessId: e.value,
      labNo: row ? [row.labNo] : selectedRows.map(item => item.labNo),
      selectedBusinessOpt: e,
      farmOptions,
    };
    dispatch(setRowBusinessId(obj));
    // when call from multiple select option dropdown business
    if (row === null) {
      setSelectFarmOpts(farmOptions);
      setFarmOptValue(null);
      setBlockOptValue(null);
    }
  };

  const handleSelectedBusinessOptValues = (row: any) => {
    if (
      finalSamples.some((item: { labNo: string }) => item.labNo === row.labNo)
    ) {
      const data = finalSamples.find(
        (item: { labNo: string }) => item.labNo === row.labNo
      )?.selectedBusinessOpt;
      return data;
    }
    return null;
  };

  const handleSelectedFarmOptValues = (row: any) => {
    if (
      finalSamples.some((item: { labNo: string }) => item.labNo === row.labNo)
    ) {
      const data = finalSamples.find(
        (item: { labNo: string }) => item.labNo === row.labNo
      )?.selectedFarmOpt;
      return data;
    }
    return null;
  };

  const handleSelectedBlockOptValues = (row: any) => {
    if (
      finalSamples.some((item: { labNo: string }) => item.labNo === row.labNo)
    ) {
      const data = finalSamples.find(
        (item: { labNo: string }) => item.labNo === row.labNo
      )?.selectedBlockOpt;
      return data;
    }
    return null;
  };

  const handleFarmChange = (e: any, row: any = null) => {
    const blockOpts = allFarms.find(
      (item: { id: string }) => item.id === e.value
    )?.farmBlocks;
    const obj = {
      farmId: e.value,
      labNo: row ? [row.labNo] : selectedRows.map(item => item.labNo),
      selectedFarmOpt: e,
      blockOpts,
    };
    dispatch(setRowFarmId(obj));
    // when call from multiple select option dropdown farm
    if (row === null) {
      setSelectBlockOpts(blockOpts);
      setFarmOptValue(e);
      setBlockOptValue(null);
    }
  };

  const handleBlockChange = (e: any, row: any = null) => {
    const obj = {
      blockId: e.value,
      labNo: row ? [row.labNo] : selectedRows.map(item => item.labNo),
      selectedBlockOpt: e,
    };
    dispatch(setRowBlockId(obj));
    if (row === null) {
      setBlockOptValue(e);
    }
  };

  const handleOnChangeSelectedRow = (row: any) => {
    setSelectedRows(row.selectedRows);
  };

  const getFarmsOptions = (row: any) => {
    if (finalSamples) {
      const rowData = finalSamples.find(
        (item: { labNo: string }) => item.labNo === row.labNo
      ).farmOptions;
      if (rowData) {
        const opts = rowData.map((item: { id: string; name: string }) =>
          optionBuilder(item.id, item.name)
        );
        return opts;
      }
    }
    return null;
  };

  const getSelectedDropdownFarmsOptions = () => {
    if (selectFarmOpts) {
      const opts = selectFarmOpts.map((item: { id: string; name: string }) =>
        optionBuilder(item.id, item.name)
      );
      return opts;
    }
    return undefined;
  };

  const getSelectedDropdownBlockOptions = () => {
    if (selectBlockOpts) {
      const opts = selectBlockOpts.map((item: { id: string; name: string }) =>
        optionBuilder(item.id, item.name)
      );
      return opts;
    }
    return undefined;
  };

  const getSelectedDropdownCropOptions = () => {
    if (selectCropOpts) {
      const opts = selectCropOpts.map((item: { id: string; name: string }) =>
        optionBuilder(item.id, item.name)
      );
      return opts;
    }
    return undefined;
  };

  const getBlocksOptions = (row: any) => {
    if (finalSamples) {
      const rowData = finalSamples.find(
        (item: { labNo: string }) => item.labNo === row.labNo
      ).blockOpts;
      if (rowData) {
        const opts = rowData.map((item: { id: string; name: string }) =>
          optionBuilder(item.id, item.name)
        );
        return opts;
      }
    }
    return null;
  };

  const handleSubmit = () => {
    try {
      const request = finalSamples.map(
        (item: {
          labNo: any;
          businessId: any;
          farmId: any;
          blockId: any;
          cropId: any;
          depthTop: any;
          depthBottom: any;
          texture: any;
          ph: any;
          resistance: any;
          na: any;
          p: any;
          k: any;
          h: any;
          ca: any;
          mg: any;
          cu: any;
          zn: any;
          mn: any;
          b: any;
          fe: any;
          s: any;
          cl: any;
          c: any;
          n: any;
          stone: any;
          clay: any;
        }) => ({
          labNo: item.labNo,
          businessId: item.businessId,
          farmId: item.farmId,
          blockId: item.blockId,
          depthTop: item.depthTop,
          depthBottom: item.depthBottom,
          texture: item.texture.toString(),
          ph: item.ph,
          resistance: item.resistance,
          na: item.na,
          p: item.p,
          k: item.k,
          h: item.h,
          ca: item.ca,
          mg: item.mg,
          cu: item.cu,
          zn: item.zn,
          mn: item.mn,
          b: item.b,
          fe: item.fe,
          s: item.s,
          cl: item.cl,
          c: item.c,
          n: item.n,
          stone: item.stone,
          clay: item.clay,
        })
      );
      const response = agent.SoilSample.createSoilSamples(request);
      logDebug(response);
    } catch (error) {
      logErrors(error);
    }
  };

  const TemplateColumns: any = [
    {
      name: 'Farm Business', // TODO use textConstant
      button: true,
      width: '200px',
      cell: (row: { id: string }) => (
        <div style={{ width: '180px' }}>
          <Select
            value={handleSelectedBusinessOptValues(row)}
            options={businessOpt}
            onChange={e => handleBusinessChange(e, row)}
            className='mx-2 my-2'
            styles={styles}
            placeholder='select business'
          />
        </div>
      ),
    },
    {
      name: 'Farm ', // TODO align text center
      button: true,
      width: '180px',
      cell: (row: { id: string }) => (
        <div style={{ width: '180px' }}>
          <Select
            value={handleSelectedFarmOptValues(row)}
            options={getFarmsOptions(row)}
            onChange={e => handleFarmChange(e, row)}
            className='mx-2 my-2'
            styles={styles}
            placeholder='select farm'
          />
        </div>
      ),
    },
    {
      name: 'Block Name', // TODO use textConstant
      button: true,
      width: '180px',
      cell: (row: { id: string }) => (
        <div style={{ width: '180px' }}>
          <Select
            value={handleSelectedBlockOptValues(row)}
            options={getBlocksOptions(row)}
            onChange={e => handleBlockChange(e, row)}
            className='mx-2 my-2'
            styles={styles}
            placeholder='select block'
          />
        </div>
      ),
    },
  ];

  function getCustomColumn(columnName: string): object | null {
    let obj = {
      name: columnName,
      button: true,
      width: '200px',
    };
    switch (columnName) {
      // case FarmBusiness:
      //   return {
      //     name: 'Farm Business', // TODO use textConstant
      //     button: true,
      //     width: '200px',
      //     cell: (row: { id: string }) => (
      //       <div style={{ width: '180px' }}>
      //         <Select
      //           value={handleSelectedBusinessOptValues(row)}
      //           options={businessOpt}
      //           onChange={e => handleBusinessChange(e, row)}
      //           className='mx-2 my-2'
      //           styles={styles}
      //           placeholder='select business'
      //         />
      //       </div>
      //     ),
      //   };
      // case Farm:
      //   return {
      //     ...obj,
      //     width: '180px',
      //     cell: (row: { id: string }) => (
      //       <div style={{ width: '180px' }}>
      //         <Select
      //           value={handleSelectedFarmOptValues(row)}
      //           options={getFarmsOptions(row)}
      //           onChange={e => handleFarmChange(e, row)}
      //           className='mx-2 my-2'
      //           styles={styles}
      //           placeholder='select farm'
      //         />
      //       </div>
      //     ),
      //   };
      // case BlockName:
        // return {
        //   ...obj,
        //   width: '180px',
        //   cell: (row: { id: string }) => (
        //     <div style={{ width: '180px' }}>
        //       <Select
        //         value={handleSelectedBlockOptValues(row)}
        //         options={getBlocksOptions(row)}
        //         onChange={e => handleBlockChange(e, row)}
        //         className='mx-2 my-2'
        //         styles={styles}
        //         placeholder='select block'
        //       />
        //     </div>
        //   ),
        // };
      case Crop:
        return {
          ...obj,
          cell: (row: { id: string }) => (
            <div style={{ width: '180px' }}>
              <Select
                className='mx-2 my-2'
                styles={styles}
                placeholder='select business'
              />
            </div>
          ),
        };
      case SubCrop:
        return {
          ...obj,
          cell: (row: { id: string }) => (
            <div style={{ width: '180px' }}>
              <Select
                className='mx-2 my-2'
                styles={styles}
                placeholder='select farm'
              />
            </div>
          ),
        };
      case Cultivar:
        return {
          ...obj,
          cell: (row: { id: string }) => (
            <div style={{ width: '180px' }}>
              <Select
                className='mx-2 my-2'
                styles={styles}
                placeholder='select block'
              />
            </div>
          ),
        };
      default:
        return null;
    }
  }

  function getTableColumns(sheetName: string): any[] {
    const sampleHeader = getSampleArray(sheetName).header;
    const allColumn: any = TemplateColumns;
    for (let i = 3; i < sampleHeader.length; i++) {
      const header = sampleHeader[i][0];
      const key: string = sampleHeader[i][1][0];
      const obj: any = {
        name: header,
        selector: (row: { [key: string]: any }) => row[key] ?? '-',
      };
      if (header === LabNo) {
        obj.width = '102px';
      }

      const customColumn = getCustomColumn(header);
      if (customColumn) {
        allColumn.push(customColumn);
        continue;
      }
      allColumn.push(obj);
    }
    return allColumn;
  }
  return (
    <>
      <Modal
        show={previewSampleModalOpenOrCloseState}
        onHide={() => dispatch(togglePreviewModalSample())}
        dialogClassName='modal-dialog-custom-size'
        centered
      >
        <Modal.Body>
          <Modal.Header
            // closeButton
            className='border-0 text-center'
          >
            <Modal.Title className='w-100'>
              {'Preview and Submit Selected Farm Information from Excel File'}
            </Modal.Title>
          </Modal.Header>
          {selectedRows.length > 0 && (
            <Row className='mx-2 mt-2'>
              <Col xs={2}>
                <Select
                  options={businessOpt}
                  onChange={e => handleBusinessChange(e)}
                  className='mx-2'
                  styles={styles}
                  placeholder='select business'
                />
              </Col>
              <Col xs={2}>
                <Select
                  options={getSelectedDropdownFarmsOptions()}
                  value={farmOptValue}
                  onChange={e => handleFarmChange(e)}
                  className='mx-2'
                  styles={styles}
                  placeholder='select farm'
                />
              </Col>
              <Col xs={2}>
                <Select
                  value={blockOptValue}
                  options={getSelectedDropdownBlockOptions()}
                  onChange={e => handleBlockChange(e)}
                  className='mx-2'
                  styles={styles}
                  placeholder='select block'
                />
              </Col>
            </Row>
          )}

          <Row className='mx-3'>
            <TableComponent
              data={importSamples}
              columns={getTableColumns(sampleType)}
              isExpanded={false}
              pendingMessage={'Loading farms...'}
              handleRowSelected={handleOnChangeSelectedRow}
            />
          </Row>

          <Row className='mt-5 mb-4 justify-content-end'>
            <Col xs={2}>
              <CustomLoadingButton
                secondary={true}
                type={'submit'}
                loading={false}
                contained='contained'
                onClick={() => dispatch(togglePreviewModalSample())}
              >
                {'Cancel'}
              </CustomLoadingButton>
            </Col>
            <Col xs={2}>
              <CustomLoadingButton
                type={'submit'}
                loading={false}
                contained='contained'
                onClick={handleSubmit}
              >
                {'submit'}
              </CustomLoadingButton>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
