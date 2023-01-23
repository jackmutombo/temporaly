import { InputText } from '../../../components/inputs/InputText';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import textConstants from '../../../util/textConstants';

export interface IStep2Props {
  register: UseFormRegister<FieldValues>;
}

const {
  genericsText: {
    input: { leafSample },
  },
} = textConstants;

export function Step2(props: IStep2Props) {
  return (
    <div>
      <div className='form-group'>
        <label htmlFor={leafSample.N.name}>{leafSample.N.label}</label>
        <InputText
          type='text'
          placeHolder={leafSample.N.placeHolder}
          id={leafSample.N.id}
          autoFocus
          name={leafSample.N.name}
          register={props.register}
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor={leafSample.P.name}>{leafSample.P.label}</label>
        <InputText
          type='text'
          placeHolder={leafSample.P.placeHolder}
          id={leafSample.P.id}
          name={leafSample.P.name}
          register={props.register}
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor={leafSample.K.name}>{leafSample.K.label}</label>
        <InputText
          type='text'
          placeHolder={leafSample.K.placeHolder}
          id={leafSample.K.id}
          name={leafSample.K.name}
          register={props.register}
        />
      </div>

      <div className='form-group mt-2'>
        <label htmlFor={leafSample.Ca.name}>{leafSample.Ca.label}</label>
        <InputText
          type='text'
          placeHolder={leafSample.Ca.placeHolder}
          id={leafSample.Ca.id}
          name={leafSample.Ca.name}
          register={props.register}
        />
      </div>

      <div className='form-group mt-2'>
        <label htmlFor={leafSample.Mg.name}>{leafSample.Mg.label}</label>
        <InputText
          type='text'
          placeHolder={leafSample.Mg.placeHolder}
          id={leafSample.Mg.id}
          name={leafSample.Mg.name}
          register={props.register}
        />
      </div>

      <div className='form-group mt-2'>
        <label htmlFor={leafSample.S.name}>{leafSample.S.label}</label>
        <InputText
          type='text'
          placeHolder={leafSample.S.placeHolder}
          id={leafSample.S.id}
          name={leafSample.S.name}
          register={props.register}
        />
      </div>

      <div className='form-group mt-2'>
        <label htmlFor={leafSample.Cl.name}>{leafSample.Cl.label}</label>
        <InputText
          type='text'
          placeHolder={leafSample.Cl.placeHolder}
          id={leafSample.Cl.id}
          name={leafSample.Cl.name}
          register={props.register}
        />
      </div>
    </div>
  );
}
