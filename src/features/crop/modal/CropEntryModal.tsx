import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { CustomWizard } from '../../../components/generics/CustomWizard';
import { Step1 } from '../form/Step1';
import { Step2 } from '../form/Step2';
import { Step3 } from '../form/Step3';
import { Step4 } from '../form/Step4';

export interface ICropEntryProps {
  status: boolean;
  onClose?: any;
}

export function CropEntryModal(props: ICropEntryProps) {
  const [, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const { register } = useForm();

  const steps = [
    { key: 'Step1', component: <Step1 register={register} /> },
    { key: 'Step2', component: <Step2 register={register} /> },
    { key: 'Step3', component: <Step3 register={register} /> },
    {
      key: 'Step4',
      component: <Step4 register={register} />,
      submitButtonTitle: 'Add crop Entry',
    },
  ];
  return (
    <>
      <Modal
        show={props.status}
        onHide={props.onClose}
        centered
      >
        <Modal.Body>
          <Modal.Header
            closeButton
            className='border-0 text-center'
          >
            <Modal.Title className='w-100'>Add Crop Entry</Modal.Title>
          </Modal.Header>

          <CustomWizard steps={steps} />
        </Modal.Body>
      </Modal>
    </>
  );
}
