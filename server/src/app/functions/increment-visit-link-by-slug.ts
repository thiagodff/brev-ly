import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeLeft, makeRight } from "@/shared/either";
import { eq } from "drizzle-orm";
import z from "zod";
import { LinkNotFoundError } from "./errors/link-not-found";

const getLinksBySlugInput = z.object({
  slug: z.string(),
});

type IncrementVisitLinksBySlugInput = z.infer<typeof getLinksBySlugInput>;

type IncrementVisitLinksBySlugOutput = {
  url: string;
  redirectCount: number;
};

export async function incrementVisitLinksBySlug(
  input: IncrementVisitLinksBySlugInput,
): Promise<Either<LinkNotFoundError, IncrementVisitLinksBySlugOutput>> {
  const { slug } = getLinksBySlugInput.parse(input);

  const [link] = await db
    .select({
      url: schema.links.url,
      redirectCount: schema.links.redirectCount,
    })
    .from(schema.links)
    .where(eq(schema.links.slug, slug));

  if (!link) {
    return makeLeft(new LinkNotFoundError());
  }

  // race condition possible
  await db
    .update(schema.links)
    .set({
      redirectCount: link.redirectCount + 1,
    })
    .where(eq(schema.links.slug, slug));

  return makeRight({ url: link.url, redirectCount: link.redirectCount });
}
