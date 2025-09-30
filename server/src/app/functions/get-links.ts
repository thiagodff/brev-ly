import { db } from "@/infra/db"
import { schema } from "@/infra/db/schemas"
import { Either, makeLeft, makeRight } from "@/shared/either"
import { count } from "drizzle-orm"
import z from "zod"
import { LinkNotFoundError } from "./errors/link-not-found"

const getLinksInput = z.object({
  page: z.number(),
  pageSize: z.number(),
})

type GetLinksInput = z.infer<typeof getLinksInput>

type GetLinksOutput = {
  links: {
    id: string
    url: string
    slug: string
    redirectCount: number
    createdAt: Date
  }[]
  total: number
}

export async function getLinks(
  input: GetLinksInput
): Promise<Either<never, GetLinksOutput>> {
  const { page, pageSize} = getLinksInput.parse(input)

  const [links, [{ total }]] = await Promise.all([
    await db
    .select({
      id: schema.links.id,
      url: schema.links.url,
      slug: schema.links.slug,
      redirectCount: schema.links.redirectCount,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .limit(pageSize)
    .offset((page - 1) * pageSize),
    await db
      .select({ total: count(schema.links.id)})
      .from(schema.links)
  ])

  return makeRight({ links, total })
}
