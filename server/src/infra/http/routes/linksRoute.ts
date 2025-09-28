import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

export const linksRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/link',
    {
      schema: {
        summary: 'Create a shortened link',
        body: z.object({
          url: z.url(),
          slug: z.string(),
        }),
        response: {
          201: z.string(),
          409: z.object({ message: z.string() })
            .describe('Link already exists'),
        },
      }
    },
    async (request, reply) => {
      await db.insert(schema.links).values({
        url: request.body.url || '',
        slug: request.body.slug || '',
      })

      return reply.status(201).send()
  })
}
