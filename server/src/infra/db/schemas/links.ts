import { randomUUID } from 'node:crypto'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const links = pgTable('links', {
  id: text('id').primaryKey().$defaultFn(() => randomUUID()),
  url: text('url').notNull(),
  slug: text('slug').notNull().unique(),
  redirectCount: text('redirect_count').default('0').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
