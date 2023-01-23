import Col from 'react-bootstrap/Col';
import { SeachInput } from './SeachInput';

export interface ITableHeaderSectionProps {
  title?: string;
  withImport?: boolean;
  withExcelTemplate?: boolean;
  searchValue?: string;
  searchPlaceHolder?: string;
  onChangeSearch?: any;
  onClick?: any;
  onClickTemplate?: any;
}

export default function TableHeaderSection(props: ITableHeaderSectionProps) {
  return (
    <>
      {props.title && (
        <Col>
          <h4>{props.title}</h4>
        </Col>
      )}
      <Col
        xs={2}
        className=' d-flex justify-content-end'
      >
        {props.searchPlaceHolder && (
          <SeachInput
            placeHolder={props.searchPlaceHolder}
            name='search'
            type='text'
            id='searchInputId'
            value={props.searchValue || ''}
            onChange={props.onChangeSearch}
          />
        )}
      </Col>
      {props.withExcelTemplate && (
        <Col
          xs={2}
          className=' d-flex text-center justify-content-end'
        >
          <button
            type='button'
            className='btn btn-sec-form  btn-sm form-control '
            onClick={props.onClickTemplate}
          >
            Download Spreadsheet Template
          </button>
        </Col>
      )}

      {props.withImport && (
        <Col
          xs={2}
          className=' d-flex text-center justify-content-end'
        >
          <button
            type='button'
            className='btn btn-form  btn-sm form-control'
            onClick={props.onClick}
          >
            Import
          </button>
        </Col>
      )}
    </>
  );
}
