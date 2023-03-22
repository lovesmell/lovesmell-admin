import Head from "next/head";
import Link from "next/link";
import { FC } from "react";

import styles from "@lovesmell/styles/Home.module.css";

import db from "@lovesmell/utils/db";

const Home = (props: any) => {
  const { entriesData } = props;

  return (
    <div>
      <h1>Posts</h1>

      {entriesData?.map((entry: any) => (
        <div key={entry.id}>
          <Link href={`/admin/edit/${entry.id}`}>{entry.title}</Link>
          <br />
        </div>
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const entries = await db
    .collection("entries")
    .orderBy("created", "desc")
    .get();

  const entriesData = entries.docs.map((entry) => ({
    id: entry.id,
    ...entry.data(),
  }));

  return {
    props: { entriesData },
    revalidate: 10,
  };
};

export default Home;
