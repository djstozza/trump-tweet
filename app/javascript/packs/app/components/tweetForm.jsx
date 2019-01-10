import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
    if (this.state && this.state.error && this.state.error.data) {
      return this.state.error.data.error[ type ][ 0 ];
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const props = this.props;

    if (prevProps === props) {
      return;
    }

    if (props.success) {
      this.alert('success', props.success);
    }

    this.setState({
      ...props,
    });
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

    return (
      <Card>
        <CardHeader>
          <h4>TrumpTweet</h4>
        </CardHeader>
        <CardBody>
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
              resetForm({ name: '' });
            }
          }
        >
          {
            ({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                <Label for="name">
                  Ever wondered what it'd be like to be insulted by Donald J. Trump on Twitter?
                  Well now's your chance...
                </Label>
                <Input
                  type="name"
                  name="name"
                  invalid={ this.showError('name') !== undefined || (errors.name && touched.name) }
                  placeholder="Enter your Twitter handle or name here"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <div className="invalid-feedback">
                  {this.showError('name') || (errors.name && touched.name && errors.name) }
                </div>
                </FormGroup>
                <Button color="danger" type="submit" disabled={isSubmitting || !values.name}>
                  Make Twitter Great Again
                </Button>
              </Form>
            )
          }
          </Formik>
        </CardBody>
      </Card>
    )
  }
}

function mapStateToProps (state) {
  return {
    success: state.TweetsReducer.success,
    error: state.TweetsReducer.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    addTweet: addTweet,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TweetForm);

TweetForm.propTypes = {
  addTweet: PropTypes.func.isRequired
}
