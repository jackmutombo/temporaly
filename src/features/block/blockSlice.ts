import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { Block, BlockParams } from '../../models/block';
import { logErrors } from '../../util/general';
import agent from '../../api/agent';
import { RootState } from '../../store/configureStore';
import { MetaData } from '../../models/pagination';

interface BlockState {
  blockLoaded: boolean;
  blockFarmId: string | null;
  currentBlockId: string | null;
  status: string;
  blockParams: BlockParams;
  metaData: MetaData;
  allBlocks: Block[] | [];
  ids: [];
  entities: {};
}

const initialState: BlockState = {
  blockLoaded: false,
  blockFarmId: null,
  currentBlockId: null,
  status: 'idle',
  blockParams: initParams(),
  metaData: initMetaData(),
  allBlocks: [],
  ids: [],
  entities: {},
};

const blocksAdapter = createEntityAdapter<Block>();

function getAxiosParams(farmId: string, blockParams: BlockParams) {
  // logDebug('SetAxios param', blockParams);
  const params = new URLSearchParams();
  params.append('farmId', farmId);
  params.append('pageNumber', blockParams.pageNumber.toString());
  params.append('pageSize', blockParams.pageSize.toString());
  params.append('sortBy', blockParams.sortBy);
  if (blockParams.textSearch) params.append('search', blockParams.textSearch);
  return params;
}

export const fetchAllBlocksAsync = createAsyncThunk<
  Block[],
  void,
  { state: RootState }
>(
  'block/fetchAllBlocksAsync',
  async (farmId, thunkAPI) => {
    const paramsForAll = new URLSearchParams();
    paramsForAll.append('isPagingEnabled', 'false');
    try {
      const response = await agent.Block.list(paramsForAll);
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

export const fetchBlocksAsync = createAsyncThunk<
  Block[],
  string,
  { state: RootState }
>(
  'block/fetchBlocksAsync',
  async (farmId, thunkAPI) => {
    const params = getAxiosParams(
      farmId,
      thunkAPI.getState().block.blockParams
    );
    try {
      const response = await agent.Block.list(params);
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

export const fetchBlockAsync = createAsyncThunk<Block, string>(
  'block/fetchBlockAsync',
  async (blockId, thunkAPI) => {
    try {
      return await agent.Block.details(blockId);
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
    farmId: '',
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

export const blockSlice = createSlice({
  name: 'block',
  initialState: blocksAdapter.getInitialState<BlockState>(initialState),
  reducers: {
    setBlockFarmId: (state, action) => {
      state.blockFarmId = action.payload;
    },
    setCurrentBlockId: (state, action) => {
      state.blockFarmId = action.payload;
    },
    setBlockParams: (state, action) => {
      state.blockLoaded = false;
      state.blockParams = { ...state.blockParams, ...action.payload };
    },
    resetBlockParams: state => {
      state.blockParams = initParams();
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetBlockReducer: state => initialState,
  },
  extraReducers: builder => {
    builder.addCase(fetchAllBlocksAsync.pending, (state: any) => {
      state.statusForAllBlocks = 'pendingFetchAllBlocks';
    });

    builder.addCase(
      fetchAllBlocksAsync.fulfilled,
      (state: any, action: any) => {
        state.statusForAllBlocks = 'idle';
        state.allBlocks = action.payload;
        state.allBlocksLoaded = true;
      }
    );
    builder.addCase(fetchBlocksAsync.pending, state => {
      state.status = 'pendingFetchBlocks';
    });
    builder.addCase(fetchBlocksAsync.fulfilled, (state, action) => {
      blocksAdapter.setAll(state, action.payload);
      state.status = 'idle';
      state.blockLoaded = true;
    });
    builder.addCase(fetchBlocksAsync.rejected, state => {
      state.status = 'idle';
    });

    builder.addCase(fetchBlockAsync.pending, (state: any) => {
      state.status = 'pendingFetchBlock';
    });
    builder.addCase(fetchBlockAsync.fulfilled, (state: any, action: any) => {
      blocksAdapter.upsertOne(state, action.payload);
      state.status = 'idle';
    });
    builder.addCase(fetchBlockAsync.rejected, (state: any, action: any) => {
      state.status = 'idle';
      logErrors(action);
    });
  },
});

export const blockSelectors = blocksAdapter.getSelectors(
  (state: RootState) => state.block
);

export const {
  setBlockParams,
  resetBlockParams,
  setMetaData,
  setBlockFarmId,
  setCurrentBlockId,
  resetBlockReducer,
} = blockSlice.actions;
