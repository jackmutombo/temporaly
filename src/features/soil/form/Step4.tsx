import { InputText } from '../../../components/inputs/InputText';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import textConstants from '../../../util/textConstants';

export interface IStep4Props {
  register: UseFormRegister<FieldValues>;
}

const {
  genericsText: {
    input: { soilSample },
  },
} = textConstants;

export function Step4(props: IStep4Props) {
  return (
    <div>
      <div className='form-group'>
        <label htmlFor={soilSample.C.name}>{soilSample.C.label}</label>
        <InputText
          type='text'
          placeHolder={soilSample.C.placeHolder}
          id={soilSample.C.id}
          autoFocus
          name={soilSample.C.name}
          register={props.register}
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor={soilSample.N.name}>{soilSample.N.label}</label>
        <InputText
          type='text'
          placeHolder={soilSample.N.placeHolder}
          id={soilSample.N.id}
          name={soilSample.N.name}
          register={props.register}
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor={soilSample.Stone.name}>{soilSample.Stone.label}</label>
        <InputText
          type='text'
          placeHolder={soilSample.Stone.placeHolder}
          id={soilSample.Stone.id}
          name={soilSample.Stone.name}
          register={props.register}
        />
      </div>

      <div className='form-group mt-2'>
        <label htmlFor={soilSample.Clay.name}>{soilSample.Clay.label}</label>
        <InputText
          type='text'
          placeHolder={soilSample.Clay.placeHolder}
          id={soilSample.Clay.id}
          name={soilSample.Clay.name}
          register={props.register}
        />
      </div>
    </div>
  );
}
