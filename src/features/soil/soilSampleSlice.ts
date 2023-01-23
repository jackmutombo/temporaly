import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import agent from '../../api/agent';
import { SoilSample, SoilSampleParams } from '../../models/soilSample';
import { RootState } from '../../store/configureStore';
import { logErrors } from '../../util/general';
import { MetaData } from '../../models/pagination';

interface SoilSampleState {
  soilSampleLoaded: boolean;
  blockId: string | null;
  currentSoilSample: string | null;
  status: string;
  soilSampleParams: SoilSampleParams;
  metaData: MetaData | null;
  ids: [];
  entities: {};
}

const initialState: SoilSampleState = {
  soilSampleLoaded: false,
  blockId: null,
  currentSoilSample: null,
  status: 'idle',
  soilSampleParams: initParams(),
  metaData: initMetaData(),
  ids: [],
  entities: {},
};

function initParams() {
  return {
    blockId: '',
    pageNumber: 1,
    pageSize: 8, // TODO use textConstant
    sortBy: 'name',
    textSearch: '',
  };
}

function initMetaData() {
  return {
    currentPage: 1,
    totalPages: 0,
    pageSize: 0,
    totalCount: 0,
  };
}

const soilSamplesAdapter = createEntityAdapter<SoilSample>();

function getAxiosParams(blockId: string, soilSampleParams: SoilSampleParams) {
  const params = new URLSearchParams();
  params.append('farmBlockId', blockId);
  params.append('pageNumber', soilSampleParams.pageNumber.toString());
  params.append('pageSize', soilSampleParams.pageSize.toString());
  params.append('sortBy', soilSampleParams.sortBy);
  if (soilSampleParams.cropId)
    params.append('blockCropId', soilSampleParams.cropId);
  if (soilSampleParams.textSearch)
    params.append('search', soilSampleParams.textSearch);
  return params;
}

export const fetchSoilSamplesAsync = createAsyncThunk<
  SoilSample[],
  string,
  { state: RootState }
>(
  'soilSample/fetchSoilSamplesAsync',
  async (blockId, thunkAPI) => {
    const params = getAxiosParams(
      blockId,
      thunkAPI.getState().soilSample.soilSampleParams
    );
    try {
      const response = await agent.SoilSample.list(params);
      thunkAPI.dispatch(setMetaData(response.metaData));
      return response.items;
    } catch (error: any) {
      logErrors(error);
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    // Check before making call that the user local storage exist.
    condition: () => {
      const user = localStorage.getItem('user');
      if (!user) return false;
    },
  }
);

export const soilSampleSlice = createSlice({
  name: 'soilSample',
  initialState:
    soilSamplesAdapter.getInitialState<SoilSampleState>(initialState),
  reducers: {
    setBlockId: (state, action) => {
      state.blockId = action.payload;
    },
    setCurrentSoilSampleId: (state, action) => {
      state.currentSoilSample = action.payload;
    },
    setSoilSampleParams: (state, action) => {
      state.soilSampleLoaded = false;
      state.soilSampleParams = { ...state.soilSampleParams, ...action.payload };
    },
    resetSoilSampleParams: state => {
      state.soilSampleParams = initParams();
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetSoilSampleReducer: state => initialState,
  },
  extraReducers: builder => {
    builder.addCase(fetchSoilSamplesAsync.pending, state => {
      state.status = 'pendingFetchSoilSamples';
    });
    builder.addCase(fetchSoilSamplesAsync.fulfilled, (state, action) => {
      soilSamplesAdapter.setAll(state, action.payload);
      state.status = 'idle';
      state.soilSampleLoaded = true;
    });
    builder.addCase(
      fetchSoilSamplesAsync.rejected,
      (state: any, action: any) => {
        state.status = 'idle';
        logErrors(action);
      }
    );
  },
});

export const soilSampleSelectors = soilSamplesAdapter.getSelectors(
  (state: RootState) => state.soilSample
);

export const {
  setSoilSampleParams,
  resetSoilSampleParams,
  setMetaData,
  setBlockId,
  setCurrentSoilSampleId,
  resetSoilSampleReducer,
} = soilSampleSlice.actions;
