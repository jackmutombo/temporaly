import { InputText } from '../../../components/inputs/InputText';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import textConstants from '../../../util/textConstants';

export interface IStep2Props {
  register: UseFormRegister<FieldValues>;
}

const {
  genericsText: {
    input: { soilSample },
  },
} = textConstants;

export function Step2(props: IStep2Props) {
  return (
    <div>
      <div className='form-group'>
        <label htmlFor={soilSample.P.name}>{soilSample.P.label}</label>
        <InputText
          type='text'
          placeHolder={soilSample.P.placeHolder}
          id={soilSample.P.id}
          autoFocus
          name={soilSample.P.name}
          register={props.register}
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor={soilSample.Cu.name}>{soilSample.Cu.label}</label>
        <InputText
          type='text'
          placeHolder={soilSample.Cu.placeHolder}
          id={soilSample.Cu.id}
          name={soilSample.Cu.name}
          register={props.register}
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor={soilSample.Zn.name}>{soilSample.Zn.label}</label>
        <InputText
          type='text'
          placeHolder={soilSample.Zn.placeHolder}
          id={soilSample.Zn.id}
          name={soilSample.Zn.name}
          register={props.register}
        />
      </div>

      <div className='form-group mt-2'>
        <label htmlFor={soilSample.Mn.name}>{soilSample.Mn.label}</label>
        <InputText
          type='text'
          placeHolder={soilSample.Mn.placeHolder}
          id={soilSample.Mn.id}
          name={soilSample.Mn.name}
          register={props.register}
        />
      </div>

      <div className='form-group mt-2'>
        <label htmlFor={soilSample.B.name}>{soilSample.B.label}</label>
        <InputText
          type='text'
          placeHolder={soilSample.B.placeHolder}
          id={soilSample.B.id}
          name={soilSample.B.name}
          register={props.register}
        />
      </div>

      <div className='form-group mt-2'>
        <label htmlFor={soilSample.Fe.name}>{soilSample.Fe.label}</label>
        <InputText
          type='text'
          placeHolder={soilSample.Fe.placeHolder}
          id={soilSample.Fe.id}
          name={soilSample.Fe.name}
          register={props.register}
        />
      </div>

      <div className='form-group mt-2'>
        <label htmlFor={soilSample.S.name}>{soilSample.S.label}</label>
        <InputText
          type='text'
          placeHolder={soilSample.S.placeHolder}
          id={soilSample.S.id}
          name={soilSample.S.name}
          register={props.register}
        />
      </div>

      <div className='form-group mt-2'>
        <label htmlFor={soilSample.Cl.name}>{soilSample.Cl.label}</label>
        <InputText
          type='text'
          placeHolder={soilSample.Cl.placeHolder}
          id={soilSample.Cl.id}
          name={soilSample.Cl.name}
          register={props.register}
        />
      </div>
    </div>
  );
}
