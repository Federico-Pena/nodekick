import { describe, expect, test } from 'vitest'
import { apiConfig } from '../../src/config/apiConfig.js'
import supertest from 'supertest'
import app from '../../src/app/app.js'

const apiUrl = apiConfig.API_ROUTES.someRoutes.route1

describe('controllers/someController.ts', async () => {
  test('Should return a successful response with correct message', async () => {
    const { body } = await supertest(app)
      .get(apiUrl)
      .expect(200)
      .expect('Content-Type', /json/)
    expect(body.message).toEqual('Hello, from the API!')
  })
})
