"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TransferChart from "@/components/charts/TransferChart";
import LabEventsChart from "@/partials/patient/LabEventsChart";

interface PatientRecord {
  subject_id: number;
  gender: string;
  anchor_age: number;
  number_of_hospital_admission: number;
  number_of_icu_stay: number;
  insurance: string;
  marital_status: string;
  race: string;
  hospital_expire_flag: number;
}

export default function PatientDetail() {
  const params = useParams();
  const [patient, setPatient] = useState<PatientRecord | null>(null);
  const [patientDetail, setPatientDetail] = useState<PatientRecord | null>(
    null
  );
  const [patientTransferHistory, setPatientTransferHistory] = useState<
    any | null
  >(null);

  const id = params.id;

  useEffect(() => {
    if (id) {
      fetch("http://34.172.105.113/icu_patients")
        .then((response) => response.json())
        .then((data) => {
          setPatient(data.filter((p: any) => p.subject_id == id)[0]);
        })
        .catch((error) => console.error("Error fetching data:", error));

      fetch(
        process.env.NEXT_PUBLIC_API_URL +
          `/get_transfer_history?subject_id=${id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setPatientTransferHistory(data);
        })
        .catch((error) => console.error("Error fetching data:", error));

      fetch(
        process.env.NEXT_PUBLIC_API_URL + `/icu_patient_detail?subject_id=${id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setPatientDetail(data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [id]);

  if (!patient) return <p>Loading...</p>;

  return (
    <div className="flex flex-col justify-start w-full p-5 gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-9">
        <div className="col-span-3 flex flex-col gap-4">
          <Card className="w-full bg-white shadow-md rounded-lg min-h-[calc((100vh-15em)/2)]">
            <CardHeader>
              <CardTitle>Patient Details</CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-lg">
                <strong>Patient ID:</strong> {patient.subject_id}
              </h2>
              <p>
                <strong>Gender:</strong> {patient.gender}
              </p>
              <p>
                <strong>Age:</strong> {patient.anchor_age}
              </p>
              <p>
                <strong>Hospital Admissions:</strong>{" "}
                {patient.number_of_hospital_admission}
              </p>
              <p>
                <strong>ICU Stays:</strong> {patient.number_of_icu_stay}
              </p>
              <p>
                <strong>Insurance:</strong> {patient.insurance}
              </p>
              <p>
                <strong>Marital Status:</strong> {patient.marital_status}
              </p>
              <p>
                <strong>Race:</strong> {patient.race}
              </p>
              <p>
                <strong>Hospital Expire Flag:</strong>{" "}
                {patient.hospital_expire_flag ? "Yes" : "No"}
              </p>
            </CardContent>
          </Card>
          {/* <Card className="col-span-3 bg-white shadow-md rounded-lg min-h-[calc((100vh-11em)/2)]">
            <CardHeader>
              <CardTitle>Transfer Chart</CardTitle>
            </CardHeader>
            <div className="h-96 overflow-y-auto">
              <TransferChart data={patientDetail}></TransferChart>
            </div>
          </Card> */}
          <Card className="col-span-3 bg-white shadow-md rounded-lg w-full max-h-[calc((100vh-11em)/2)]">
            <CardHeader>
              <CardTitle>Transfer Chart</CardTitle>
              <p className="text-sm">Longest 10 stays</p>
            </CardHeader>
            <div className="h-96 overflow-y-auto">
              <TransferChart data={patientTransferHistory}></TransferChart>
            </div>
            {/* <CardContent></CardContent> */}
          </Card>
        </div>
        <div className="col-span-6 flex flex-col gap-4">
          <LabEventsChart id={id || ""}></LabEventsChart>

          <Card className="w-full bg-white shadow-md rounded-lg w-full max-h-[calc((100vh-11em)/2)]">
            <CardHeader>
              <CardTitle>Transfer Chart</CardTitle>
              <p className="text-sm">Longest 10 stays</p>
            </CardHeader>
            <div className="h-96 overflow-y-auto">
              <TransferChart data={patientTransferHistory}></TransferChart>
            </div>
            {/* <CardContent></CardContent> */}
          </Card>
        </div>
      </div>
    </div>
  );
}
