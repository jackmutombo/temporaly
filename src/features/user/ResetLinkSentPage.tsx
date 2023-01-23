import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import { FlexContentCenter } from '../../components/generics/FlexContentCenter';
import { FlexContentEnd } from '../../components/generics/FlexContentEnd';
import textConstants from '../../util/textConstants';

function ResetLinkSentPage() {
  const navigate = useNavigate();
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
              src={textConstants.images.logo}
            />
          </FlexContentCenter>
          <FlexContentCenter extraStyle='mt-4'>
            <h4>{textConstants.genericsText.linkSent}</h4>
          </FlexContentCenter>

          <div className='d-flex justify-content-center text-center  p-4'>
            <span> {textConstants.genericsText.resetNotice}</span>
          </div>

          <button
            onClick={() => navigate('/')}
            type='button'
            className='btn btn-form form-control btn-sm mt-4'
          >
            {textConstants.genericsText.button.backLogin}
          </button>
        </CardContent>
      </Card>
    </FlexContentEnd>
  );
}

export default ResetLinkSentPage;
