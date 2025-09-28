import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'

export const linksRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/link',
    {
      schema: {
        summary: 'Create a shortened link',
        body: z.object({
          url: z.url(),
          slug: z.string().min(5).max(30).optional(),
        }),
        response: {
          201: z.string(),
          409: z.object({ message: z.string() })
            .describe('Link already exists'),
        },
      }
    },
    () => {
    return 'Link created successfully!'
  })
}