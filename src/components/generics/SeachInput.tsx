import { debounce } from '@mui/material';
import { useState } from 'react';
import style from '../inputs/InputText.module.css';

export interface ISearchProps {
  name: string;
  id: string | 'searchInput';
  type: 'text';
  extraStyle?: string;
  placeHolder?: string;
  value: string | '';
  onChange: any;
}

export function SeachInput(props: ISearchProps) {
  const [searchTerm, setSearchTerm] = useState(props.value);

  const debouncedSearch = debounce((event: any) => {
    props.onChange(event.target.value);
  }, 1000);

  const classStyle = `form-control form-control-sm  ${style.input_custom_style}  ${props.extraStyle}`;
  return (
    <input
      type={props.type}
      className={classStyle}
      id={props.id}
      name={props.name}
      placeholder={props.placeHolder}
      value={searchTerm}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        debouncedSearch(event);
      }}
    />
  );
}
