import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

export interface IRowKeyValueProps {
  title: string;
  value?: string | number;
  size: number;
}

export function RowKeyValue(props: IRowKeyValueProps) {
  return (
    <Row className='mt-3'>
      <Col
        className='fw-bold'
        xs={props.size}
      >
        {props.title}
      </Col>
      <Col>{props.value ?? '-'}</Col>
    </Row>
  );
}
