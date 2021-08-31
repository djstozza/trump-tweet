import { server, io, stream } from '../../../server/server'
import http, { Server } from 'http'
import { PromiseResponse } from 'twit'

import { twit } from  '../../../server/tweet'

describe('server', () => {
  it('broadcasts tweet ids via streaming', async () => {
    const streamMock = jest.spyOn(stream, 'emit')
    const ioMock = jest.spyOn(io, 'emit')

    stream.emit('tweet', { id: '1' })

    expect(streamMock).toHaveBeenCalled()
    expect(ioMock).toHaveBeenCalledWith('broadcastTweet', '1')
  })
})
