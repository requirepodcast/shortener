import { NowRequest, NowResponse } from "@vercel/node";
import faunadb from "faunadb";

const secret = process.env.FAUNADB_SECRET;
const q = faunadb.query;
const client = new faunadb.Client({ secret });

interface LinkQueryResult {
  data: {
    slug: string;
    destination: string;
  };
}

export default (req: NowRequest, res: NowResponse) => {
  return client
    .query(q.Get(q.Match(q.Index("links"), req.query.slug)))
    .then((dbs: LinkQueryResult) => {
      res.redirect(dbs.data.destination);
    })
    .catch(() => res.status(404).send("Link not found"));
};
