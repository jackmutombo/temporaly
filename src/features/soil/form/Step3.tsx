import { InputText } from '../../../components/inputs/InputText';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import textConstants from '../../../util/textConstants';

export interface IStep3Props {
  register: UseFormRegister<FieldValues>;
}

const {
  genericsText: {
    input: { soilSample },
  },
} = textConstants;

export function Step3(props: IStep3Props) {
  return (
    <div>
      <div className='form-group'>
        <label htmlFor={soilSample.Na.name}>{soilSample.Na.label}</label>
        <InputText
          type='text'
          placeHolder={soilSample.Na.placeHolder}
          id={soilSample.Na.id}
          autoFocus
          name={soilSample.Na.name}
          register={props.register}
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor={soilSample.K.name}>{soilSample.K.label}</label>
        <InputText
          type='text'
          placeHolder={soilSample.K.placeHolder}
          id={soilSample.K.id}
          name={soilSample.K.name}
          register={props.register}
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor={soilSample.H.name}>{soilSample.H.label}</label>
        <InputText
          type='text'
          placeHolder={soilSample.H.placeHolder}
          id={soilSample.H.id}
          name={soilSample.H.name}
          register={props.register}
        />
      </div>

      <div className='form-group mt-2'>
        <label htmlFor={soilSample.Ca.name}>{soilSample.Ca.label}</label>
        <InputText
          type='text'
          placeHolder={soilSample.Ca.placeHolder}
          id={soilSample.Ca.id}
          name={soilSample.Ca.name}
          register={props.register}
        />
      </div>

      <div className='form-group mt-2'>
        <label htmlFor={soilSample.Mg.name}>{soilSample.Mg.label}</label>
        <InputText
          type='text'
          placeHolder={soilSample.Mg.placeHolder}
          id={soilSample.Mg.id}
          name={soilSample.Mg.name}
          register={props.register}
        />
      </div>
    </div>
  );
}
