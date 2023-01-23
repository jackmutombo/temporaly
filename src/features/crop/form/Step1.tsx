import { FieldValues, UseFormRegister } from 'react-hook-form';
import { InputSelect } from '../../../components/inputs/InputSelect';
import textConstants from '../../../util/textConstants';

export interface IStep1Props {
  register: UseFormRegister<FieldValues>;
}

const {
  genericsText: {
    input: { cropEntry },
  },
} = textConstants;

export function Step1(props: IStep1Props) {
  return (
    <div>
      <div className='form-group'>
        <label htmlFor={cropEntry.cropName.name}>
          {cropEntry.cropName.label}
        </label>
        <InputSelect
          id={cropEntry.cropName.id}
          autoFocus
          name={cropEntry.cropName.name}
          register={props.register}
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor={cropEntry.subCrop.name}>
          {cropEntry.subCrop.label}
        </label>
        <InputSelect
          id={cropEntry.subCrop.id}
          name={cropEntry.subCrop.name}
          register={props.register}
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor={cropEntry.cultivar.name}>
          {cropEntry.cultivar.label}
        </label>
        <InputSelect
          id={cropEntry.cultivar.id}
          name={cropEntry.cultivar.name}
          register={props.register}
        />
      </div>
    </div>
  );
}
