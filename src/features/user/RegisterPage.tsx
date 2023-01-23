import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FlexContentCenter } from '../../components/generics/FlexContentCenter';
import { FlexContentEnd } from '../../components/generics/FlexContentEnd';
import { InputText } from '../../components/inputs/InputText';
import { FieldValues, useForm } from 'react-hook-form';
import textConstants from '../../util/textConstants';
import agent from '../../api/agent';
import {
  logDebug,
  logErrors,
  logInfo,
  sanitizeErrorPayload,
} from '../../util/general';
import { toast } from 'react-toastify';
// import { signInUser } from './userSlice';
// import { useAppDispatch } from '../../store/configureStore';
import { registerValidation } from './Formvalidation/Validation';
import { CustomLoadingButton } from '../../components/buttons/LoadingButton';

function RegisterPage() {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(registerValidation),
  });

  async function submitForm(data: FieldValues) {
    const log = 'Submit register details';
    delete data.confirmPassword; // remove confirm password from payload.
    logInfo(log);
    logDebug(log, data);
    agent.User.register(data)
      .then(async data => {
        const logs = 'Registration successful';
        logInfo(logs);
        toast.success(toastNoty.registerSuccessful);
        logDebug(logs, data);
        // await dispatch(signInUser(data));
        navigate(routes.home);
      })
      .catch(errors => handleApiErrors(errors));
  }

  function handleApiErrors(error: any) {
    logErrors('Register fail', error);
    const sanitizerPayload = sanitizeErrorPayload(error.data);
    const {
      error: { errors },
    } = sanitizerPayload;
    logErrors('Sanitized errors messages', sanitizerPayload);
    if (errors) {
      errors.forEach((err: any) => {
        if (err.message.toUpperCase().includes('PASSWORD')) {
          setError(password.name, { message: err.message });
        } else if (err.message.toUpperCase().includes('EMAIL')) {
          setError(email.name, { message: err.message });
        }
      });
    }
  }

  const {
    images: { logo },
    cardSize,
    genericsText: {
      input: { email, password, confirmPassword },
      terms,
      button,
      registerTitle,
      AlreadyLink,
      toastNoty,
    },
    routes,
  } = textConstants;
  return (
    <FlexContentEnd extraStyle='mx-auto p-5 backgroung_image'>
      <Card
        sx={{
          maxWidth: cardSize.maxWidth,
          maxHeight: cardSize.maxHeight,
        }}
      >
        <form onSubmit={handleSubmit(submitForm)}>
          <CardContent>
            <FlexContentCenter>
              <img
                alt='logo'
                src={logo}
              />
            </FlexContentCenter>
            <FlexContentCenter extraStyle='mt-4'>
              <h4>{registerTitle}</h4>
            </FlexContentCenter>

            <div className='mt-5'>
              <div className='form-group'>
                <label htmlFor={email.name}>{email.label}</label>
                <InputText
                  type='email'
                  id={email.id}
                  placeHolder={email.placeholder}
                  register={register}
                  error={!!errors.email}
                  errorMessage={errors?.email?.message}
                  name={email.name}
                />
              </div>

              <div className='form-group mt-2'>
                <label htmlFor='password'>{password.label}</label>
                <InputText
                  type='password'
                  id={password.id}
                  placeHolder={password.placeholder}
                  register={register}
                  name={password.name}
                  error={!!errors.password}
                  errorMessage={errors?.password?.message}
                />
              </div>

              <div className='form-group mt-2'>
                <label htmlFor={confirmPassword.name}>
                  {confirmPassword.label}
                </label>
                <InputText
                  type='password'
                  id={confirmPassword.id}
                  placeHolder={confirmPassword.placeholder}
                  register={register}
                  name={confirmPassword.name}
                  error={!!errors.confirmPassword}
                  errorMessage={errors?.confirmPassword?.message}
                />
              </div>
            </div>

            <Row className='text-center mt-5'>
              <Col>
                {/* TODO fix this empty space */}
                <span> {terms.start}</span>{' '}
                <span>
                  <Link to='#'>{terms.end}</Link>
                </span>
              </Col>
            </Row>
            <CustomLoadingButton
              loading={isSubmitting}
              contained='contained'
              type='submit'
              extraStyle='mt-4'
              disabled={!isValid}
            >
              {button.register}
            </CustomLoadingButton>

            <Row className='justify-content-center mt-4 mb-5'>
              <Col className='text-center'>
                <span> {AlreadyLink.start}</span>{' '}
                <span>
                  {' '}
                  <Link to={routes.home}> {AlreadyLink.end}</Link>
                </span>
              </Col>
            </Row>
          </CardContent>
        </form>
      </Card>
    </FlexContentEnd>
  );
}

export default RegisterPage;
