import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
} from 'react-hook-form';
import style from './InputText.module.css';

export interface IInputTextProps {
  type: string;
  name: string;
  extraStyle?: string;
  placeHolder: string;
  id: string;
  autoFocus?: any;
  register: UseFormRegister<FieldValues>;
  required?: boolean | string;
  error?: boolean;
  onChangeHandler?: any | undefined;
  errorMessage?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
}

export function InputText(props: IInputTextProps) {
  const classStyle = `form-control form-control ${
    props.error ? style.input_error_style : style.input_custom_style
  }  ${props.extraStyle}`;
  return (
    <>
      <input
        type={props.type}
        className={classStyle}
        autoComplete='off'
        id={props.id}
        placeholder={props.placeHolder}
        autoFocus={props.autoFocus}
        {...props.register(props.name, {
          required: props.required,
          onChange: props.onChangeHandler
            ? e => props.onChangeHandler(e)
            : undefined,
        })}
      />
      {props.error && (
        <span className='text-danger'>{props.errorMessage?.toString()}</span>
      )}
    </>
  );
}
