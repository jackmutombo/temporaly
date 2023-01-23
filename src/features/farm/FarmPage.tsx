import { useState } from 'react';
import * as Excel from 'exceljs';
import { AddButton } from '../../components/buttons/AddButton';
import ActionMenu from '../../components/generics/ActionMenu';
import CustomPagination from '../../components/generics/CustomPagination';
import { TableComponent } from '../../components/generics/TableComponent';
import { Header } from '../../components/header/Header';
import NavBar from '../../components/navBar/NavBar';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { logDebug, getSampleArray } from '../../util/general';
import textConstants from '../../util/textConstants';
import { setFarmParams } from './farmSlice';
import { FarmModal } from './modal/FarmModal';
import { ImportSampleModal } from './modal/ImportSampleModal';
import { SelectChangeEvent } from '@mui/material/Select';
import useFarms from '../../hooks/useFarms';
import useAllEntitiesData from '../../hooks/useAllEntitiesData';
import { ImportTableModal } from './modal/ImportTableModal';
import { toggleDropZoneModal } from '../excelUpload/excelSlice';
import { TemplateModal } from '../excelUpload/TemplateModal';
import Skeleton from '@mui/material/Skeleton';

export interface IFarmGridProps {}

export function FarmPage(props: IFarmGridProps) {
  const {
    farms,
    status,
    metaData: { pageSize, totalPages },
  } = useFarms();

  const { allBusinesses, allFarms } = useAllEntitiesData();
  const { farmParams } = useAppSelector(state => state.farm);
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState('');
  const [page, setPage] = useState(1);
  const [openSampleModal, setOpenSampleModal] = useState(false);
  const [SelectPageSize, setSelectPageSize] = useState('8'); // to do in configuration file
  const { user } = useAppSelector(state => state.user);

  const [templateModalShow, setTemplateModalShow] = useState(false);

  function onChangeSearch(val: any) {
    logDebug(val);
    dispatch(setFarmParams({ textSearch: val }));
  }

  const handleShow = (modal: string) => {
    setShow(true);
    setModal(modal);
    dispatch(toggleDropZoneModal());
  };

  const handleClose = () => setShow(false);

  const handleOpenSampleModal = () => setOpenSampleModal(true);
  const handleCloseSampleModal = () => setOpenSampleModal(false);

  const onChangeSetSize = (event: SelectChangeEvent) => {
    setSelectPageSize(event.target.value);
    dispatch(
      setFarmParams({
        pageSize: event.target.value,
      })
    );
    // logDebug(event.target.value as string);
  };

  const handlePaginate = (event: any, pageNumber: any) => {
    setPage(pageNumber);
    dispatch(setFarmParams({ pageNumber, pageSize }));
  };
  const asciiTo = (ascii: number) => {
    return String.fromCharCode(ascii).toString();
  };

  function getCurrentDateTime(): {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  } {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    return { year, month, day, hour, minute };
  }

  function filterUniqueFarms(farms: string[]): string[] {
    return farms.filter((element, index, array) => {
      return array.indexOf(element) === index;
    });
  }

  function getExcelColumns(sampleName: string): any[] {
    const sampleHeader = getSampleArray(sampleName).header;
    const finalColumns: any[] = [];
    sampleHeader.forEach((element: any) => {
      const obj: any = {
        header: element[0],
        key: element[1][0],
        width: element[1][1],
      };
      finalColumns.push(obj);
    });
    return finalColumns;
  }

  function openTemplateModal(): void {
    setTemplateModalShow(true);
  }
  function downloadExcelFile(sheetName: string): void {
    const { year, month, day, hour, minute } = getCurrentDateTime();
    // const template = 'SoilSample';
    const template = sheetName;
    const sufix = 'plantnutrition';

    const fileName = `${template}${year}_${month}_${day}_${hour}_${minute}_${sufix}.xlsx`;

    // Create a new Excel workbook
    const workbook = new Excel.Workbook();

    workbook.creator = user?.email ?? `${sufix}@mail.com`;
    workbook.created = new Date(year, month, day);
    // Set workbook dates to 1904 date system
    workbook.properties.date1904 = true;

    // Force workbook calculation on load
    workbook.calcProperties.fullCalcOnLoad = true;

    // Add a new worksheet to the workbook
    const worksheet = workbook.addWorksheet(template); // sheet Name

    // Add a new worksheet to the workbook
    worksheet.columns = getExcelColumns(sheetName);

    // TODO
    // check if the business is not loaded add loading spinner

    const farmOptions = allFarms?.map(item => item.name).slice(0, 10);
    // const farmOpt= [...new Set(farmOptions)];

    const distinctArray = filterUniqueFarms(farmOptions);

    const optBus = [
      `"${allBusinesses
        .slice(0, 10)
        ?.map(item => item.name)
        .join(',')}"`,
    ];
    const optFarm = [
      `"${distinctArray
        .slice(0, 10)
        .map(item => item)
        .join(',')}"`,
    ];
    const optionBlocks = ['Block 1', 'Block 2', 'Block 3'];
    const optBlock = [`"${optionBlocks.map(item => item).join(',')}"`];

    const optionsDropDown: any = {
      A2: [optBus, 'Businesses'],
      B2: [optFarm, 'Farms'],
      C2: [optBlock, 'Block'],
    };

    for (let i = 65; i < 68; i++) {
      worksheet.getCell(asciiTo(i) + 1).alignment = {
        wrapText: true,
        vertical: 'middle',
        horizontal: 'center',
      };

      worksheet.getCell(asciiTo(i) + 1).font = {
        name: 'calibri', //'Arial', // Comic Sans MS, Arial Black
        family: 6,
        size: 15,
        underline: false,
        bold: true,
        // color: { argb: 'FF00FF00' },
      };
      worksheet.getCell(asciiTo(i) + 1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'F9F9A4' },
      };

      worksheet.getCell(asciiTo(i) + 1).border = {
        right: { style: 'thin', color: { argb: 'C0C0C0' } },
        bottom: { style: 'thin', color: { argb: 'C0C0C0' } },
      };

      // create a new data validation object
      worksheet.getCell(asciiTo(i) + 2).dataValidation = {
        type: 'list',
        allowBlank: false,
        showInputMessage: true,
        showErrorMessage: true,
        formulae: [optionsDropDown[asciiTo(i) + 2][0]], //['"One,Two,Three,Four"'],
        promptTitle: optionsDropDown[asciiTo(i) + 2][1],
        prompt: 'You must select here',
      };

      // for the graduate graphic designers...
      worksheet.getCell(asciiTo(i) + 1).font = {
        name: 'calibri',
        // color: { argb: 'FFFFFF00' },
        family: 2,
        size: 14,
        italic: false,
      };
    }
    const size =
      worksheet.columns.length -
      3 + // first three column
      68; // to transform to ascii code
    for (let i = 68; i < size; i++) {
      worksheet.getCell(asciiTo(i) + 1).alignment = {
        wrapText: true,
        vertical: 'middle',
        horizontal: 'center',
      };

      worksheet.getCell(asciiTo(i) + 1).font = {
        name: 'calibri', //'Arial', // Comic Sans MS, Arial Black
        family: 4,
        size: 12,
        underline: false,
        bold: false,
        // color: { argb: 'FF00FF00' },
      };

      worksheet.getCell(asciiTo(i) + 1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'E0F8E0' }, //B4F4B4
      };

      worksheet.getCell(asciiTo(i) + 1).border = {
        right: { style: 'thin', color: { argb: 'C0C0C0' } },
        bottom: { style: 'thin', color: { argb: 'C0C0C0' } },
      };
    }

    // Generate the Excel file and trigger the download
    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    });
  }

  const FarmColumn = [
    {
      name: 'Farm Name', // TODO use textConstant
      selector: (row: { name: string }) => row.name,
    },
    {
      name: 'Farm Location', // TODO align text center
      selector: (row: { location: string }) => row.location ?? '-',
    },
    {
      name: 'Number of Blocks', // TODO use textConstant
      selector: (row: { numberOfBlock: number }) => row.numberOfBlock,
    },
    {
      name: 'Plantable Land', // TODO use textConstant
      selector: (row: { plantableLand: number }) => row.plantableLand,
    },
    {
      name: 'Primary Agent', // TODO use textConstant
      selector: (row: { primaryAgent: string }) => row.primaryAgent ?? '-',
    },
    {
      name: <AddButton onClick={() => handleShow('farm')} />,
      button: true,
      cell: (row: { id: string }) => (
        <ActionMenu viewRoute={`/farm/${row.id}`} /> // TODO use textConstant
      ),
    },
  ];

  return (
    <div>
      <NavBar elevation={0} />
      {modal === 'farm' ? (
        <FarmModal
          status={show}
          onClose={handleClose}
        />
      ) : modal === 'import' ? (
        <ImportSampleModal openSampleModal={handleOpenSampleModal} />
      ) : null}
      <ImportTableModal
        status={openSampleModal}
        onClose={handleCloseSampleModal}
      />

      <TemplateModal
        onDownloadClick={(sheetName: string) => downloadExcelFile(sheetName)}
        status={templateModalShow}
        onClose={() => setTemplateModalShow(false)}
      />

      <Header
        cover={textConstants.images.header}
        extraStyle='d-flex'
      />
      <div>
        <TableComponent
          data={farms}
          columns={FarmColumn}
          withImport={true}
          isExpanded={false}
          title='Your Farms' // TODO use textConstant
          extraStyle='p-3'
          pending={status.includes('pending')}
          pendingMessage={'Loading farms...'}
          onChangeSearch={onChangeSearch}
          searchValue={farmParams.textSearch}
          searchPlaceHolder='Search farm'
          onClick={() => handleShow('import')}
          onClickTemplate={openTemplateModal}
          withExcelTemplate={true}
          navigateRoute={'/farm'}
        />
        {!status.includes('pending') ? (
        <CustomPagination
          totalPages={totalPages}
          paginateClick={handlePaginate}
          currentPage={page}
          selectValue={SelectPageSize}
          selectOnChange={onChangeSetSize}
        />
        ) : null} 
      </div>
    </div>
  );
}
