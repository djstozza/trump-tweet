import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import addTweet from '../actions/tweets/addTweet';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Alert from 'react-s-alert';

class TweetForm extends Component {
  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showError = this.showError.bind(this);

    this.state = {
      name: '',
    }
  }

  handleChange(event) {
    const target = event.target;
    this.setState({ [ target.name ]: target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addTweet(this.state);
    document.getElementById('name').value = '';
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

    if (props.success && props.success !== this.state.success) {
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
    return (
      <Card>
        <CardHeader>
          <h4>TrumpTweet</h4>
        </CardHeader>
        <CardBody>
          <Form onSubmit={ this.handleSubmit } >
            <FormGroup>
              <Label for="name">
                Ever wondered what it'd be like to be insulted by Donald J. Trump on Twitter?
                Well now's your chance...
              </Label>
              <Input
                type="string"
                name="name"
                id="name"
                invalid={ this.showError('name') !== undefined  }
                placeholder="Enter your Twitter handle or name here"
                onChange={ this.handleChange }
              />
              <div className="invalid-feedback">
                  { this.showError('name') }
              </div>
            </FormGroup>
            <Button
              color="danger"
              type="submit"
              disabled={ !this.state.name }
            >
              Make Twitter Great Again
            </Button>
          </Form>
        </CardBody>
      </Card>
    )
  }
}

function mapStateToProps (state) {
  return {
    name: state.TweetsReducer.name,
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
  name: PropTypes.string,
  addTweet: PropTypes.func.isRequired
}
