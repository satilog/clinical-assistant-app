import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import Layout from "@/containers/Layout";
import PatientList from "@/partials/patient/PatientList";

import { NextPage } from "next";

const DashboardPage: NextPage = ({}) => {
  return (
    <Layout isScreenHeight={true} fullWidth={false}>
      <PatientList></PatientList>
    </Layout>
  );
};

export default DashboardPage;
