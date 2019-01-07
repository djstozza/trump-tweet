import { ADD_TWEET, FETCH_TWEETS, SHOW_TWEET_ERRORS } from '../constants/action-types';

export default function(state=[], action) {
  switch (action.type) {
    case ADD_TWEET:
      return action.payload;
    case FETCH_TWEETS:
      return action.payload;
    case SHOW_TWEET_ERRORS:
      return action.payload;

    default:
      return state;
  }
}
