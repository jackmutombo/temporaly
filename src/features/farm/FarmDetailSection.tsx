import { Row, Col } from 'react-bootstrap';
import { RowKeyValue } from '../../components/generics/RowKeyValue';
import { Header } from '../../components/header/Header';
import NavBar from '../../components/navBar/NavBar';
import { Block } from '../../models/block';
import { Farm } from '../../models/farm';
import { blockSelectors } from '../block/blockSlice';
import { BlockModal } from '../block/modal/BlockModal';

type Props = {
  farm: Farm | undefined;
  block?: Block| undefined;
  show: boolean;
  setShow: any;
};

export default function FarmDetailSection({ farm,block, show, setShow ,}: Props) {
  const handleClose = () => setShow(false);
  return (
    <>
      <NavBar
        elevation={2}
        farmName={farm?.name} // TODO verify if this has to be link
        blockName={block?.name}
        
      />
      <BlockModal
        status={show}
        onClose={handleClose}
      />
      <div className='p-3'>
        <Header
          extraStyle='p-2'
          title='Farm' // TODO use textConstant
          withEdit={true}
        >
          <Row>
            <Col xs={6}>
              <RowKeyValue
                size={2}
                title='Farm Name' // TODO use textConstant
                value={farm?.name}
              />
              <RowKeyValue
                size={2}
                title='Location' // TODO use textConstant
                value={farm?.location}
              />
              <RowKeyValue
                size={2}
                title='Nearest Town' // TODO use textConstant
                value={farm?.nearestTown}
              />
              <RowKeyValue
                size={2}
                title='Altitude' // TODO use textConstant
                value={farm?.location} // TODO get altidute using an other call
              />
              <RowKeyValue
                size={2}
                title='Plantable Land' // TODO use textConstant
                value={farm?.plantableLand}
              />
            </Col>
            <Col xs={6}>
              <RowKeyValue
                size={2}
                title='Contact Number' // TODO use textConstant
                value={farm?.contactNumber}
              />
              <RowKeyValue
                size={2}
                title='Farm Email' // TODO use textConstant
                value={farm?.farmEmail}
              />
              <RowKeyValue
                size={2}
                title='Farm Manager' // TODO use textConstant
                value={farm?.farmManager}
              />
              <RowKeyValue
                size={2}
                title='Crop Advisor' // TODO use textConstant
                value={farm?.cropAdvisor}
              />
              <RowKeyValue
                size={2}
                title='Primary Agent' // TODO use textConstant
                value={farm?.primaryAgent}
              />
            </Col>
          </Row>
        </Header>
      </div>
    </>
  );
}
