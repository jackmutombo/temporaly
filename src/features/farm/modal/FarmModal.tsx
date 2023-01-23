import { Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { InputText } from '../../../components/inputs/InputText';
import textConstants from '../../../util/textConstants';

export interface IFarmProps {
  status: boolean;
  onClose?: any;
}
const {
  genericsText: {
    input: { farm },
  },
} = textConstants;
export function FarmModal(props: IFarmProps) {
  const { register } = useForm();

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
            <Modal.Title className='w-100'>Create Farm</Modal.Title>
          </Modal.Header>

          <div>
            <div className='form-group mt-3'>
              <label htmlFor={farm.Name.name}>{farm.Name.label}</label>
              <InputText
                type='text'
                placeHolder={farm.Name.placeHolder}
                id={farm.Name.id}
                autoFocus
                name={farm.Name.name}
                register={register}
              />
            </div>

            <div className='form-group mt-3'>
              <label htmlFor={farm.Location.name}>{farm.Location.label}</label>
              <InputText
                type='text'
                placeHolder={farm.Location.placeHolder}
                id={farm.Location.id}
                name={farm.Location.name}
                register={register}
              />
            </div>

            <div className='form-group mt-3'>
              <label htmlFor={farm.TotalSize.name}>
                {farm.TotalSize.label}
              </label>
              <InputText
                type='text'
                placeHolder={farm.TotalSize.placeHolder}
                id={farm.TotalSize.id}
                name={farm.TotalSize.name}
                register={register}
              />
            </div>
            <Row className='justify-content-center m-4'>
              {' '}
              <Col>
                <hr />
              </Col>
            </Row>

            <div className='form-group mt-3'>
              <label htmlFor={farm.FarmManager.name}>
                {farm.FarmManager.label}
              </label>
              <InputText
                type='text'
                placeHolder={farm.FarmManager.placeHolder}
                id={farm.FarmManager.id}
                name={farm.FarmManager.name}
                register={register}
              />
            </div>

            <div className='form-group mt-3'>
              <label htmlFor={farm.Email.name}>{farm.Email.label}</label>
              <InputText
                type='text'
                placeHolder={farm.Email.placeHolder}
                id={farm.Email.id}
                name={farm.Email.name}
                register={register}
              />
            </div>

            <div className='form-group mt-3'>
              <label htmlFor={farm.Contact.name}>{farm.Contact.label}</label>
              <InputText
                type='text'
                placeHolder={farm.Contact.placeHolder}
                id={farm.Contact.id}
                name={farm.Contact.name}
                register={register}
              />
            </div>

            <Row className='justify-content-center m-4'>
              {' '}
              <Col>
                <hr />
              </Col>
            </Row>

            <div className='form-group mt-3'>
              <label htmlFor={farm.CropAdvisor.name}>
                {farm.CropAdvisor.label}
              </label>
              <InputText
                type='text'
                placeHolder={farm.CropAdvisor.placeHolder}
                id={farm.CropAdvisor.id}
                name={farm.CropAdvisor.name}
                register={register}
              />
            </div>

            <div className='form-group mt-3'>
              <label htmlFor={farm.Tm.name}>{farm.Tm.label}</label>
              <InputText
                type='text'
                placeHolder={farm.Tm.placeHolder}
                id={farm.Tm.id}
                name={farm.Tm.name}
                register={register}
              />
            </div>

            <Row className=' mt-4 justify-content-center text-center'>
              <Col xs={6}>
                <button
                  type='submit'
                  className='btn btn-form  btn form-control'
                >
                  Create Farm
                </button>
              </Col>
            </Row>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
