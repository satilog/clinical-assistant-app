"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SERVER_URL } from "@/lib/constants";

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

export default function PatientListWithFilters() {
  const router = useRouter();
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<PatientRecord[]>([]);
  const [fieldOptions, setFieldOptions] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [selectedField, setSelectedField] = useState<string>("gender");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetch(SERVER_URL + `/icu_patients`)
      .then((response) => response.json())
      .then((data: PatientRecord[]) => {
        setPatients(data);
        setFilteredPatients(data); // Initially, filteredPatients should show all patients.
        const uniqueValues: { [key: string]: Set<string> } = {};

        data.forEach((patient) => {
          Object.keys(patient).forEach((key) => {
            if (
              [
                "subject_id",
                "gender",
                "anchor_age",
                "number_of_hospital_admission",
                "number_of_icu_stay",
                "insurance",
                "marital_status",
                "race",
                "hospital_expire_flag",
              ].includes(key)
            ) {
              if (!uniqueValues[key]) uniqueValues[key] = new Set();
              uniqueValues[key].add(
                patient[key as keyof PatientRecord]?.toString()
              );
            }
          });
        });

        const fieldOptions = Object.fromEntries(
          Object.entries(uniqueValues).map(([key, valueSet]) => [
            key,
            Array.from(valueSet),
          ])
        );
        setFieldOptions(fieldOptions);
        setSelectedValue(fieldOptions[selectedField][0]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const applyFilter = () => {
    if (selectedField && selectedValue) {
      const newFilters = { ...filters, [selectedField]: selectedValue };
      setFilters(newFilters);
      filterData(newFilters); // Apply filtering immediately after adding the new filter.
    }
  };

  const removeFilter = (field: string) => {
    const updatedFilters = { ...filters };
    delete updatedFilters[field];
    setFilters(updatedFilters);
    filterData(updatedFilters); // Re-filter the data after removing the filter.
  };

  const filterData = (activeFilters: { [key: string]: string }) => {
    let filteredData = patients;

    // Apply all filters.
    for (const [field, value] of Object.entries(activeFilters)) {
      filteredData = filteredData.filter((patient) => {
        const fieldValue = patient[field as keyof PatientRecord]
          ?.toString()
          .toLowerCase();
        return fieldValue === value.toLowerCase();
      });
    }

    console.log(filteredData);
    setFilteredPatients(filteredData);
  };

  return (
    <div className="p-5">
      <h2 className="text-xl py-2 pb-4 font-bold">Patients</h2>
      <div className="mb-4 flex gap-4 items-center">
        <Select onValueChange={setSelectedField} defaultValue={selectedField}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select field" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(fieldOptions).map((field) => (
              <SelectItem key={field} value={field}>
                {field.replace(/_/g, " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setSelectedValue} value={selectedValue}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select value" />
          </SelectTrigger>
          <SelectContent>
            {fieldOptions[selectedField]?.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={applyFilter}>Apply</Button>
      </div>
      <div className="mb-4 flex gap-2 flex-wrap">
        {Object.entries(filters).map(([field, value], index) => (
          <Badge
            key={index}
            onClick={() => removeFilter(field)}
            className="cursor-pointer"
          >
            {/* {field.replace(/_/g, " ")}: {value}{" "} */}
            <span className="ml-2">×</span>
          </Badge>
        ))}
      </div>
      <div className="mb-4 text-gray-600">
        {filteredPatients.length}{" "}
        {filteredPatients.length === 1 ? "patient" : "patients"} found
      </div>
      <Table className="text-sm w-full border-collapse border border-gray-200">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableCell className="px-4 py-2 font-bold">Patient ID</TableCell>
            <TableCell className="px-4 py-2 font-bold">Gender</TableCell>
            <TableCell className="px-4 py-2 font-bold">Age</TableCell>
            <TableCell className="px-4 py-2 font-bold">
              Hospital Admissions
            </TableCell>
            <TableCell className="px-4 py-2 font-bold">ICU Stays</TableCell>
            <TableCell className="px-4 py-2 font-bold">Insurance</TableCell>
            <TableCell className="px-4 py-2 font-bold">
              Marital Status
            </TableCell>
            <TableCell className="px-4 py-2 font-bold">Race</TableCell>
            <TableCell className="px-4 py-2 font-bold">
              Hospital Expire Flag 
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPatients.map((patient, index) => (
            <TableRow
              key={patient.subject_id}
              className="border-t border-gray-200"
              onClick={() => router.push(`/patients/${patient.subject_id}`)}
            >
              <TableCell className="px-4 py-2">{patient.subject_id}</TableCell>
              <TableCell className="px-4 py-2">{patient.gender}</TableCell>
              <TableCell className="px-4 py-2">{patient.anchor_age}</TableCell>
              <TableCell className="px-4 py-2">
                {patient.number_of_hospital_admission}
              </TableCell>
              <TableCell className="px-4 py-2">
                {patient.number_of_icu_stay}
              </TableCell>
              <TableCell className="px-4 py-2">{patient.insurance}</TableCell>
              <TableCell className="px-4 py-2">
                {patient.marital_status}
              </TableCell>
              <TableCell className="px-4 py-2">{patient.race}</TableCell>
              <TableCell className="px-4 py-2">
                {patient.hospital_expire_flag ? "Yes" : "No"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
