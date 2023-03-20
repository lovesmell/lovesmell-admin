import { NextApiRequest, NextApiResponse } from "next";

import db from "@lovesmell/utils/db";

const getPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const doc = await db
      .collection("entries")
      .doc(id as string)
      .get();

    if (!doc.exists) {
      res.status(404).end();
    } else {
      res.status(200).json(doc.data());
    }

    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
};

const updatePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    await db
      .collection("entries")
      .doc(id as string)
      .update({
        ...req.body,
        updated: new Date().toISOString(),
      });

    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
};

const deletePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    await db
      .collection("entries")
      .doc(id as string)
      .delete();
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
};

export { getPost, updatePost, deletePost };
