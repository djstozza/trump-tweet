import { FETCH_TWEET_OPTIONS } from '../../constants/action-types';
import axios from 'axios';

export default function fetchTweetOptions () {
  return dispatch => {
    axios.get(`/api/v1/tweet_options.json`)
      .then(res => {
        dispatch({ type: FETCH_TWEET_OPTIONS , payload: res.data });
      });
  }
}
