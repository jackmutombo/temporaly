import systemConstants from './systemConstants';
export const logInfo = (arg: string) => {
  // ensuring logging is on
  if (process.env.REACT_APP_LOG_INFO_ACTIVE === 'true') {
    // show the logs in the browser console
    console.log(arg, '*INFO');
  }
};

export const logErrors = (...args: any) => {
  // ensuring logging is on
  if (process.env.REACT_APP_LOG_ERROR_ACTIVE === 'true') {
    // show the logs in the browser console
    console.log(...args, '*ERRORS');
  }
};

export const logDebug = (...args: any) => {
  // ensuring logging is on
  if (process.env.REACT_APP_LOG_DEBUG_ACTIVE === 'true' && isInDevMode()) {
    // show the logs in the browser console
    const key = 'password';
    let hasPassword = false;
    let indexPassword = 0;
    args.forEach((element: any, index: any) => {
      if (checkIfKeyExist(element, key)) {
        hasPassword = true;
        indexPassword = index;
        return;
      }
    });
    if (hasPassword) {
      const clone = JSON.parse(JSON.stringify(args));
      clone[indexPassword].password = '************';
      console.log(clone, '*DEBUG');
    } else {
      console.log(...args, '*DEBUG');
      return;
    }
  }
};

export const isInDevMode = () => {
  return process.env.NODE_ENV === 'development'; // TODO use textConstant for this veriable
};

const checkIfKeyExist = (objectName: any, keyName: string) => {
  const keyExist = Object.keys(objectName).some(key => key === keyName);
  return keyExist;
};

export const sanitizeErrorPayload = (
  response: any,
  firstSearchTerm = '{',
  lastSearchTerm = '}'
) => {
  const indexOfFirst = response.indexOf(firstSearchTerm);
  const indexOfLast = response.lastIndexOf(lastSearchTerm) + 1;
  return JSON.parse(response.slice(indexOfFirst, indexOfLast));
};

export function getCookie(key: string) {
  const b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

export function formatDateTime(date: Date) {
  return new Date(date)?.toISOString()?.split('T')[0] ?? '-';
}
export const second = 1000;
export const minute = second * 60;

const eventTypes = [
  'keypress',
  'mousemove',
  'mousedown',
  'scroll',
  'touchmove',
  'pointermove',
];
export const addEventListeners = (listener: any) => {
  eventTypes.forEach(type => {
    window.addEventListener(type, listener, false);
  });
};
export const removeEventListeners = (listener: any) => {
  if (listener) {
    eventTypes.forEach(type => {
      window.removeEventListener(type, listener, false);
    });
  }
};

export const soilSampleHeader: any = {
  'Farming Business': ['business', 16],
  Farm: ['farm', 18],
  'Block / Field Name': ['block', 18],
  'Lab. No.': ['labNo', 15],
  'Depth (cm) Top': ['depthTop', 8],
  'Depth (cm) Bottom': ['depthBottom', 8],
  Texture: ['texture', 11],
  'pH (KCl)': ['ph', 9],
  'Resistance (ohm)': ['resistance', 10],
  'Na (cmol/kg)': ['na', 10],
  'P (mg/kg)': ['p', 8],
  'K (cmol/kg)': ['k', 10],
  'H (cmol/kg)': ['h', 10],
  'Ca (cmol/kg)': ['ca', 10],
  'Mg (cmol/kg)': ['mg', 10],
  'Cu (mg/kg)': ['cu', 10],
  'Zn (mg/kg)': ['zn', 10],
  'Mn (mg/kg)': ['mn', 10],
  'B (mg/kg)': ['b', 10],
  'Fe (mg/kg)': ['fe', 10],
  'S (mg/kg)': ['s', 10],
  'Cl (mg/kg)': ['cl', 8],
  'C (%)': ['c', 10],
  'N (%)': ['n', 10],
  'Stone (%)': ['stone', 10],
  'Clay (%)': ['clay', 10],
};

export const leafSampleHeader: any = {
  'Farming Business': ['business', 16],
  Farm: ['farm', 18],
  'Block / Field Name': ['block', 18],
  'Lab. No.': ['labNo', 15],
  Crop: ['crop', 12],
  'Sub Crop': ['subCrop', 12],
  Cultivar: ['cultivar', 12],
  'N (%)': ['n', 10],
  'P (%)': ['p', 8],
  'K (%)': ['k', 10],
  'Ca (%)': ['ca', 10],
  'Mg (%)': ['mg', 10],
  'Na (mg/kg)': ['na', 10],
  'Mn (mg/kg)': ['mn', 10],
  'Fe (mg/kg)': ['fe', 10],
  'Cu (mg/kg)': ['cu', 10],
  'Zn (mg/kg)': ['zn', 10],
  'B (mg/kg)': ['b', 10],
  'Mo (mg/kg)': ['mo', 10],
  'S (%)': ['s', 10],
  'Cl (%)': ['cl', 8],
};

export const getSampleArray: any = (sampleName: string) => {
  const { SoilSample, LeafSample } = systemConstants;
  switch (sampleName) {
    case SoilSample:
      return {
        header: Object.entries(soilSampleHeader),
        raw: soilSampleHeader,
      };
    case LeafSample:
      return {
        header: Object.entries(leafSampleHeader),
        raw: leafSampleHeader,
      };
    default:
      return {
        header: Object.entries(soilSampleHeader),
        raw: soilSampleHeader,
      };
  }
};

export const soilSampleHeaderArray = Object.entries(soilSampleHeader);

export const formalizeExcelSampleData = (sample: any, sheetName: string) => {
  const data = sample.data;
  const headers = data[1];
  const samples = [];
  const sampleHeader = getSampleArray(sheetName).raw;
  for (let i = 2; i < data.length; i++) {
    let obj: any = {};
    const innerData = data[i];
    for (let d = 1; d < innerData.length; d++) {
      const column = sampleHeader[headers[d]][0];
      obj[column] = innerData[d];
    }
    samples.push(obj);
  }
  return samples;
};
