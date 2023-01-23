import Row from 'react-bootstrap/Row';
import Card from '@mui/material/Card';
import Col from 'react-bootstrap/Col';
import CardContent from '@mui/material/CardContent';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { FlexContentCenter } from '../../components/generics/FlexContentCenter';
import { FlexContentEnd } from '../../components/generics/FlexContentEnd';
import { InputText } from '../../components/inputs/InputText';
import { FieldValues, useForm } from 'react-hook-form';
import textConstants from '../../util/textConstants';
import { logInfo, logDebug } from '../../util/general';
import agent from '../../api/agent';
import { CustomLoadingButton } from '../../components/buttons/LoadingButton';
import { BorderButton } from '../../components/buttons/BorderButton';

function ForgotPasswordPage() {
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .matches(
        /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
        'Not a valid email address'
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'all', resolver: yupResolver(formSchema) });

  async function submitForm(data: FieldValues) {
    const log = 'Submit forgot password details';
    logInfo(log);
    logDebug(log, data);
    agent.User.forgetPassword(data).then(() => {
      logInfo('Submit forgot password completed');
      navigate(routes.resetLinkSent);
    });
  }
  const {
    routes,
    images,
    genericsText: { input, button, resetLinkMessage, forgotTitle },
  } = textConstants;
  return (
    <FlexContentEnd extraStyle='mx-auto p-5 backgroung_image'>
      <Card
        sx={{
          maxWidth: textConstants.cardSize.maxWidth,
          maxHeight: textConstants.cardSize.maxHeight,
        }}
      >
        <CardContent>
          <FlexContentCenter>
            <img
              alt='logo'
              src={images.logo}
            />
          </FlexContentCenter>
          <FlexContentCenter extraStyle='mt-4'>
            <h4>{forgotTitle}</h4>
          </FlexContentCenter>
          <Row className='text-center'>
            <Col className='m-3'>
              <span>{resetLinkMessage}</span>
            </Col>
          </Row>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className='mt-5'>
              <div className='form-group'>
                <label htmlFor={input.email.name}>{input.email.label}</label>
                <InputText
                  type='email'
                  id={input.email.id}
                  placeHolder={input.email.placeholder}
                  register={register}
                  name={input.email.name}
                  error={!!errors.email}
                  errorMessage={errors?.email?.message}
                />
              </div>
            </div>

            <CustomLoadingButton
              loading={isSubmitting}
              contained='contained'
              type='submit'
              extraStyle='mt-4'
            >
              {button.login}
            </CustomLoadingButton>
            <BorderButton
              variant='outlined'
              extraStyle='mt-4'
              onClick={() => navigate(routes.home)}
            >
              {button.back}
            </BorderButton>
          </form>
        </CardContent>
      </Card>
    </FlexContentEnd>
  );
}

export default ForgotPasswordPage;
