# TrumpTweet

Have you ever wondered what it'd be like to get insulted by the 45th President of the United States of America?

Well now's your chance!

TrumpTweet is a rails app with a React/Redux front-end.

When a user submits a name or Twitter handle, the `TweetFetcher` service scrapes tweets from the [@**realDonaldTrump**](https://twitter.com/realDonaldTrump) based on a random phrase using `HTTParty` and `Nokogiri`. A random tweet is selected in turn and the submitted Twitter handle/name is substituted into the form when it matches the regular expression associated with the phrase.

A tweet is then created out of the resulting string and is submitted via [@**phnyDonaldTrump**](https://twitter.com/phnyDonaldTrump).

## System Dependencies
```
Ruby: 2.5.3
Postgres: 9.6
Rails: 5.2.2
Bundler: 1.17.2
Yarn: 1.12.3
Heroku
Twitter
CircleCi
```

## Configuration
### Heroku
Create a web app with Heroku for code deployment and to communicate with the Twitter app that will be created below.

### Twitter
You need to create a [Twitter](https://twitter.com/?lang=en) account and [apply for api access](https://developer.twitter.com/en/apply-for-access). Once you've successfully obtained access, create a Twitter app generate an access token and access token secret. There are plenty of walkthroughs that will help you  achieve this. Add the tokens to your `config/application.yml` as follows:

```
development:
  TWITTER_KEY: "YOUR_API_KEY"
  TWITTER_SECRET: "YOUR_API_SECRET_KEY"
  TWITTER_ACCESS_TOKEN: "YOUR_ACCESS_TOKEN"
  TWITTER_ACCESS_TOKEN_SECRET: "YOUR_ACCESS_TOKEN_SECRET"

test:
  TWITTER_KEY: "YOUR_API_KEY"
  TWITTER_SECRET: "YOUR_API_SECRET_KEY"
  TWITTER_ACCESS_TOKEN: "YOUR_ACCESS_TOKEN"
  TWITTER_ACCESS_TOKEN_SECRET: "YOUR_ACCESS_TOKEN_SECRET"
  ```

Set your `Heroku` url as the `Website URL` of your Twitter app and add it to the `Callback URL` section.

You can also set `http://vcap.me:3000/auth/twitter/callback` as a `Callback URL` to test in your dev environment - it equates to `127.0.1`.

### CircleCi
Sign up to [CircleCi](https://circleci.com/) with your `Github` or `Bitbucket` account and add the project to it. Make sure you add your `Heroku_API_KEY`, `Heroku_APP_NAME` as well as your Twitter access tokens as environment variables.

## Database creation and initialisation
```
rake db:create
rake db:migrate
```

## Running the test suite
`bundle exec rspec`

## Deployment instructions
It's as simple as `git push origin master` thanks to `CircleCi`!
