import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stack from '@mui/material/Stack';
import { Col, Row } from 'react-bootstrap';

export interface step {
  key: string;
  component: any;
  submitButtonTitle?: string;
  submitAction?: any;
}

export interface IWizardProps extends StepsListProps {
  submitButtonTitle: string;
  submitAction: any;
}
export interface StepsListProps {
  steps: step[];
}

export function CustomWizard({ steps }: StepsListProps) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Stack
      sx={{ width: '100%' }}
      className='mt-4'
      spacing={4}
    >
      <Stepper
        connector={null}
        activeStep={activeStep}
        className='justify-content-center'
        sx={{
          '& .MuiStepLabel-root .Mui-completed': {
            color: '#4DA02B', // circle color (COMPLETED)
          },

          '.MuiSvgIcon-root:not(.Mui-completed)': {
            color: 'white',
            border: '1px solid #4DA02B',
            borderRadius: '50%',
          },
          '.MuiStepIcon-text': {
            fill: '#4DA02B',
            fontWeight: 500,
            fontSize: 15,
          },

          '& .MuiStepLabel-root .Mui-active': {
            color: '#4DA02B', // circle color (ACTIVE)
          },

          '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
            fill: '#fff', // circle's number (ACTIVE)
          },

          '.MuiStepLabel-iconContainer': {
            width: 40,
          },
        }}
      >
        {steps.map(({ key, component }) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          return (
            <Step
              key={key}
              {...stepProps}
            >
              <StepLabel {...labelProps}></StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <Row className='justify-content-center'>
          <Col
            className='text-center'
            xs={6}
          >
            <span>done Succefully</span>
            <button
              onClick={handleReset}
              className='btn btn-form mt-5 btn-sm form-control'
            >
              Done
            </button>
          </Col>
        </Row>
      ) : (
        <React.Fragment>
          <div> {steps[activeStep].component}</div>

          <Row className='justify-content-center'>
            <Col xs={6}>
              <button
                onClick={handleNext}
                className='btn btn-form btn-sm form-control'
              >
                {activeStep === steps.length - 1
                  ? steps[activeStep].submitButtonTitle
                  : 'Next'}
              </button>

              {activeStep === 0 ? null : (
                <button
                  onClick={handleBack}
                  className='btn btn-border mt-2 btn-sm form-control'
                >
                  Back
                </button>
              )}
            </Col>
          </Row>
        </React.Fragment>
      )}
    </Stack>
  );
}
