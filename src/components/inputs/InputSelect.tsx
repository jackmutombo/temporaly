import { FieldValues, UseFormRegister } from 'react-hook-form';
import style from './InputText.module.css';
import Form from 'react-bootstrap/Form';

export interface IInputSelectProps {
  name: string;
  extraStyle?: string;
  id: string;
  autoFocus?: any;
  register: UseFormRegister<FieldValues>;
  optionData?: [];
}

export function InputSelect(props: IInputSelectProps) {
  const classStyle = `form-control form-control ${style.input_custom_style}  ${props.extraStyle}`;
  return (
    <Form.Select
      className={classStyle}
      id={props.id}
      autoFocus={props.autoFocus}
      {...props.register(props.name)}
    >
      <option>Open this select menu</option>
      <option value='1'>One</option>
      <option value='2'>Two</option>
      <option value='3'>Three</option>
    </Form.Select>
  );
}
