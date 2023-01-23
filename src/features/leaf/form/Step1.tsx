import { InputText } from '../../../components/inputs/InputText';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import textConstants from '../../../util/textConstants';

export interface IStep1Props {
  register: UseFormRegister<FieldValues>;
}

const {
  genericsText: {
    input: { leafSample },
  },
} = textConstants;

export function Step1(props: IStep1Props) {
  return (
    <div>
      <div className='form-group'>
        <label htmlFor={leafSample.Lab.name}>{leafSample.Lab.label}</label>
        <InputText
          type='text'
          placeHolder={leafSample.Lab.placeHolder}
          id={leafSample.Lab.id}
          autoFocus
          name={leafSample.Lab.name}
          register={props.register}
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor={leafSample.SampleDate.name}>
          {leafSample.SampleDate.label}
        </label>
        <InputText
          type='text'
          placeHolder={leafSample.SampleDate.placeHolder}
          id={leafSample.SampleDate.id}
          name={leafSample.SampleDate.name}
          register={props.register}
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor={leafSample.Crop.name}>{leafSample.Crop.label}</label>
        <InputText
          type='text'
          placeHolder={leafSample.Crop.placeHolder}
          id={leafSample.Crop.id}
          name={leafSample.Crop.name}
          register={props.register}
        />
      </div>
    </div>
  );
}
