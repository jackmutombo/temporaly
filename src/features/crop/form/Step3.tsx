import { InputText } from '../../../components/inputs/InputText';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { InputSelect } from '../../../components/inputs/InputSelect';
import textConstants from '../../../util/textConstants';
import { Col, Row } from 'react-bootstrap';

export interface IStep3Props {
  register: UseFormRegister<FieldValues>;
}

const {
  genericsText: {
    input: { cropEntry },
  },
} = textConstants;

export function Step3(props: IStep3Props) {
  return (
    <div>
      <div className='form-group mt-3'>
        <label htmlFor={cropEntry.CropSpacing.name}>
          {cropEntry.CropSpacing.label}
        </label>
        <InputText
          type='text'
          placeHolder={cropEntry.CropSpacing.placeHolder}
          id={cropEntry.CropSpacing.id}
          autoFocus
          name={cropEntry.CropSpacing.name}
          register={props.register}
        />
      </div>
      <div className='form-group mt-3'>
        <label htmlFor={cropEntry.Fertilizer.name}>
          {cropEntry.Fertilizer.label}
        </label>
        <InputSelect
          id={cropEntry.Fertilizer.id}
          name={cropEntry.Fertilizer.name}
          register={props.register}
        />
      </div>
      <div className='form-group mt-3'>
        <label htmlFor={cropEntry.FertilizerMethod.name}>
          {cropEntry.FertilizerMethod.label}
        </label>
        <InputSelect
          id={cropEntry.FertilizerMethod.id}
          name={cropEntry.FertilizerMethod.name}
          register={props.register}
        />
      </div>
      <Row className='justify-content-center m-4'>
        {' '}
        <Col>
          <hr />
        </Col>
      </Row>

      <div className='form-group mt-3'>
        <label htmlFor={cropEntry.Irrigation.name}>
          {cropEntry.Irrigation.label}
        </label>
        <InputSelect
          id={cropEntry.Irrigation.id}
          name={cropEntry.Irrigation.name}
          register={props.register}
        />
      </div>

      <div className='form-group mt-3'>
        <label htmlFor={cropEntry.IrrigationLines.name}>
          {cropEntry.IrrigationLines.label}
        </label>
        <InputText
          type='text'
          placeHolder={cropEntry.IrrigationLines.placeHolder}
          id={cropEntry.IrrigationLines.id}
          name={cropEntry.IrrigationLines.name}
          register={props.register}
        />
      </div>

      <Row className='justify-content-center m-4'>
        {' '}
        <Col>
          <hr />
        </Col>
      </Row>

      <div className='form-group mt-3'>
        <label htmlFor={cropEntry.EmmitorSpacing.name}>
          {cropEntry.EmmitorSpacing.label}
        </label>
        <InputText
          type='text'
          placeHolder={cropEntry.EmmitorSpacing.placeHolder}
          id={cropEntry.EmmitorSpacing.id}
          name={cropEntry.EmmitorSpacing.name}
          register={props.register}
        />
      </div>

      <div className='form-group mt-3'>
        <label htmlFor={cropEntry.EmmitorDelivery.name}>
          {cropEntry.EmmitorDelivery.label}
        </label>
        <InputText
          type='text'
          placeHolder={cropEntry.EmmitorDelivery.placeHolder}
          id={cropEntry.EmmitorDelivery.id}
          name={cropEntry.EmmitorDelivery.name}
          register={props.register}
        />
      </div>
    </div>
  );
}
