import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import Layout from "@/containers/Layout";
import DashboardPartial from "@/partials/dashboard";

import { NextPage } from "next";

const DashboardPage: NextPage = ({}) => {
  return (
    <Layout>
      <DashboardPartial></DashboardPartial>
    </Layout>
  );
};

export default DashboardPage;
