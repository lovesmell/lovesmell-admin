import { NextApiRequest, NextApiResponse } from "next";

import db from "@lovesmell/utils/db";

const addPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.body;
    const entries = await db.collection("entries").get();
    const entriesData = entries.docs.map((entry) => entry.data());

    const entryExisted = entriesData.some((entry) => entry.slug === slug);
    if (entryExisted) {
      res.status(400).end();
    } else {
      const { id } = await db.collection("entries").add({
        ...req.body,
        created: new Date().toISOString(),
      });

      res.status(200).json({ id });
    }
  } catch (e) {
    res.status(400).end();
  }
};

export default addPost;
