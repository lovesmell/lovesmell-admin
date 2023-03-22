import { NextApiRequest, NextApiResponse } from "next";

import db from "@lovesmell/utils/db";

const EditPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { method } = req;
  const postId = id as string;

  try {
    if (method === "PUT") {
      await db
        .collection("entries")
        .doc(postId)
        .update({
          ...req.body,
          updated: new Date().toISOString(),
        });
    } else if (method === "GET") {
      const doc = await db.collection("entries").doc(postId).get();
      if (!doc.exists) {
        res.status(404).end();
      } else {
        res.status(200).json(doc.data());
      }
    } else if (method === "DELETE") {
      await db.collection("entries").doc(postId).delete();
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
};

export default EditPost;
