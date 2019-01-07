import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import TweetsReducer from './tweetsReducer';

const rootReducer = combineReducers({
  TweetsReducer: TweetsReducer,
  router: routerReducer
});

export default rootReducer;
