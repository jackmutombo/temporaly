import { InputText } from '../../../components/inputs/InputText';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { InputSelect } from '../../../components/inputs/InputSelect';
import textConstants from '../../../util/textConstants';

export interface IStep2Props {
  register: UseFormRegister<FieldValues>;
}

const {
  genericsText: {
    input: { cropEntry },
  },
} = textConstants;

export function Step2(props: IStep2Props) {
  return (
    <div>
      <div className='form-group'>
        <label htmlFor={cropEntry.RootStock.name}>
          {cropEntry.RootStock.label}
        </label>
        <InputText
          type='text'
          placeHolder={cropEntry.RootStock.placeHolder}
          id={cropEntry.RootStock.id}
          autoFocus
          name={cropEntry.RootStock.name}
          register={props.register}
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor={'sub'}>{cropEntry.ExpectedYield.label}</label>
        <InputText
          type='text'
          placeHolder={cropEntry.ExpectedYield.placeHolder}
          id={cropEntry.ExpectedYield.id}
          name={cropEntry.ExpectedYield.name}
          register={props.register}
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor={cropEntry.GrowRate.name}>
          {cropEntry.GrowRate.label}
        </label>
        <InputSelect
          id={cropEntry.GrowRate.id}
          name={cropEntry.GrowRate.name}
          register={props.register}
        />
      </div>
    </div>
  );
}
