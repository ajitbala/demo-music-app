import { configureStore } from '@reduxjs/toolkit';
import albumReducer from '../reducers/albumSlice';
import logger from 'redux-logger'

export default configureStore({
  reducer: {
    albumReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})