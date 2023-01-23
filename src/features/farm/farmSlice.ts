import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import agent from '../../api/agent';
import { Farm, FarmParams } from '../../models/farm';
import { MetaData } from '../../models/pagination';
import { RootState } from '../../store/configureStore';
import { logErrors } from '../../util/general';

interface FarmState {
  farmLoaded: boolean;
  allFarmsLoaded: boolean;
  status: string;
  statusAllFarms: string;
  farmParams: FarmParams;
  metaData: MetaData;
  allFarms: Farm[] | [];
  ids: [];
  entities: {};
}

const initialState: FarmState = {
  farmLoaded: false,
  allFarmsLoaded: false,
  status: 'idle',
  statusAllFarms: 'idle',
  farmParams: initParams(),
  metaData: initMetaData(),
  allFarms: [],
  ids: [],
  entities: {},
};

const farmsAdapter = createEntityAdapter<Farm>();

function getAxiosParams(farmParams: FarmParams) {
  const params = new URLSearchParams();
  params.append('pageNumber', farmParams.pageNumber.toString());
  params.append('pageSize', farmParams.pageSize.toString());
  params.append('sortBy', farmParams.sortBy!);
  if (farmParams.textSearch) params.append('search', farmParams.textSearch);
  return params;
}

export const fetchAllFarmsAsync = createAsyncThunk<
  Farm[],
  void,
  { state: RootState }
>(
  'farm/fetchAllFarmsAsync',
  async (_, thunkAPI) => {
    const paramsForAll = new URLSearchParams();
    paramsForAll.append('isPagingEnabled', 'false');
    try {
      const response = await agent.Farm.list(paramsForAll);
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

export const fetchFarmsAsync = createAsyncThunk<
  Farm[],
  void,
  { state: RootState }
>(
  'farm/fetchFarmsAsync',
  async (_, thunkAPI) => {
    const params = getAxiosParams(thunkAPI.getState().farm.farmParams);
    try {
      const response = await agent.Farm.list(params);
      // logDebug(response);

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

export const fetchFarmAsync = createAsyncThunk<Farm, string>(
  'farm/fetchFarmAsync',
  async (farmId, thunkAPI) => {
    try {
      return await agent.Farm.details(farmId);
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

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 8, // TODO use textConstant
    sortBy: 'name',
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

export const farmSlice = createSlice({
  name: 'farm',
  initialState: farmsAdapter.getInitialState<FarmState>(initialState),
  reducers: {
    setFarmParams: (state, action) => {
      state.farmLoaded = false;
      state.farmParams = { ...state.farmParams, ...action.payload };
    },
    resetFarmParams: state => {
      state.farmParams = initParams();
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetFarmReducer: state => initialState,
  },
  extraReducers: (builder: any) => {
    builder.addCase(fetchAllFarmsAsync.pending, (state: any) => {
      state.statusForAllFarms = 'pendingFetchAllFarms';
    });

    builder.addCase(fetchAllFarmsAsync.fulfilled, (state: any, action: any) => {
      state.statusForAllFarms = 'idle';
      state.allFarms = action.payload;
      state.allFarmsLoaded = true;
    });

    builder.addCase(fetchFarmsAsync.pending, (state: any) => {
      state.status = 'pendingFetchFarms';
    });
    builder.addCase(fetchFarmsAsync.fulfilled, (state: any, action: any) => {
      farmsAdapter.setAll(state, action.payload);
      state.status = 'idle';
      state.farmLoaded = true;
    });
    builder.addCase(fetchFarmsAsync.rejected, (state: any, action: any) => {
      state.status = 'idle';
      logErrors(action);
    });
    builder.addCase(fetchFarmAsync.pending, (state: any) => {
      state.status = 'pendingFetchFarm';
    });
    builder.addCase(fetchFarmAsync.fulfilled, (state: any, action: any) => {
      farmsAdapter.upsertOne(state, action.payload);
      state.status = 'idle';
    });
    builder.addCase(fetchFarmAsync.rejected, (state: any, action: any) => {
      state.status = 'idle';
      logErrors(action);
    });
  },
});

export const farmSelectors = farmsAdapter.getSelectors(
  (state: RootState) => state.farm
);

export const { setFarmParams, resetFarmParams, setMetaData, resetFarmReducer } =
  farmSlice.actions;
