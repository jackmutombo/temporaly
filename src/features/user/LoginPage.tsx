import { FieldValues, useForm } from 'react-hook-form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FlexContentCenter } from '../../components/generics/FlexContentCenter';
import { FlexContentEnd } from '../../components/generics/FlexContentEnd';
import { InputText } from '../../components/inputs/InputText';
import textConstants from '../../util/textConstants';
import { logErrors, logInfo } from '../../util/general';
import { useAppDispatch } from '../../store/configureStore';
import { signInUser } from './userSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidation } from './Formvalidation/Validation';
import { CustomLoadingButton } from '../../components/buttons/LoadingButton';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(loginValidation),
  });

  const {
    images: { logo },
    cardSize,
    validationMessage: { emailRequired, passwordRequired },
    genericsText: {
      input: { email, password },
      forgotPass,
      terms,
      button,
      registerLink,
      loginTitle,
    },
    routes,
  } = textConstants;

  async function submitForm(data: FieldValues) {
    const log = 'Submit logging details';
    logInfo(log);
    // logDebug(log, data);
    try {
      const response = await dispatch(signInUser(data));
      // logDebug('login response', response);
      if (response.type.includes('fulfilled')) {
        navigate(location?.state?.from?.pathname || routes.farm);
      }
    } catch (error) {
      logErrors(error);
    }
  }

  return (
    <FlexContentEnd extraStyle='mx-auto p-5 backgroung_image'>
      <Card
        sx={{
          maxWidth: cardSize.maxWidth,
          maxHeight: cardSize.maxHeight,
        }}
      >
        <form
          autoComplete='off'
          onSubmit={handleSubmit(submitForm)}
        >
          <CardContent>
            <FlexContentCenter>
              <img
                alt='logo'
                src={logo}
              />
            </FlexContentCenter>
            <FlexContentCenter extraStyle='mt-4'>
              <h4>{loginTitle}</h4>
            </FlexContentCenter>

            <div className='mt-5'>
              <div className='form-group'>
                <label htmlFor={email.name}>{email.label}</label>
                <InputText
                  type='email'
                  id={email.id}
                  placeHolder={email.placeholder}
                  autoFocus
                  name={email.name}
                  register={register}
                  required={emailRequired}
                  error={!!errors.email}
                  errorMessage={errors?.email?.message}
                />
              </div>
              <div className='form-group mt-2'>
                <label htmlFor='password'>{password.label}</label>
                <InputText
                  type='password'
                  name={password.name}
                  id={password.id}
                  placeHolder={password.placeholder}
                  register={register}
                  required={passwordRequired} //use textConstant
                  error={!!errors.password}
                  errorMessage={errors?.password?.message}
                />
              </div>
            </div>
            <FlexContentEnd extraStyle='mt-3'>
              <Link to={routes.forgotPassword}>{forgotPass}</Link>
            </FlexContentEnd>

            <Row className=' text-center mt-5'>
              <Col>
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
              {button.login}
            </CustomLoadingButton>
            <Row className='justify-content-center mt-4 mb-5'>
              <Col className='text-center'>
                <span> {registerLink.start}</span>{' '}
                <span>
                  <Link to={routes.register}>{registerLink.end}</Link>
                </span>
              </Col>
            </Row>
          </CardContent>
        </form>
      </Card>
    </FlexContentEnd>
  );
}

export default LoginPage;
