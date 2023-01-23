import { InputText } from '../../../components/inputs/InputText';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import textConstants from '../../../util/textConstants';

export interface IStep3Props {
  register: UseFormRegister<FieldValues>;
}

const {
  genericsText: {
    input: { leafSample },
  },
} = textConstants;

export function Step3(props: IStep3Props) {
  return (
    <div>
      <div className='form-group'>
        <label htmlFor={leafSample.Na.name}>{leafSample.Na.label}</label>
        <InputText
          type='text'
          placeHolder={leafSample.Na.placeHolder}
          id={leafSample.Na.id}
          autoFocus
          name={leafSample.Na.name}
          register={props.register}
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor={leafSample.Mn.name}>{leafSample.Mn.label}</label>
        <InputText
          type='text'
          placeHolder={leafSample.Mn.placeHolder}
          id={leafSample.Mn.id}
          name={leafSample.Mn.name}
          register={props.register}
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor={leafSample.Fe.name}>{leafSample.Fe.label}</label>
        <InputText
          type='text'
          placeHolder={leafSample.Fe.placeHolder}
          id={leafSample.Fe.id}
          name={leafSample.Fe.name}
          register={props.register}
        />
      </div>

      <div className='form-group mt-2'>
        <label htmlFor={leafSample.Cu.name}>{leafSample.Cu.label}</label>
        <InputText
          type='text'
          placeHolder={leafSample.Cu.placeHolder}
          id={leafSample.Cu.id}
          name={leafSample.Cu.name}
          register={props.register}
        />
      </div>

      <div className='form-group mt-2'>
        <label htmlFor={leafSample.Zn.name}>{leafSample.Zn.label}</label>
        <InputText
          type='text'
          placeHolder={leafSample.Zn.placeHolder}
          id={leafSample.Zn.id}
          name={leafSample.Zn.name}
          register={props.register}
        />
      </div>

      <div className='form-group mt-2'>
        <label htmlFor={leafSample.B.name}>{leafSample.B.label}</label>
        <InputText
          type='text'
          placeHolder={leafSample.B.placeHolder}
          id={leafSample.B.id}
          name={leafSample.B.name}
          register={props.register}
        />
      </div>

      <div className='form-group mt-2'>
        <label htmlFor={leafSample.Mo.name}>{leafSample.Mo.label}</label>
        <InputText
          type='text'
          placeHolder={leafSample.Mo.placeHolder}
          id={leafSample.Mo.id}
          name={leafSample.Mo.name}
          register={props.register}
        />
      </div>
    </div>
  );
}
