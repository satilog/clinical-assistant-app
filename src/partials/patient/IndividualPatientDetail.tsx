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
    //   fetch(process.env.NEXT_PUBLIC_API_URL + `/icu_patients`)
      fetch("http://34.42.46.22" + `/icu_patients`)
        .then((response) => response.json())
        .then((data) => {
          setPatient(data.filter((p: any) => p.subject_id == id)[0]);
        })
        .catch((error) => console.error("Error fetching data:", error));

      fetch(
        // process.env.NEXT_PUBLIC_API_URL +
        "http://34.42.46.22" +
          `/get_transfer_history?subject_id=${id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setPatientTransferHistory(data);
        })
        .catch((error) => console.error("Error fetching data:", error));

      fetch(
        "http://34.42.46.22" + `/icu_patient_detail?subject_id=${id}`
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
          <Card className="w-full bg-white shadow-md rounded-lg">
            <CardHeader>
              <CardTitle>Patient Details</CardTitle>
            </CardHeader>
            <CardContent className="min-h-[calc((100vh-25em)/2)] max-h-[calc((100vh-25em)/2)] overflow-y-auto">
              <table className="text-sm min-w-full border-collapse border border-gray-200">
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-2 font-bold">Patient ID:</td>
                    <td className="px-4 py-2">{patient.subject_id}</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-2 font-bold">Gender:</td>
                    <td className="px-4 py-2">{patient.gender}</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-2 font-bold">Age:</td>
                    <td className="px-4 py-2">{patient.anchor_age}</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-2 font-bold">
                      Hospital Admissions:
                    </td>
                    <td className="px-4 py-2">
                      {patient.number_of_hospital_admission}
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-2 font-bold">ICU Stays:</td>
                    <td className="px-4 py-2">{patient.number_of_icu_stay}</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-2 font-bold">Insurance:</td>
                    <td className="px-4 py-2">{patient.insurance}</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-2 font-bold">Marital Status:</td>
                    <td className="px-4 py-2">{patient.marital_status}</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-2 font-bold">Race:</td>
                    <td className="px-4 py-2">{patient.race}</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-2 font-bold">
                      Hospital Expire Flag:
                    </td>
                    <td className="px-4 py-2">
                      {patient.hospital_expire_flag ? "Yes" : "No"}
                    </td>
                  </tr>
                </tbody>
              </table>
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
          </Card>
        </div>
        <div className="col-span-6 row-span-2 flex flex-col gap-4">
          <LabEventsChart id={id || ""}></LabEventsChart>
        </div>
      </div>
    </div>
  );
}
