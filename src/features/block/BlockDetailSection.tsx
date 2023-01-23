import { Row, Col } from 'react-bootstrap';
import { RowKeyValue } from '../../components/generics/RowKeyValue';
import { Header } from '../../components/header/Header';
import NavBar from '../../components/navBar/NavBar';
import { Block } from '../../models/block';
import { CropEntryModal } from '../crop/modal/CropEntryModal';
import { LeafSampleModal } from '../leaf/modal/LeafSampleModal';
import { SoilSampleModal } from '../soil/modal/SoilSampleModal';
import { BlockModal } from './modal/BlockModal';
import { formatDateTime } from '../../util/general';
import { Farm } from '../../models/farm';

type Props = {
  block: Block | undefined;
  farm?: Block | undefined;
  show: boolean;
  setShow: any;
  modal: string;
};
export default function BlockDetailSection({ block,farm, show, setShow, modal }: Props) {
    const handleClose = () => setShow(false);
  return (
    <>
      <NavBar
        elevation={2}
        farmName={block?.farmName}
        blockName={block?.name}
        farmId={block?.farmId}
      />
      {modal === 'crop' ? ( // TODO use textConstant
        <CropEntryModal
          status={show}
          onClose={handleClose}
        />
      ) : modal === 'leaf' ? ( // TODO use textConstant
        <LeafSampleModal
          status={show}
          onClose={handleClose}
        />
      ) : modal === 'soil' ? ( // TODO use textConstant
        <SoilSampleModal
          status={show}
          onClose={handleClose}
        />
      ) : modal === 'block' ? ( // TODO use textConstant
        <BlockModal
          status={show}
          onClose={handleClose}
        />
      ) : null}
      <div className='p-3'>
        <Header
          extraStyle='p-2'
          title='Block' // TODO use textConstant
        >
          <Row>
            <Col xs={6}>
              <RowKeyValue
                size={2}
                title='Block Name' // TODO use textConstant
                value={block?.name}
              />
              <RowKeyValue
                size={2}
                title='Current Crop' // TODO use textConstant
                value={block?.name} // TODO find out what is current crop
              />
              <RowKeyValue
                size={2}
                title='Plant Date' // TODO use textConstant
                value={block?.plantDate ? formatDateTime(block.plantDate): '-'}
              />
              <RowKeyValue
                size={2}
                title='Harvest Date' // TODO use textConstant
                value={block?.harvestDate ? formatDateTime(block.harvestDate): '-'}
              />
              <RowKeyValue
                size={2}
                title='Target Yield' // TODO use textConstant
                value={block?.targetYield}
              />
            </Col>
            <Col xs={6}>
              <RowKeyValue
                size={2}
                title='Block Size'// TODO use textConstant
                value={block?.blockSize}
              />
              <RowKeyValue
                size={2}
                title= 'Created By' // TODO use textConstant
                value={block?.createdBy}
              />
              <RowKeyValue
                size={2}
                title='Created Date' // TODO use textConstant
                value={block?.createdDate && formatDateTime(block?.createdDate)}
              />
              <RowKeyValue
                size={2}
                title='Last Edited By' // TODO use textConstant
                value={block?.lastEditedBy}
              />
              <RowKeyValue
                size={2}
                title='Last Edited Date'// TODO use textConstant
                value={block?.lastEditedDate && formatDateTime(block?.lastEditedDate)}
              />
            </Col>
          </Row>
        </Header>
      </div>
    </>
  );
}
