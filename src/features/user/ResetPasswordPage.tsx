import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import { FlexContentCenter } from '../../components/generics/FlexContentCenter';
import { FlexContentEnd } from '../../components/generics/FlexContentEnd';
import { InputText } from '../../components/inputs/InputText';
import { useForm } from 'react-hook-form';
import textConstants from '../../util/textConstants';

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { register } = useForm();
  return (
    <FlexContentEnd extraStyle='mx-auto p-5 backgroung_image'>
      <Card
        sx={{
          maxWidth: textConstants.cardSize.maxWidth,
          maxHeight: textConstants.cardSize.maxHeight,
        }}
      >
        <form>
          <CardContent>
            <FlexContentCenter>
              <img
                alt='logo'
                src={textConstants.images.logo}
              />
            </FlexContentCenter>
            <FlexContentCenter extraStyle='mt-4'>
              <h4>{textConstants.genericsText.resetTitle}</h4>
            </FlexContentCenter>

            <div className='text-center mt-3'>
              <span> {textConstants.genericsText.resetSubTitle}</span>
            </div>
            <div className='mt-5'>
              <div className='form-group'>
                <label htmlFor='n_password'>
                  {textConstants.genericsText.input.newPassword.label}
                </label>
                <InputText
                  type='password'
                  id={textConstants.genericsText.input.newPassword.id}
                  placeHolder={
                    textConstants.genericsText.input.newPassword.placeholder
                  }
                  register={register}
                  name={textConstants.genericsText.input.newPassword.name}
                />
              </div>

              <div className='form-group mt-2'>
                <label htmlFor='c_password'>
                  {textConstants.genericsText.input.confirmPassword.label}
                </label>
                <InputText
                  type='password'
                  id={textConstants.genericsText.input.confirmPassword.id}
                  placeHolder={
                    textConstants.genericsText.input.confirmPassword.placeholder
                  }
                  name={textConstants.genericsText.input.confirmPassword.name}
                  register={register}
                />
              </div>
            </div>
            <button
              type='button'
              className='btn btn-form form-control btn-sm mt-4'
            >
              {textConstants.genericsText.button.reset}
            </button>

            <button
              onClick={() => navigate('/')}
              type='button'
              className='btn btn-border form-control btn-sm mt-4'
            >
              {textConstants.genericsText.button.backLogin}
            </button>
          </CardContent>
        </form>
      </Card>
    </FlexContentEnd>
  );
}

export default ResetPasswordPage;
