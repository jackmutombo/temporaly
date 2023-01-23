import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { RowKeyValue } from '../../components/generics/RowKeyValue';

export interface ISampleDetailProps {}
export const LeafSampleDetail = ({ data }: { data: any }) => {
  return (
    <div className='mt-3'>
      <div className='m-3'>
        <span className='fw-bold '>Sample Details</span>
        <hr className='w-50 ' />
      </div>

      <Row className='m-2'>
        <Col xs={4}>
          <RowKeyValue
            size={3}
            title='Lab'
            value={data.inteligroLabNumber}
          />
          <RowKeyValue
            size={3}
            title='Sample Date'
            value={data.createdDate}
          />
          <RowKeyValue
            size={3}
            title='Crop'
            value={data.crop}
          />
          <RowKeyValue
            size={3}
            title='Agronamist/Agent'
            value={data.createdBy}
          />
        </Col>
        <Col xs={4}>
          <RowKeyValue
            size={3}
            title='N (%)'
            value={data.n}
          />
          <RowKeyValue
            size={3}
            title='P (%)'
            value={data.p}
          />
          <RowKeyValue
            size={3}
            title='K (%)'
            value={data.k}
          />
          <RowKeyValue
            size={3}
            title='Ca (%)'
            value={data.ca}
          />
          <RowKeyValue
            size={3}
            title='Mg (%)'
            value={data.mg}
          />
          <RowKeyValue
            size={3}
            title='S (%)'
            value={data.s}
          />
          <RowKeyValue
            size={3}
            title='Cl (%)'
            value={data.cl}
          />
        </Col>

        <Col xs={4}>
          <RowKeyValue
            size={3}
            title='Na (mg/kg)'
            value={data.na}
          />
          <RowKeyValue
            size={3}
            title='Mn (mg/kg)'
            value={data.mn}
          />
          <RowKeyValue
            size={3}
            title='Fe (mg/kg)'
            value={data.fe}
          />
          <RowKeyValue
            size={3}
            title='Cu (mg/kg)'
            value={data.cu}
          />
          <RowKeyValue
            size={3}
            title='Zn (mg/kg)'
            value={data.zn}
          />
          <RowKeyValue
            size={3}
            title='B (mg/kg)'
            value={data.b}
          />
          <RowKeyValue
            size={3}
            title='Mo (mg/kg)'
            value={data.mo}
          />
        </Col>
      </Row>
    </div>
  );
};
