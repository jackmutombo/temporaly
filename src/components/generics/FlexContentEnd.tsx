import * as React from 'react';

export interface IFlexContentEndProps {
  children: React.ReactNode | string;
  extraStyle?: string;
}

export function FlexContentEnd(props: IFlexContentEndProps) {
  const style = `d-flex justify-content-end ${props.extraStyle}`;
  return <div className={style}>{props.children}</div>;
}
