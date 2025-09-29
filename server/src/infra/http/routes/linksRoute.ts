import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { getLinkBySlug } from '@/app/functions/get-link-by-slug'
import { isRight, unwrapEither } from '@/shared/either'

export const linksRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/link',
    {
      schema: {
        summary: 'Create a shortened link',
        body: z.object({
          url: z.url(),
          slug: z.string()
            .min(1)
            .max(30)
            .regex(/^[a-zA-Z0-9_-]+$/, 'Custom slug for the shortened link (alphanumeric, dashes, and underscores only)'),
        }),
        response: {
          201: z.string().describe('Link created successfully'),
          400: z.object({
              message: z.string(),
              issues: z.array(z.any()).optional()
            })
            .describe('Invalid request'),
          409: z.object({ message: z.string() })
            .describe('Link already exists'),
        },
      }
    },
    async (request, reply) => {
      const { url, slug } = request.body

      if (!url || !slug) {
        return reply.status(400).send({ message: 'URL and slug are required' })
      }

      const existingLink = await getLinkBySlug({ slug })

      if (isRight(existingLink)) {
        return reply.status(409).send({ message: 'Slug already in use' })
      }

      await db.insert(schema.links).values({
        url: request.body.url,
        slug: request.body.slug,
      })

      return reply.status(201).send()
  })
}
