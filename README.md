# Trump Tweet #MTGA
The 'greatest of all presidents' was [banned from Twitter](https://blog.twitter.com/en_us/topics/company/2020/suspension) on 8 January 2021 causing the social media platform to go downhill ever since. Thankfully, you can now Make Twitter Great Again through [Trump Tweet](https://donald-trump-tweet.herokuapp.com/#/).

## General Info
Trump Tweet is a Vue app with an Express server. It allows users to enter a name or Twitter handle into a text field and select a phrase i.e. 'Crooked Hillary', 'Sleepy Joe' etc. When this information is submitted, a call is made to [SearchBox Elasticsearch](https://elements.heroku.com/addons/searchbox) to obtain tweets that match the selected phrase. A random selection is made from one of the tweets and the name or Twitter handle is substituted into the tweet, which is then posted as a status update on [@hoaxDonalTrump](https://twitter.com/hoaxDonalTrump).


## Project setup

### Package.json
Install node modules
```
npm install
```

Run the Express server on one port while concurrently running the Vue frontend on another in development mode
```
npm run development
```

Compile and minify for production
```
npm run build
```

Run the Express server relying on the dist folder created by `npm run build` for the front end
```
npm run production
```

Run unit tests
```
npm run test:unit
```

Run end-to-end tests
```
npm run test:e2e
```

Lints and fixes files
```
npm run lint
```

### Twitter
Create a Twitter account and apply for access to the [Twitter Developer Platform](https://developer.twitter.com/en/apply-for-access). Once approved, create a product with read and write access. Add the Consumer Keys and Authentication Tokens to the `.env` file. These will be required for the `Twit` instance to stream and post tweets.

## Author
* [Daniel Sztolcman](https://github.com/djstozza)


## License
This project is licensed under the MIT License

## Acknowledgments
This project would not have been possible without Brendan Brown's [Trump Twitter Archive](https://www.thetrumparchive.com/), as none of the 45th President's tweets are accessible on Twitter since his permanent suspension. I was able to download a JSON file that contained all his tweets accessible on the Twitter archive, filter out all re-tweets and upload them to my site's SearchBox Elasitcsearch instance.
