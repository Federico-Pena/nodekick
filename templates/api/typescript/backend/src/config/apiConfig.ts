const API_URL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:${process.env.PORT ?? 1234}`
    : '/'

const CORS_SETTINGS = {
  origin: [API_URL], // Allow specific origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
  // credentials: true,
  // optionsSuccessStatus: 200,
  // maxAge: 3600
  // preflightContinue: true,
}
const API_ROUTES = {
  someRoutes: {
    route1: '/api/v1/route1'
  }
}
export const apiConfig = {
  API_URL,
  PORT: process.env.PORT ?? 1234,
  API_ROUTES,
  CORS_SETTINGS
}
