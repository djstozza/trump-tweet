import { ADD_TWEET, SHOW_TWEET_ERRORS } from '../../constants/action-types';
import axios from 'axios';

const token = document.querySelector("meta[name=csrf-token]").content;

export default function addTweet (params) {
  return dispatch => {
    axios({
      url: `/api/v1/tweets.json`,
      method: 'POST',
      headers: { 'X-CSRF-Token': token },
      data: {
        tweet: { name: params.name },
      },
    }).then(res => {
      dispatch({ type: ADD_TWEET, payload: res.data });
      dispatch({ type: ADD_TWEET, payload: { success: '' } });
    }).catch(error => {
      dispatch({ type: SHOW_TWEET_ERRORS, payload: { error: error.response } });
    });
  }
}
