import { InputText } from '../../../components/inputs/InputText';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import textConstants from '../../../util/textConstants';

export interface IStep1Props {
  register: UseFormRegister<FieldValues>;
}

const {
  genericsText: {
    input: { soilSample },
  },
} = textConstants;

export function Step1(props: IStep1Props) {
  return (
    <div>
      <div className='form-group'>
        <label htmlFor={soilSample.Lab.name}>{soilSample.Lab.label}</label>
        <InputText
          type='text'
          placeHolder={soilSample.Lab.placeHolder}
          id={soilSample.Lab.id}
          autoFocus
          name={soilSample.Lab.name}
          register={props.register}
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor={soilSample.SampleDate.name}>
          {soilSample.SampleDate.label}
        </label>
        <InputText
          type='text'
          placeHolder={soilSample.SampleDate.placeHolder}
          id={soilSample.SampleDate.id}
          name={soilSample.SampleDate.name}
          register={props.register}
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor={soilSample.Crop.name}>{soilSample.Crop.label}</label>
        <InputText
          type='text'
          placeHolder={soilSample.Crop.placeHolder}
          id={soilSample.Crop.id}
          name={soilSample.Crop.name}
          register={props.register}
        />
      </div>

      <div className='form-group mt-2'>
        <label htmlFor={soilSample.DepthTop.name}>
          {soilSample.DepthTop.label}
        </label>
        <InputText
          type='text'
          placeHolder={soilSample.DepthTop.placeHolder}
          id={soilSample.DepthTop.id}
          name={soilSample.DepthTop.name}
          register={props.register}
        />
      </div>

      <div className='form-group mt-2'>
        <label htmlFor={soilSample.DepthBottom.name}>
          {soilSample.DepthBottom.label}
        </label>
        <InputText
          type='text'
          placeHolder={soilSample.DepthBottom.placeHolder}
          id={soilSample.DepthBottom.id}
          name={soilSample.DepthBottom.name}
          register={props.register}
        />
      </div>

      <div className='form-group mt-2'>
        <label htmlFor={soilSample.pH.name}>{soilSample.pH.label}</label>
        <InputText
          type='text'
          placeHolder={soilSample.pH.placeHolder}
          id={soilSample.pH.id}
          name={soilSample.pH.name}
          register={props.register}
        />
      </div>

      <div className='form-group mt-2'>
        <label htmlFor={soilSample.Resistance.name}>
          {soilSample.Resistance.label}
        </label>
        <InputText
          type='text'
          placeHolder={soilSample.Resistance.placeHolder}
          id={soilSample.Resistance.id}
          name={soilSample.Resistance.name}
          register={props.register}
        />
      </div>
    </div>
  );
}
