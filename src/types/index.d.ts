export type TweetPhraseOption = {
  label: string,
  matcher: string
}

export type State = {
  tweetPhraseOptions: TweetPhraseOption[],
  selectedPhrase?: TweetPhraseOption,
  name: string,
  errors: string[],
  success: string,
  latestTweetId: string
}
