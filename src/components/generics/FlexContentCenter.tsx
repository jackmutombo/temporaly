export interface IFlexContentCenterProps {
  children:
    | string
    | number
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | null
    | undefined;
  extraStyle?: string;
}

export function FlexContentCenter(props: IFlexContentCenterProps) {
  const style = `d-flex justify-content-center ${props.extraStyle}`;
  return <div className={style}>{props.children}</div>;
}
