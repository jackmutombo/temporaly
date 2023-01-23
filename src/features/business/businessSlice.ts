import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import agent from '../../api/agent';
import { Business, BusinessParams } from '../../models/business';
import { MetaData } from '../../models/pagination';
import { RootState } from '../../store/configureStore';
import { logDebug, logErrors } from '../../util/general';

interface BusinessState {
  businessLoaded: boolean;
  allBusinessesLoaded: boolean;
  status: string;
  statusforAllBusinesses: string;
  businessParams: BusinessParams;
  metaData: MetaData;
  allBusinesses: Business[] | [];
  ids: [];
  entities: {};
}

const initialState: BusinessState = {
  businessLoaded: false,
  allBusinessesLoaded: false,
  status: 'idle',
  statusforAllBusinesses: 'idle',
  businessParams: initParams(),
  metaData: initMetaData(),
  allBusinesses: [],
  ids: [],
  entities: {},
};

const businessesAdapter = createEntityAdapter<Business>();

function getAxiosParams(businessParams: BusinessParams) {
  const params = new URLSearchParams();
  params.append('pageNumber', businessParams.pageNumber.toString());
  params.append('pageSize', businessParams.pageSize.toString());
  params.append('sortBy', businessParams.sortBy!);
  if (businessParams.textSearch)
    params.append('search', businessParams.textSearch);
  return params;
}

export const fetchAllBusinessesAsync = createAsyncThunk<
  Business[],
  void,
  { state: RootState }
>(
  'business/fetchAllBusinessesAsync',
  async (_, thunkAPI) => {
    const paramsForAll = new URLSearchParams();
    paramsForAll.append('isPagingEnabled', 'false');
    try {
      const response = await agent.Business.list(paramsForAll);
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

export const fetchBusinessesAsync = createAsyncThunk<
  Business[],
  void,
  { state: RootState }
>(
  'business/fetchBusinessesAsync',
  async (_, thunkAPI) => {
    const params = getAxiosParams(thunkAPI.getState().business.businessParams);
    try {
      const response = await agent.Business.list(params);
      logDebug(response);

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

export const fetchBusinessAsync = createAsyncThunk<Business, string>(
  'business/fetchBusinessAsync',
  async (businessId, thunkAPI) => {
    try {
      return await agent.Business.details(businessId);
    } catch (error: any) {
      logErrors(error);
      return thunkAPI.rejectWithValue({ error: error.data });
    }
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

export const businessSlice = createSlice({
  name: 'business',
  initialState: businessesAdapter.getInitialState<BusinessState>(initialState),
  reducers: {
    setBusinessParams: (state, action) => {
      state.businessLoaded = false;
      state.businessParams = { ...state.businessParams, ...action.payload };
    },
    resetBusinessParams: state => {
      state.businessParams = initParams();
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetBusinessReducer: state => initialState,
  },
  extraReducers: (builder: any) => {
    builder.addCase(fetchAllBusinessesAsync.pending, (state: any) => {
      state.statusforAllBusinesses = 'pendingFetchAllBusinesses';
    });

    builder.addCase(
      fetchAllBusinessesAsync.fulfilled,
      (state: any, action: any) => {
        state.statusforAllBusinesses = 'idle';
        state.allBusinesses = action.payload;
        state.allBusinessesLoaded = true;
      }
    );

    builder.addCase(fetchBusinessesAsync.pending, (state: any) => {
      state.status = 'pendingFetchBusinesses';
    });
    builder.addCase(
      fetchBusinessesAsync.fulfilled,
      (state: any, action: any) => {
        businessesAdapter.setAll(state, action.payload);
        state.status = 'idle';
        state.businessLoaded = true;
      }
    );
    builder.addCase(
      fetchBusinessesAsync.rejected,
      (state: any, action: any) => {
        state.status = 'idle';
      }
    );
    builder.addCase(fetchBusinessAsync.pending, (state: any) => {
      state.status = 'pendingFetchProduct';
    });
    builder.addCase(fetchBusinessAsync.fulfilled, (state: any, action: any) => {
      businessesAdapter.upsertOne(state, action.payload);
      state.status = 'idle';
    });
    builder.addCase(fetchBusinessAsync.rejected, (state: any, action: any) => {
      state.status = 'idle';
      logErrors(action);
    });
  },
});

export const businessSelectors = businessesAdapter.getSelectors(
  (state: RootState) => state.business
);

export const {
  setBusinessParams,
  resetBusinessParams,
  setMetaData,
  resetBusinessReducer,
} = businessSlice.actions;
