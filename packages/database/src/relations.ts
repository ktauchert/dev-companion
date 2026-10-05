import { defineRelations } from "drizzle-orm";
import {
  account,
  session,
  user,
  verification,
} from "../../auth/auth-schema.js";
import { document, project } from "./db/schema-tables.js";

export const relations = defineRelations(
  { user, session, account, verification, project, document },
  (r) => ({
    user: {
      sessions: r.many.session({
        from: r.user.id,
        to: r.session.userId,
      }),
      accounts: r.many.account({
        from: r.user.id,
        to: r.account.userId,
      }),
      projects: r.many.project({
        from: r.user.id,
        to: r.project.ownerId,
      }),
    },
    session: {
      user: r.one.user({
        from: r.session.userId,
        to: r.user.id,
      }),
    },
    account: {
      user: r.one.user({
        from: r.account.userId,
        to: r.user.id,
      }),
    },
    project: {
      owner: r.one.user({
        from: r.project.ownerId,
        to: r.user.id,
      }),
      documents: r.many.document({
        from: r.project.id,
        to: r.document.projectId,
      }),
    },
    document: {
      project: r.one.project({
        from: r.document.projectId,
        to: r.project.id,
      }),
    },
  }),
);
