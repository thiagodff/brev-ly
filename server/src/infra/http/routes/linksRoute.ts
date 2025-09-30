import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { getLinkBySlug } from '@/app/functions/get-link-by-slug'
import { isLeft, isRight, unwrapEither } from '@/shared/either'
import { deleteLinkBySlug } from '@/app/functions/delete-link-by-slug'
import { incrementVisitLinksBySlug } from '@/app/functions/increment-visit-link-by-slug'
import { getLinks } from '@/app/functions/get-links'

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

  server.get(
    '/link/:slug',
    {
      schema: {
        summary: 'Get a shortened link',
        params: z.object({
          slug: z.string(),
        }),
        querystring: z.object({
          redirect: z.coerce.boolean().optional().default(false),
        }),
        response: {
          200: z.object({
            url: z.string(),
            redirectCount: z.number(),
          }).describe('Link found'),
          301: z.object({ url: z.string() }).describe('Redirect to the original URL'),
          404: z.object({ message: z.string() }).describe('Link not found'),
        },
      }
    },
    async (request, reply) => {
      const { slug } = request.params
      const { redirect } = request.query

      const linkResult = await getLinkBySlug({ slug })

      if (isLeft(linkResult)) {
        return reply.status(404).send({ message: 'Link not found' })
      }

      let { url, redirectCount } = linkResult.right

      if (redirect) {
        redirectCount++
        await incrementVisitLinksBySlug({ slug })
        return reply.status(301).header('Location', url).send()
      }

      return reply.status(200).send({ url, redirectCount })
    }
  )

  server.get(
    '/links',
    {
      schema: {
        summary: 'Get all shortened links',
        querystring: z.object({
          page: z.coerce.number().optional().default(1),
          pageSize: z.coerce.number().optional().default(20),
        }),
        response: {
          201: z.object({
            links: z.array(
              z.object({
                url: z.string(),
                slug: z.string(),
                redirectCount: z.number(),
              })
            ),
            total: z.number(),
          }).describe('List of all links'),
        },
      }
    },
    async (request, reply) => {
      const { page, pageSize } = request.query

      const result = await getLinks({
        page,
        pageSize,
      })

      const { links, total } = unwrapEither(result)

      return reply.status(201).send({ links, total })
    }
  )

  server.delete(
    '/link/:slug',
    {
      schema: {
        summary: 'Delete a shortened link',
        params: z.object({
          slug: z.string(),
        }),
        response: {
          204: z.string().describe('Link deleted successfully'),
          404: z.object({ message: z.string() }).describe('Link not found'),
        },
      }
    },
    async (request, reply) => {
      const { slug } = request.params

      const existingLink = await getLinkBySlug({ slug })

      if (isLeft(existingLink)) {
        return reply.status(404).send({ message: 'Link not found' })
      }

      await deleteLinkBySlug({ slug })

      return reply.status(204).send()
    }
  )
}
