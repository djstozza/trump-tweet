import React from 'react';
import TweetForm from './tweetForm';
import { TwitterTimelineEmbed, TwitterTweetEmbed } from 'react-twitter-embed';

class LandingPage extends React.Component {
  render() {
    return(
      <div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col col-md-6 offset-md-3 col-sm-12 col-12'>
              <TweetForm />
              <br/>
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="phnyDonaldTrump"
                autoHeight
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default LandingPage;
