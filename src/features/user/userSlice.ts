import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { FieldValues } from 'react-hook-form';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import agent from '../../api/agent';
import { User, UserPasswordReset, UserRefreshToken } from '../../models/user';
import { logDebug, logErrors, logInfo } from '../../util/general';
import { resetBlockReducer } from '../block/blockSlice';
import { resetFarmReducer } from '../farm/farmSlice';
import { resetLeafSampleReducer } from '../leaf/leafSampleSlice';
import { resetSoilSampleReducer } from '../soil/soilSampleSlice';

interface UserState {
  user: User | null;
  loginUserStatus: string;
  createUserStatus: string;
  resetPasswordUserStatus: string;
  userRefreshToken: UserRefreshToken | null;
  userResetPassword: UserPasswordReset | null;
}

const initialState: UserState = {
  user: null,
  loginUserStatus: 'idle',
  createUserStatus: 'idle',
  resetPasswordUserStatus: 'idle',
  userRefreshToken: null,
  userResetPassword: null,
};

export const signInUser = createAsyncThunk<User, FieldValues>(
  'user/signInUser',
  async (data, thunkAPI) => {
    try {
      const user = await agent.User.login(data);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      if (!error) {
        throw error;
      }
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const signOutUser = createAsyncThunk<User>(
  'user/signOutUser',
  async (_, thunkAPI) => {
    try {
      const user = await agent.User.logout();
      localStorage.removeItem('user');
      thunkAPI.dispatch(resetUser());
      thunkAPI.dispatch(resetFarmReducer());
      thunkAPI.dispatch(resetBlockReducer());
      thunkAPI.dispatch(resetSoilSampleReducer());
      // thunkAPI.dispatch(resetBusinessReducer());
      thunkAPI.dispatch(resetLeafSampleReducer());
      // thunkAPI.dispatch(resetCropReducer());
      logInfo('signOut');
      return user;
    } catch (error: any) {
      if (!error) {
        throw error;
      }
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

export const fetchRefreshToken = createAsyncThunk<User>(
  'user/signInUserRefreshToken',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
    try {
      const userLocal = localStorage.getItem('user');
      if (userLocal) {
        const userObj: User = JSON.parse(userLocal);
        const refreshToken = userObj.refreshToken; // get refresh token
        const refreshRep: UserRefreshToken = await agent.User.refreshToken({
          refreshToken,
        });
        userObj.idToken = refreshRep.idToken;
        localStorage.setItem('user', JSON.stringify(userObj));
        logDebug(userObj, 'refresh token set');
        const userReturn: any = userObj;
        return userReturn;
      }
    } catch (error: any) {
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

export const fetchCurrentUser = createAsyncThunk<User>(
  'account/fetchCurrentUser',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
    try {
      const user = await agent.User.currentUser();
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      redirect('/');
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem('user')) return false;
    },
  }
);

export const forgetPassword = createAsyncThunk<UserPasswordReset, FieldValues>(
  'user/passwordReset',
  async (data, thunkAPI) => {
    try {
      return await agent.User.forgetPassword(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOut: state => {
      // logInfo('Removing user from reducer');
      state.user = null;
      state.userRefreshToken = null;
      // logInfo('Removing user from localStorage');
      localStorage.removeItem('user');
      resetUser();
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: state => initialState,
  },
  extraReducers: builder => {
    builder.addCase(fetchRefreshToken.fulfilled, (state, action) => {
      if (state.user?.idToken) {
        state.user.idToken = action.payload.idToken;
      }
    });
    builder.addCase(fetchRefreshToken.rejected, state => {
      state.user = null;
      localStorage.removeItem('user');
      toast.error('Session expired - please login again');
    });
    builder.addCase(fetchCurrentUser.rejected, state => {
      state.user = null;
      localStorage.removeItem('user');
      toast.error('Session expired - please login again');
    });

    builder.addCase(forgetPassword.fulfilled, (state, action) => {
      const log = 'Reset password successful';
      logInfo(log);
      logDebug(log, action.payload);
      state.userResetPassword = action.payload;
      state.resetPasswordUserStatus = 'idle';
    });
    builder.addCase(forgetPassword.pending, (state, action) => {
      state.resetPasswordUserStatus = 'pending';
    });

    builder.addCase(forgetPassword.rejected, (state, action) => {
      logErrors(action.payload);
      state.resetPasswordUserStatus = 'idle';
    });

    builder.addMatcher(isAnyOf(signInUser.fulfilled), (state, action) => {
      // const log = 'SignIn successful';
      // toast.success('Login Successful');
      // logInfo(log);
      // logDebug(log, action.payload);
      state.user = action.payload;
    });
    // builder.addMatcher(isAnyOf(signInUser.fulfilled),(state, action) => {
    //     state.userRefreshToken = action.payload;
    //     state.user?.idToken = action.payload.idToken;
    // })
    builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
      const log = 'SignIn failed';
      logErrors(log, action.payload);
    });
  },
});

export const { signOut, setUser, resetUser } = userSlice.actions;
