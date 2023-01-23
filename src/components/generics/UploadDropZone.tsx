import { useMemo, useCallback } from 'react';
import { Row } from 'react-bootstrap';
import { Workbook } from 'exceljs';
import { useDropzone } from 'react-dropzone';
import { formalizeExcelSampleData } from '../../util/general';
import { useAppDispatch } from '../../store/configureStore';
import {
  setImportSamples,
  toggleDropZoneModal,
  togglePreviewModalSample,
} from '../../features/excelUpload/excelSlice';

// Props interface for the UploadDropZone component
export interface IUploadDropZoneProps {
  openSampleModal?: any;
  dataSamples?: any[];
}

// Default styles for the dropzone
const baseStyle = {
  alignItems: 'center',
  padding: '60px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#AAAAAA',
  borderStyle: 'dashed',
  backgroundColor: '#EFEFEF',
  color: '#000000',
  fontSize: '15px',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

// Style for when the dropzone is focused
const focusedStyle = {
  borderColor: '#4DA02B',
};

// Style for when a file being dragged is rejected
const acceptStyle = {
  borderColor: '#4DA02B',
};

// The UploadDropZone component
const rejectStyle = {
  borderColor: '#ff1744',
};

// Function to read the contents of an Excel file
async function readExcelFile(file: File): Promise<any> {
  // Read the file into a buffer
  const buffer = await file.arrayBuffer();

  // Create a new workbook object
  const workbook = new Workbook();

  // Load the buffer into the workbook
  await workbook.xlsx.load(buffer);

  // Get the first sheet of the workbook
  const sheet = workbook.getWorksheet(1);

  // Convert the sheet to a 2D array
  const data = sheet.getSheetValues();

  const sheetName = sheet.name;

  return { sheetName, data };
}

// The UploadDropZone component
export function UploadDropZone(props: IUploadDropZoneProps) {
  const dispatch = useAppDispatch();

  const onDropAccepted = useCallback(
    (acceptedFiles: any) => {
      acceptedFiles.forEach(async (file: any) => {
        const data = await readExcelFile(file);
        const sanitizeData = {
          data: formalizeExcelSampleData(data, data.sheetName),
          sheetName: data.sheetName,
        };
        dispatch(setImportSamples(sanitizeData));
        props.openSampleModal();
        dispatch(toggleDropZoneModal());
        dispatch(togglePreviewModalSample());
      });
    },
    [props, dispatch]
  );

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDropzone({
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
      'application/vnd.ms-excel': [],
    },
    onDropAccepted,
    multiple: true,
  });
  // Determine the current style for the dropzone based on its focus and the status of files being dragged
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused || isDragActive ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject, isDragActive]
  );

  // Render the dropzone
  return (
    <div className='container'>
      <div
        {...getRootProps({ style })}
        className='justify-content-center text-center'
      >
        <input {...getInputProps()} />
        <img
          src='/assets/img/uoload_vector.svg'
          alt='uploadLogo'
        />
        <Row className='mt-5 justify-content-center'>
          Drag and drop or click to browse
        </Row>
      </div>
    </div>
  );
}
