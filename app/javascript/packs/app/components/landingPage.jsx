import React from 'react';
import TweetForm from './tweetForm';
import { TwitterTimelineEmbed, TwitterTweetEmbed } from 'react-twitter-embed';

class LandingPage extends React.Component {
  componentDidMount () {
    window.addEventListener('resize', this.calculateContainerHeight());
  }

  calculateContainerHeight () {
    const timelineContainerHeight = window.innerHeight - document.getElementById('form-container').clientHeight - 40
    document.getElementById('timeline-container').style.height = `${timelineContainerHeight}px`
  }

  render() {
    return(
      <div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col col-lg-6 offset-lg-3 col-12'>
              <div id='form-container'>
                <TweetForm />
                <br/>
              </div>
              <div id='timeline-container'>
                <TwitterTimelineEmbed
                  sourceType="profile"
                  screenName="phnyDonaldTrump"
                  autoHeight
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default LandingPage;
