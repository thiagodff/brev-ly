import { db } from "@/infra/db"
import { schema } from "@/infra/db/schemas"
import { Either, makeLeft, makeRight } from "@/shared/either"
import { eq } from "drizzle-orm"
import z from "zod"
import { LinkNotFoundError } from "./errors/link-not-found"

const getLinksBySlugInput = z.object({
  slug: z.string(),
})

type GetLinkBySlugInput = z.infer<typeof getLinksBySlugInput>

type GetLinkBySlugOutput = {
  url: string
}

export async function getLinkBySlug(
  input: GetLinkBySlugInput
): Promise<Either<LinkNotFoundError, GetLinkBySlugOutput>> {
  const { slug } = getLinksBySlugInput.parse(input)

  const [link] = await db
    .select({
      url: schema.links.url,
    })
    .from(schema.links)
    .where(eq(schema.links.slug, slug))

  if (!link) {
    return makeLeft(new LinkNotFoundError())
  }

  return makeRight({ url: link.url })
}
