import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchTweetOptions from '../actions/tweetOptions/fetchTweetOptions';
import addTweet from '../actions/tweets/addTweet';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Alert from 'react-s-alert';
import { Formik } from 'formik';

class TweetForm extends Component {
  constructor (props) {
    super(props);

    this.showError = this.showError.bind(this);
  }

  showError(type) {
    if (this.props.error && this.props.error.data) {
      return this.props.error.data.error[ type ][ 0 ];
    }
  }

  componentDidMount () {
    this.props.fetchTweetOptions();
  }

  componentDidUpdate (prevProps, prevState) {
    const props = this.props;

    if (prevProps === props) {
      return;
    }

    if (props.success) {
      this.alert('success', props.success);
    }
  }

  alert (type, message) {
    return (
      Alert[ type ](
        message, {
          position: 'bottom',
          effect: 'bouncyflip',
          timeout: 5000,
        }
      )
    );
  }

  render () {
    self = this;

    let tweetOptions;

    if (this.props.tweetOptions) {
      tweetOptions = this.props.tweetOptions.map((tweetOption) => {
        return (
          <option key={tweetOption} value={tweetOption}>{tweetOption}</option>
        )
      });
    }

    return (
      <div>
        <h4>TrumpTweet</h4>
        <Formik
            initialValues={{ name: '' }}
            validate={values => {
              let errors = {};
              if (!values.name) {
                errors.name = 'is required';
              }

              return errors;
            }}
            onSubmit={
              (values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                self.props.addTweet(values);
                resetForm({ name: '', phrase: '' });
              }
            }
          >
            {
              ({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit} className='tweet-form'>
                  <FormGroup>
                    <Label>
                      Ever wondered what it'd be like to be insulted by Donald J. Trump on Twitter?
                      Well now's your chance...
                    </Label>
                    <Input
                      type="name"
                      name="name"
                      invalid={ this.showError('name') !== undefined || (errors.name && touched.name) }
                      placeholder="Enter a Twitter handle or name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    <div className="invalid-feedback">
                      {this.showError('name') || (errors.name && touched.name && errors.name) }
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label>
                      Pick a phrase or leave it to 'The Donald'
                    </Label>
                    <Input
                      type="select"
                      name="phrase"
                      id="phrase"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phrase}
                    >
                      <option value=""></option>
                      { tweetOptions }
                    </Input>
                  </FormGroup>
                  <Button color="danger" type="submit" disabled={isSubmitting || !values.name}>
                    Make Twitter Great Again
                  </Button>
                </Form>
              )
            }
        </Formik>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    tweetOptions: state.TweetOptionsReducer.tweet_options,
    success: state.TweetsReducer.success,
    error: state.TweetsReducer.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    addTweet: addTweet,
    fetchTweetOptions: fetchTweetOptions,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TweetForm);

TweetForm.propTypes = {
  addTweet: PropTypes.func.isRequired,
  fetchTweetOptions: PropTypes.func.isRequired
}
