import { createSlice } from '@reduxjs/toolkit';

interface ExcelState {
  importSamples: any;
  finalSamples: any;
  sampleType: string;
  dropZoneModalOpenCloseState: boolean;
  previewSampleModalOpenOrCloseState: boolean;
}

const initialState: ExcelState = {
  importSamples: [],
  finalSamples: [],
  sampleType: '',
  dropZoneModalOpenCloseState: false,
  previewSampleModalOpenOrCloseState: false,
};

export const excelSlice = createSlice({
  name: 'excel',
  initialState,
  reducers: {
    setImportSamples: (state, action) => {
      state.sampleType = action.payload.sheetName;
      state.importSamples = action.payload.data;
      state.finalSamples = action.payload.data;
    },
    togglePreviewModalSample: state => {
      state.previewSampleModalOpenOrCloseState =
        !state.previewSampleModalOpenOrCloseState;
    },
    toggleDropZoneModal: state => {
      state.dropZoneModalOpenCloseState = !state.dropZoneModalOpenCloseState;
    },
    setRowBusinessId: (state, action) => {
      action.payload.labNo.forEach((element: string) => {
        const index = state.finalSamples.findIndex(
          (item: { labNo: string }) => item.labNo === element
        );
        let updated = state.finalSamples.find(
          (item: { labNo: string }) => item.labNo === element
        );
        updated = {
          ...updated,
          businessId: action.payload.businessId,
          farmOptions: action.payload.farmOptions,
          selectedBusinessOpt: action.payload.selectedBusinessOpt,
          selectedFarmOpt: null,
          selectedBlockOpt: null,
        };
        state.finalSamples[index] = updated;
      });
    },

    setRowFarmId: (state, action) => {
      action.payload.labNo.forEach((element: string) => {
        const index = state.finalSamples.findIndex(
          (item: { labNo: string }) => item.labNo === element
        );
        let updated = state.finalSamples.find(
          (item: { labNo: string }) => item.labNo === element
        );
        updated = {
          ...updated,
          farmId: action.payload.farmId,
          blockOpts: action.payload.blockOpts,
          selectedFarmOpt: action.payload.selectedFarmOpt,
          selectedBlockOpt: null,
        };
        state.finalSamples[index] = updated;
      });
    },

    setRowBlockId: (state, action) => {
      action.payload.labNo.forEach((element: string) => {
        const index = state.finalSamples.findIndex(
          (item: { labNo: string }) => item.labNo === element
        );
        let updated = state.finalSamples.find(
          (item: { labNo: string }) => item.labNo === element
        );
        updated = {
          ...updated,
          blockId: action.payload.blockId,
          selectedBlockOpt: action.payload.selectedBlockOpt,
        };
        state.finalSamples[index] = updated;
      });
    },

    resetExcel: state => initialState,
  },
});

export const {
  setImportSamples,
  resetExcel,
  toggleDropZoneModal,
  togglePreviewModalSample,
  setRowBusinessId,
  setRowFarmId,
  setRowBlockId,
} = excelSlice.actions;

export default excelSlice.reducer;
