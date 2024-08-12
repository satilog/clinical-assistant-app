"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import TransferChart from "@/components/charts/TransferChart";
import LabEventsChart from "@/partials/patient/LabEventsChart";
import { PiCaretRightBold } from "react-icons/pi";
import { SERVER_URL } from "@/lib/constants";
import { Loader2 } from "lucide-react"; // Loader icon
import ReactMarkdown from "react-markdown"; // Import react-markdown
import rehypeRaw from "rehype-raw"; // To handle raw HTML

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
  const router = useRouter();
  const params = useParams();
  const [patient, setPatient] = useState<PatientRecord | null>(null);
  const [patientDetail, setPatientDetail] = useState<PatientRecord | null>(
    null
  );
  const [patientTransferHistory, setPatientTransferHistory] = useState<
    any | null
  >(null);
  const [assessment, setAssessment] = useState<string | null>(null);
  const [loadingAssessment, setLoadingAssessment] = useState<boolean>(false);

  const id = params.id;

  useEffect(() => {
    if (id) {
      fetch(SERVER_URL + `/icu_patients`)
        .then((response) => response.json())
        .then((data) => {
          setPatient(data.filter((p: any) => p.subject_id == id)[0]);
        })
        .catch((error) => console.error("Error fetching data:", error));

      fetch(SERVER_URL + `/get_transfer_history?subject_id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setPatientTransferHistory(data);
        })
        .catch((error) => console.error("Error fetching data:", error));

      fetch(SERVER_URL + `/icu_patient_detail?subject_id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setPatientDetail(data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      setLoadingAssessment(true);
      fetch(SERVER_URL + `/assessment?subject_id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setAssessment(data.medical_assessment); // Fetch the markdown text from the API
          setLoadingAssessment(false);
        })
        .catch((error) => {
          console.error("Error fetching assessment:", error);
          setLoadingAssessment(false);
        });
    }
  }, [id]);

  if (!patient) return <p>Loading...</p>;

  return (
    <div className="w-full py-5">
      <div className="flex flex-row items-center justify-start">
        <h2
          className="text-xl font-bold hover:underline cursor-pointer"
          onClick={() => router.push("/patients")}
        >
          Patients
        </h2>
        <PiCaretRightBold size={18} strokeWidth={10} />
        <h2 className="text-xl font-bold">{patient.subject_id} </h2>
      </div>
      <Tabs defaultValue="general" className="pt-4">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="lab-events">Lab Events</TabsTrigger>
          <TabsTrigger value="transfer-chart">Transfer Chart</TabsTrigger>
          <TabsTrigger value="suggestions">Assessments</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Table className="text-sm w-full border-collapse border border-gray-200">
            <TableBody>
              <TableRow className="border-t border-gray-200">
                <TableCell className="px-4 py-2 font-bold">Gender:</TableCell>
                <TableCell className="px-4 py-2">{patient.gender}</TableCell>
              </TableRow>
              <TableRow className="border-t border-gray-200">
                <TableCell className="px-4 py-2 font-bold">Age:</TableCell>
                <TableCell className="px-4 py-2">
                  {patient.anchor_age}
                </TableCell>
              </TableRow>
              <TableRow className="border-t border-gray-200">
                <TableCell className="px-4 py-2 font-bold">
                  Hospital Admissions:
                </TableCell>
                <TableCell className="px-4 py-2">
                  {patient.number_of_hospital_admission}
                </TableCell>
              </TableRow>
              <TableRow className="border-t border-gray-200">
                <TableCell className="px-4 py-2 font-bold">
                  ICU Stays:
                </TableCell>
                <TableCell className="px-4 py-2">
                  {patient.number_of_icu_stay}
                </TableCell>
              </TableRow>
              <TableRow className="border-t border-gray-200">
                <TableCell className="px-4 py-2 font-bold">
                  Insurance:
                </TableCell>
                <TableCell className="px-4 py-2">{patient.insurance}</TableCell>
              </TableRow>
              <TableRow className="border-t border-gray-200">
                <TableCell className="px-4 py-2 font-bold">
                  Marital Status:
                </TableCell>
                <TableCell className="px-4 py-2">
                  {patient.marital_status}
                </TableCell>
              </TableRow>
              <TableRow className="border-t border-gray-200">
                <TableCell className="px-4 py-2 font-bold">Race:</TableCell>
                <TableCell className="px-4 py-2">{patient.race}</TableCell>
              </TableRow>
              <TableRow className="border-t border-gray-200">
                <TableCell className="px-4 py-2 font-bold">
                  Hospital Expire Flag:
                </TableCell>
                <TableCell className="px-4 py-2">
                  {patient.hospital_expire_flag ? "Yes" : "No"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="lab-events">
          <LabEventsChart id={id || ""}></LabEventsChart>
        </TabsContent>

        <TabsContent
          value="transfer-chart"
          className="flex flex-col justify-center py-4"
        >
          <div>
            <p className="text-sm">Longest 10 stays</p>
            <TransferChart data={patientTransferHistory}></TransferChart>
          </div>
        </TabsContent>

        <TabsContent value="suggestions">
          {loadingAssessment ? (
            <div className="flex flex-col items-center justify-center h-48">
              <Loader2 className="animate-spin mb-4" size={32} />
              <p>Generating assessment...</p>
              <p className="text-sm text-gray-400">This may take a while</p>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Medical Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {assessment || ""}
                </ReactMarkdown>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
