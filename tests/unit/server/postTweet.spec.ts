import axios from 'axios'
import { Request, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import MockAdapter from 'axios-mock-adapter'
import { PromiseResponse } from 'twit'

import PostTweet from '../../../server/postTweet'
import { twit } from  '../../../server/tweet'
import { tweetPhraseOptions } from '@/store'

const mock = new MockAdapter(axios)
const { label, matcher } = tweetPhraseOptions[0]

describe('postTweet', () => {
  it('fails if the name is missing', async () => {
    const req = getMockReq({ query: { name: '', label: 'label', matcher: 'matcher' } })
    const { res } = getMockRes()

    await PostTweet(req, res)

    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.send).toHaveBeenCalledWith({ messages: ['Name is required'] })
  })

  it('fails if the label is missing', async () => {
    const req = getMockReq({ query: { name: 'name', label: '', matcher: 'matcher' } })
    const { res } = getMockRes()

    await PostTweet(req, res)

    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.send).toHaveBeenCalledWith({ messages: ['Selected phrase is required'] })
  })

  it('fails if the matcher is missing', async () => {
    const req = getMockReq({ query: { name: 'name', label: 'label', matcher: '' } })
    const { res } = getMockRes()

    await PostTweet(req, res)

    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.send).toHaveBeenCalledWith({ messages: ['Selected phrase is required'] })
  })

  it('fails if the name is not a string', async () => {
    const req = getMockReq({ query: { name: 1, label: 'label', matcher: 'matcher' } })
    const { res } = getMockRes()

    await PostTweet(req, res)

    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.send).toHaveBeenCalledWith({ messages: ['Name is invalid'] })
  })

  it('fails if the label is not a string', async () => {
    const req = getMockReq({ query: { name: 'name', label: 1, matcher: 'matcher' } })
    const { res } = getMockRes()

    await PostTweet(req, res)

    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.send).toHaveBeenCalledWith({ messages: ['Selected phrase is invalid'] })
  })

  it('fails if the matcher is not a string', async () => {
    const req = getMockReq({ query: { name: 'name', label: 'label', matcher: 1 } })
    const { res, next } = getMockRes()

    await PostTweet(req, res)

    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.send).toHaveBeenCalledWith({ messages: ['Selected phrase is invalid'] })
  })

  it('fails if the search call does not return a status', async () => {
    mock.onPost(process.env.SEARCHLY_URL).reply(200, { hits: { hits: [] } })

    const req = getMockReq({ query: { name: 'Name', label, matcher } })
    const { res } = getMockRes()

    await PostTweet(req, res)

    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.send).toHaveBeenCalledWith({ messages: ['Unable to create at this time'] })
  })

  it('posts the new subbed tweet', async () => {
    const { label, matcher } = tweetPhraseOptions[0]
    const hit = { _source: { text: "After today, Crooked Hillary can officially be called Lyin' Crooked Hillary" } }

    mock.onPost(process.env.SEARCHLY_URL).reply(200, { hits: { hits: [hit] } })

    const response = { data: { created_at: 'Tue Aug 31 08:16:58 +0000 2021' } } as PromiseResponse
    const twitMock = jest.spyOn(twit, 'post').mockReturnValue(Promise.resolve(response))

    const req = getMockReq({ query: { name: 'Name', label, matcher } })
    const { res } = getMockRes()

    await PostTweet(req, res)

    expect(twitMock).toHaveBeenCalledWith(
      'statuses/update',
      { status: "After today, Crooked Name can officially be called Lyin' Crooked Name" }
    )
  })

  it('returns a failed response if the tweet status update fails', async () => {
    const hit = { _source: { text: "After today, Crooked Hillary can officially be called Lyin' Crooked Hillary" } }

    mock.onPost(process.env.SEARCHLY_URL).reply(200, { hits: { hits: [hit] } })

    const response = {
      code: 186,
      allErrors: [{ code: 186, message: 'Error 1' }],
      statusCode: 403
    }

    const twitMock = jest.spyOn(twit, 'post')

    twitMock.mockRejectedValue(response)

    const req = getMockReq({ query: { name: 'Name', label, matcher } })
    const { res } = getMockRes()

    await PostTweet(req, res)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.send).toHaveBeenCalledWith({ messages: ['Error 1'] })
  })
})
