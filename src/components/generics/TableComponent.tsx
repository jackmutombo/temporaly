import Row from 'react-bootstrap/Row';
import DataTable from 'react-data-table-component';
import { customStyles } from '../../features/farm/column/CustomStyles';
// import LoadingOverlay from '../../layouts/app/LoadingOverlay';
import TableHeaderSection from './TableHeaderSection';
import { useNavigate } from 'react-router-dom';
import { logInfo } from '../../util/general';
import { Skeleton } from '@mui/material';
import ProgressComponent from './ProgressComponent';


export interface ITableComponentProps {
  columns: any;
  data: any;
  withImport?: boolean;
  withExcelTemplate?: boolean;
  title?: string;
  expandedComponent?: any;
  isExpanded: boolean;
  extraStyle?: string;
  pending?: boolean;
  pendingMessage?: string;
  searchValue?: string | '';
  onChangeSearch?: any;
  onClick?: any;
  searchPlaceHolder?: string;
  onClickTemplate?: any;
  onRowDoubleClicked?: any;
  navigateRoute?: string;
  handleRowSelected?: any;
}

export function TableComponent(props: ITableComponentProps) {
  const style = `mt-2 ${props.extraStyle}`;
  const navigate = useNavigate();

  const handleRowClicked = (row: any) => {
    logInfo(`${row.id} was clicked!`);
    if (props.navigateRoute) navigate(`${props.navigateRoute}/${row.id}`);
  };
  return (
    <Row className={style}>
      <TableHeaderSection
        title={props.title}
        withImport={props.withImport}
        searchValue={props.searchValue}
        onChangeSearch={props.onChangeSearch}
        onClick={props.onClick}
        searchPlaceHolder={props.searchPlaceHolder}
        onClickTemplate={props.onClickTemplate}
        withExcelTemplate={props.withExcelTemplate}
      />
      <DataTable
        className='mt-3'
        columns={props.columns}
        data={props.data}
        selectableRows
        customStyles={customStyles}
        highlightOnHover
        pointerOnHover
        onRowClicked={handleRowClicked}
        progressPending={props.pending}
        progressComponent={  <ProgressComponent />}
        expandableRows={props.isExpanded}
        expandableRowsComponent={props.expandedComponent}
        onSelectedRowsChange={props.handleRowSelected}
      />
    </Row>
  );
}
