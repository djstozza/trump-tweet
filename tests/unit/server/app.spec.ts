import express, { Request } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import app, { staticPath, productionSetup, sendFilePath, sendFile } from '../../../server/app'

const originalNodeEnv = process.env.NODE_ENV

describe('app', () => {
  describe('productionSetup', () => {
    it('productionSetup', () => {
      const staticMock = jest.spyOn(express, 'static')
      const getMock = jest.spyOn(app, 'get')

      productionSetup()
      expect(staticMock).not.toHaveBeenCalled()
      expect(getMock).not.toHaveBeenCalled()
    })

    it('sets the static path if NODE_ENV = production', () => {
      process.env.NODE_ENV = 'production'

      const staticMock = jest.spyOn(express, 'static')
      const getMock = jest.spyOn(app, 'get')

      productionSetup()
      expect(staticMock).toHaveBeenCalledWith(staticPath)
      expect(getMock).toHaveBeenCalledWith('*', sendFile)

      process.env.NODE_ENV = originalNodeEnv
    })
  })

  describe('blaah', () => {
    it('foo', () => {
      const sendFileMock = jest.fn()
      const { res } = getMockRes({
        sendFile: sendFileMock
      })

      const req = {} as Request

      sendFile(req, res)

      expect(sendFileMock).toHaveBeenCalledWith(sendFilePath)
    })
  })
})
