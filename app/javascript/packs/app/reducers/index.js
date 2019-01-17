import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import TweetsReducer from './tweetsReducer';
import TweetOptionsReducer from './tweetOptionsReducer';

const rootReducer = combineReducers({
  TweetsReducer: TweetsReducer,
  TweetOptionsReducer: TweetOptionsReducer,
  router: routerReducer
});

export default rootReducer;
