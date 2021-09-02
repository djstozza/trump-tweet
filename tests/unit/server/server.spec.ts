import { io, stream, origin } from '../../../server/server'

const originalNodeEnv = process.env.NODE_ENV

describe('server', () => {
  it('broadcasts tweet ids via streaming', async () => {
    const streamMock = jest.spyOn(stream, 'emit')
    const ioMock = jest.spyOn(io, 'emit')

    stream.emit('tweet', { id: '1' })

    expect(streamMock).toHaveBeenCalled()
    expect(ioMock).toHaveBeenCalledWith('broadcastTweet', '1')
  })

  it('changes the origin based on the NODE_ENV', () => {
    expect(origin()).toEqual('/')

    process.env.NODE_ENV = 'development'

    expect(origin()).toEqual(process.env.VUE_CLIENT_URL)

    process.env.NODE_ENV = originalNodeEnv
  })
})
