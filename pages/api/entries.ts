import { NextApiRequest, NextApiResponse } from "next";

import db from "@lovesmell/utils/db";

const getPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const entries = await db.collection("entries").orderBy("created").get();
    const entriesData = entries.docs.map((entry) => ({
      id: entry.id,
      ...entry.data(),
    }));

    res.status(200).json({ entriesData });
  } catch (e) {
    res.status(400).end();
  }
};

export default getPosts;
