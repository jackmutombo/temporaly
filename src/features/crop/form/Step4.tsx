import { InputText } from '../../../components/inputs/InputText';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { InputSelect } from '../../../components/inputs/InputSelect';
import textConstants from '../../../util/textConstants';

export interface IStep4Props {
  register: UseFormRegister<FieldValues>;
}

const {
  genericsText: {
    input: { cropEntry },
  },
} = textConstants;

export function Step4(props: IStep4Props) {
  return (
    <div>
      <div className='form-group'>
        <label htmlFor={cropEntry.PlantDate.name}>
          {cropEntry.PlantDate.label}
        </label>
        <InputSelect
          id={cropEntry.PlantDate.id}
          autoFocus
          name={cropEntry.PlantDate.name}
          register={props.register}
        />
      </div>
      <div className='form-group mt-3'>
        <label htmlFor={cropEntry.BloomDate.name}>
          {cropEntry.BloomDate.label}
        </label>
        <InputSelect
          id={cropEntry.BloomDate.id}
          name={cropEntry.BloomDate.name}
          register={props.register}
        />
      </div>
      <div className='form-group mt-3'>
        <label htmlFor={cropEntry.HarvestDate.name}>
          {cropEntry.HarvestDate.label}
        </label>
        <InputText
          type='text'
          placeHolder={cropEntry.HarvestDate.placeHolder}
          id={cropEntry.HarvestDate.id}
          autoFocus
          name={cropEntry.HarvestDate.name}
          register={props.register}
        />
      </div>
    </div>
  );
}
