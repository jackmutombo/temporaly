import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import textConstants from '../../util/textConstants';
import SignedInMenu from './SignedInMenu';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import MLink from '@mui/material/Link';

export interface INavBarProps {
  elevation?: number;
  farmName?: string;
  blockName?: string;
  farmId?:any;

}

export default function NavBar(props: INavBarProps) {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='sticky'
        elevation={props.elevation}
        color='transparent'
      >
        <div className='d-flex justify-content-between m-1'>
          <Row className='w-75'>
            <Col xs={2}>
              <Link to={textConstants.routes.farm}>
                <img
                  alt='logo'
                  src='/assets/img/logo_sm.svg'
                ></img>
              </Link>
            </Col>
            <Col
              xs={4}
              className='d-flex align-items-center'
            >
              {props.farmName || props.blockName ? (
                <div>
                  {
                    !props.blockName &&
                    <Stack spacing={2}>
                    <Breadcrumbs
                      separator={<NavigateNextIcon fontSize="small" />}
                      aria-label="breadcrumb"
                    >
                      <Link  key="1" color="inherit" to="/farm">
                        Farms
                      </Link>,

                      <Typography key="3" color="text.primary">
                        {props.farmName}
                      </Typography>,
                    </Breadcrumbs>
                  </Stack>

                  }
                  

                  {props.farmName && props.blockName ? (

                    <Stack spacing={2}>

                      <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb"
                      >
                        <Link  key="1" color="inherit" to="/farm">
                        Farms
                      </Link>
                      <Link  key="1" color="inherit" to={`/farm/${props.farmId}`}>
                        {props.farmName}
                        </Link>

                        <Typography key="3" color="text.primary">
                          {props.blockName}
                        </Typography>
                      </Breadcrumbs>
                    </Stack>

                  ) : null}

                </div>
              ) : null}


            </Col>
          </Row>

          <div>
            <SignedInMenu />
          </div>
        </div>
      </AppBar>
    </Box>
  );
}
