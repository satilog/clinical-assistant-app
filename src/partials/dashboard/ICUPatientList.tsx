"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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

export default function ICUPatientList() {
  const [patients, setPatients] = useState<PatientRecord[]>([]);

  useEffect(() => {
    // fetch(process.env.NEXT_PUBLIC_API_URL + `/icu_patients`)
    fetch("http://34.42.46.22" + `/icu_patients`)
      .then((response) => response.json())
      .then((data) => {
        setPatients(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="flex flex-col p-5 pt-0 gap-4">
          {patients.map((patient) => (
            <Link key={patient.subject_id} href={`/patients/${patient.subject_id}`}>
              {/* <a className="block p-4 hover:bg-gray-50 transition-colors"> */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-200 w-12 h-12 flex items-center justify-center">
                      {patient.gender === "M" ? (
                        <span className="text-lg font-bold text-gray-700">M</span>
                      ) : (
                        <span className="text-lg font-bold text-gray-700">F</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Patient ID: {patient.subject_id}</p>
                      <p className="text-sm text-gray-500">{patient.insurance}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{patient.anchor_age} years old</p>
                  </div>
                </div>
              {/* </a> */}
            </Link>
          ))}
    </div>
  );
}
