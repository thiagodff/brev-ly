import { db } from "@/infra/db"
import { schema } from "@/infra/db/schemas"
import { Either, makeLeft, makeRight } from "@/shared/either"
import { eq } from "drizzle-orm"
import z from "zod"

const deleteLinksBySlugInput = z.object({
  slug: z.string(),
})

type DeleteLinkBySlugInput = z.infer<typeof deleteLinksBySlugInput>

type DeleteLinkBySlugOutput = {
  slug: string
}

export async function deleteLinkBySlug(
  input: DeleteLinkBySlugInput
): Promise<Either<never, DeleteLinkBySlugOutput>> {
  const { slug } = deleteLinksBySlugInput.parse(input)

  await db
    .delete(schema.links)
    .where(eq(schema.links.slug, slug))

  return makeRight({ slug })
}
