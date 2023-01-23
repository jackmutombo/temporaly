import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { CustomLoadingButton } from '../../../components/buttons/LoadingButton';
import { UploadDropZone } from '../../../components/generics/UploadDropZone';
import textConstants from '../../../util/textConstants';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { toggleDropZoneModal } from '../../excelUpload/excelSlice';

export interface IImportSampleProps {
  openSampleModal?: any;
}
const {
  genericsText: {
    input: { farm },
  },
} = textConstants;
export function ImportSampleModal(props: IImportSampleProps) {
  const { dropZoneModalOpenCloseState } = useAppSelector(state => state.excel);
  const [, setOpen] = useState(dropZoneModalOpenCloseState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setOpen(dropZoneModalOpenCloseState);
  }, [dropZoneModalOpenCloseState]);

  const handleCloseModal = () => {
    dispatch(toggleDropZoneModal());
  };

  return (
    <>
      <Modal
        show={dropZoneModalOpenCloseState}
        onHide={handleCloseModal}
        centered
      >
        <Modal.Body>
          <Modal.Header
            closeButton
            className='border-0 text-center'
          >
            <Modal.Title className='w-100'>{farm.ImportTitle}</Modal.Title>
          </Modal.Header>
          <Row className='m-2'>
            <h5>{farm.ImportText}</h5>
          </Row>
          <Row className='m-2'>
            <UploadDropZone
              openSampleModal={props.openSampleModal}
            />
          </Row>

         
        </Modal.Body>
      </Modal>
    </>
  );
}
