import { FETCH_TWEET_OPTIONS } from '../constants/action-types';

export default function(state=[], action) {
  switch (action.type) {
    case FETCH_TWEET_OPTIONS:
      return action.payload;

    default:
      return state;
  }
}
