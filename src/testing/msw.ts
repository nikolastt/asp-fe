import { setupServer } from 'msw/node'

// Handlers are added per test with server.use(); any request without one fails the test.
export const server = setupServer()
