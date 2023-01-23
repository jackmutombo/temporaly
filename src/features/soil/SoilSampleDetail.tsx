import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { RowKeyValue } from '../../components/generics/RowKeyValue';

export interface ISoilSampleDetailProps {}
export const SoilSampleDetail = ({
  data,
  farmName,
}: {
  data: any;
  farmName: string;
}) => {
  return (
    <div className='mt-3'>
      <div className='m-3'>
        <span className='fw-bold '>Sample Details</span>
        <hr className='w-50 ' />
      </div>

      <Row className='m-2'>
        <Col xs={3}>
          <RowKeyValue
            size={4}
            title='Lab'
            value={data.inteligroLabNumber}
          />
          <RowKeyValue
            size={4}
            title='Sample Date'
            value={data.createdDate}
          />
          <RowKeyValue
            size={4}
            title='Crop'
            value={data.blockCrop}
          />
          <RowKeyValue
            size={4}
            title='Agronamist/ Agent'
            value={data.createdBy}
          />
          <RowKeyValue
            size={4}
            title='Depth Top (cm)'
            value={data.depthTop}
          />
          <RowKeyValue
            size={4}
            title='Depth Bottom (cm)'
            value={data.depthBottom}
          />
          <RowKeyValue
            size={4}
            title='pH (KCi)'
            value={data.ph}
          />
          <RowKeyValue
            size={4}
            title='Resistance (ohm)'
            value={data.resistance}
          />
        </Col>
        <Col xs={3}>
          <RowKeyValue
            size={3}
            title='P (mg/kg)'
            value={data.p}
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
            title='Mn (mg/kg)'
            value={data.mn}
          />
          <RowKeyValue
            size={3}
            title='B (mg/kg)'
            value={data.b}
          />
          <RowKeyValue
            size={3}
            title='Fe (mg/kg)'
            value={data.fe}
          />
          <RowKeyValue
            size={3}
            title='S (mg/kg)'
            value={data.s}
          />
          <RowKeyValue
            size={3}
            title='Cl (mg/kg)'
            value={data.cl}
          />
        </Col>

        <Col xs={3}>
          <RowKeyValue
            size={3}
            title='Na (cmol/kg)'
            value={data.na}
          />
          <RowKeyValue
            size={3}
            title='K (cmol/kg)'
            value={data.k}
          />
          <RowKeyValue
            size={3}
            title='H (cmol/kg)'
            value={data.h}
          />
          <RowKeyValue
            size={3}
            title='Ca (cmol/kg)'
            value={data.ca}
          />
          <RowKeyValue
            size={3}
            title='Mg (cmol/kg)'
            value={data.mg}
          />
        </Col>

        <Col xs={3}>
          <RowKeyValue
            size={3}
            title='C (%)'
            value={data.c}
          />
          <RowKeyValue
            size={3}
            title='N (%)'
            value={data.n}
          />
          <RowKeyValue
            size={3}
            title='Stone (%)'
            value={data.stone}
          />
          <RowKeyValue
            size={3}
            title='Clay (%)'
            value={data.clay}
          />
        </Col>
      </Row>
    </div>
  );
};
