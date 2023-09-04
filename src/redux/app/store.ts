import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit"
import { postApi } from "../api/postApi"
import postReducer from "../features/postSlice"
import storage from "redux-persist/lib/storage"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist"

const persistConfig = {
  key: "root",
  storage: storage,
  blackList: "postApi",
}

export const rootReducers = combineReducers({
  [postApi.reducerPath]: postApi.reducer,
  postState: postReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducers)
export const store = configureStore({
  reducer: persistedReducer,

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([postApi.middleware]),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
