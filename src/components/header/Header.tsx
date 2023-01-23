import * as React from 'react';
import style from './Header.module.css';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

export interface IHeaderProps {
  extraStyle?: string;
  children?:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment;
  cover?: string;
  title?: string;
  withEdit?: boolean;
}
export function Header(props: IHeaderProps) {
  const classStyle = `${style.header} ${props.extraStyle}`;
  return (
    <div className={classStyle}>
      {props.cover ? (
        <img
          src={props.cover}
          alt='header'
          className={style.header_img}
        />
      ) : (
        <div>
          <Row>
            <Col xs={6}>
              <h4>{props.title} Overview</h4>
            </Col>

            {props.withEdit ? (
              <Col
                xs={6}
                className=' d-flex justify-content-end'
              >
                <Col xs={2}>
                  <button
                    type='button'
                    className='btn btn-form  btn-sm form-control'
                  >
                    Edit Farm
                  </button>
                </Col>
              </Col>
            ) : null}
          </Row>

          {props.children}
        </div>
      )}
    </div>
  );
}
