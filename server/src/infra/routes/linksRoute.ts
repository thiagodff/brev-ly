import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const linksRoute: FastifyPluginAsyncZod = async server => {
  server.post('/link', () => {
    return 'Link created successfully!'
  })
}