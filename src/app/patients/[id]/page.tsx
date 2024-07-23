import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import Layout from "@/containers/Layout";
import IndividualPatientDetail from "@/partials/patient/IndividualPatientDetail";

import { NextPage } from "next";

const DashboardPage: NextPage = ({}) => {
  return (
    <Layout>
      <IndividualPatientDetail></IndividualPatientDetail>
    </Layout>
  );
};

export default DashboardPage;
