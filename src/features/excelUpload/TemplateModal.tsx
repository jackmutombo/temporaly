import { Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import systemConstants from '../../util/systemConstants';

export interface ITemplateModalProps {
  onDownloadClick?: any;
  status: any;
  onClose: any;
}
const { SoilSample, LeafSample } = systemConstants;

export function TemplateModal(props: ITemplateModalProps) {
  return (
    <>
      <Modal
        size='sm'
        show={props.status}
        onHide={() => props.onClose()}
        aria-labelledby='example-modal-sizes-title-sm'
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-modal-sizes-title-sm'>
            Download Excel Spreadsheet Templates for Data Entry
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <div className='col-12'>
              <button
                type='button'
                className='btn btn-form  btn-sm form-control mt-2 mb-2'
                onClick={() => props.onDownloadClick(LeafSample)}
              >
                Download Leaf Sample Spreadsheet Template
              </button>

              <button
                type='button'
                className='btn btn-sec-form  btn-sm form-control mt-2 mb-2'
                onClick={() => props.onDownloadClick(SoilSample)}
              >
                Download Soil Sample Spreadsheet Template
              </button>

              <button
                type='button'
                className='btn btn-form  btn-sm form-control mt-2  mb-5'
                onClick={() => console.log('Not available yet')}
              >
                Download Farm Information Spreadsheet Template
              </button>
            </div>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
