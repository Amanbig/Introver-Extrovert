"use client"

import {useState, useEffect} from "react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import axios from "axios"
import { Badge } from "../ui/badge"

export type InputData = {
    Time_spent_Alone: number	
    Stage_fear: boolean
    Social_event_attendance	:number
    Going_outside: number	
    Drained_after_socializing: boolean
    Friends_circle_size:number
    Post_frequency: number
    Personality: string
}

export default function DataTable() {
  const [page, setPage] = useState<number>(1);
  const [dataset, setDataset] = useState<InputData[]>([]);

  async function fetchDataset() {
    const response = await axios.get(`/api/data?page=${page}&size=100`);
    if (!response) {
      throw new Error("Failed to fetch dataset");
    }
    console.log(response.data);
    const data: InputData[] = await response.data.data;
    setDataset((prev) => [...prev, ...data]);
  }

  useEffect(() => {
    fetchDataset();
  }, [page]);

  return (
    <>
      <Badge className="text-sm mb-5">
        This is the dataset used for training model
      </Badge>
      <Table>
        {/* <TableCaption>This is the dataset on which its trained.</TableCaption> */}
        <TableHeader className="dark:border-b-white border-b-black border-b-2">
          <TableRow>
            <TableHead className="text-left">Time Spent Alone</TableHead>
            <TableHead className="text-left">Stage Fear</TableHead>
            <TableHead className="text-left">Social Event Attendance</TableHead>
            <TableHead className="text-left">Going Outside</TableHead>
            <TableHead className="text-left">Drained_after_socializing</TableHead>
            <TableHead className="text-left">Friends Circle Size</TableHead>
            <TableHead className="text-left">Post Frequency</TableHead>
            <TableHead className="text-left">Personality</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataset.map((data,index) => (
            <TableRow key={`${index}`}>
              <TableCell className="text-left">{data.Time_spent_Alone}</TableCell>
              <TableCell className="text-left">{data.Stage_fear}</TableCell>
              <TableCell className="text-left">{data.Social_event_attendance}</TableCell>
              <TableCell className="text-left">{data.Going_outside}</TableCell>
              <TableCell className="text-left">{data.Drained_after_socializing}</TableCell>
              <TableCell className="text-left">{data.Friends_circle_size}</TableCell>
              <TableCell className="text-left">{data.Post_frequency}</TableCell>
              <TableCell className="text-left">{data.Personality}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="w-full justify-center text-center pt-4">
        <Button onClick={() => setPage((prev) => prev + 1)}>Load More</Button>
      </div>
    </>
  );
}