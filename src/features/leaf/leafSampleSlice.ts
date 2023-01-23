import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import agent from '../../api/agent';
import { LeafSample, LeafSampleParams } from '../../models/leafSample';
import { MetaData } from '../../models/pagination';
import { RootState } from '../../store/configureStore';
import { logErrors } from '../../util/general';

interface LeafSampleState {
  leafSampleLoaded: boolean;
  blockId: string | null;
  currentLeafSample: string | null;
  status: string;
  leafSampleParams: LeafSampleParams;
  metaData: MetaData | null;
  ids: [];
  entities: {};
}

const initialState: LeafSampleState = {
  leafSampleLoaded: false,
  blockId: null,
  currentLeafSample: null,
  status: 'idle',
  leafSampleParams: initParams(),
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

const leafSamplesAdapter = createEntityAdapter<LeafSample>();

function getAxiosParams(blockId: string, leafSampleParams: LeafSampleParams) {
  const params = new URLSearchParams();
  params.append('farmBlockId', blockId);
  params.append('pageNumber', leafSampleParams.pageNumber.toString());
  params.append('pageSize', leafSampleParams.pageSize.toString());
  params.append('sortBy', leafSampleParams.sortBy);
  if (leafSampleParams.cropId)
    params.append('blockCropId', leafSampleParams.cropId);
  if (leafSampleParams.textSearch)
    params.append('search', leafSampleParams.textSearch);
  return params;
}

export const fetchLeafSamplesAsync = createAsyncThunk<
  LeafSample[],
  string,
  { state: RootState }
>(
  'leafSample/fetchLeafSamplesAsync',
  async (blockId, thunkAPI) => {
    const params = getAxiosParams(
      blockId,
      thunkAPI.getState().leafSample.leafSampleParams
    );
    try {
      const response = await agent.LeafSample.list(params);
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

export const leafSampleSlice = createSlice({
  name: 'leafSample',
  initialState:
    leafSamplesAdapter.getInitialState<LeafSampleState>(initialState),
  reducers: {
    setBlockId: (state, action) => {
      state.blockId = action.payload;
    },
    setCurrentLeafSampleId: (state, action) => {
      state.currentLeafSample = action.payload;
    },
    setLeafSampleParams: (state, action) => {
      state.leafSampleLoaded = false;
      state.leafSampleParams = { ...state.leafSampleParams, ...action.payload };
    },
    resetLeafSampleParams: state => {
      state.leafSampleParams = initParams();
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetLeafSampleReducer: state => initialState,
  },
  extraReducers: builder => {
    builder.addCase(fetchLeafSamplesAsync.pending, state => {
      state.status = 'pendingFetchLeafSamples';
    });
    builder.addCase(fetchLeafSamplesAsync.fulfilled, (state, action) => {
      leafSamplesAdapter.setAll(state, action.payload);
      state.status = 'idle';
      state.leafSampleLoaded = true;
    });
    builder.addCase(
      fetchLeafSamplesAsync.rejected,
      (state: any, action: any) => {
        state.status = 'idle';
        logErrors(action);
      }
    );
  },
});

export const leafSampleSelectors = leafSamplesAdapter.getSelectors(
  (state: RootState) => state.leafSample
);

export const {
  setLeafSampleParams,
  resetLeafSampleParams,
  setMetaData,
  setBlockId,
  setCurrentLeafSampleId,
  resetLeafSampleReducer,
} = leafSampleSlice.actions;
