import { Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { InputText } from '../../../components/inputs/InputText';
import textConstants from '../../../util/textConstants';

export interface IBlockProps {
  status: boolean;
  onClose?: any;
}
const {
  genericsText: {
    input: { block },
  },
} = textConstants;
export function BlockModal(props: IBlockProps) {
  const {
    register,
  } = useForm();

  return (
    <>
      <Modal
        show={props.status}
        onHide={props.onClose}
        centered
      >
        <Modal.Body>
          <Modal.Header
            closeButton
            className='border-0 text-center'
          >
            <Modal.Title className='w-100'>Create Block</Modal.Title>
          </Modal.Header>

          <div>
            <div className='form-group mt-3'>
              <label htmlFor={block.Name.name}>{block.Name.label}</label>
              <InputText
                type='text'
                placeHolder={block.Name.placeHolder}
                id={block.Name.id}
                autoFocus
                name={block.Name.name}
                register={register}
              />
            </div>

            <div className='form-group mt-3'>
              <label htmlFor={block.Hectares.name}>
                {block.Hectares.label}
              </label>
              <InputText
                type='text'
                placeHolder={block.Hectares.placeHolder}
                id={block.Hectares.id}
                name={block.Hectares.name}
                register={register}
              />
            </div>

            <Row className=' mt-4 justify-content-center text-center'>
              <Col xs={6}>
                <button
                  type='submit'
                  className='btn btn-form  btn form-control'
                >
                  Create Block
                </button>
              </Col>
            </Row>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
