"use client";

import { type ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Student = {
  id: string;
  name: string;
  score: number;
  course: string;
  progress: string;
  rank: string;
};

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: "Student",
  },
  {
    accessorKey: "score",
    header: "Score",
  },
  {
    accessorKey: "course",
    header: "Course",
  },
  {
    accessorKey: "progress",
    header: "Progress",
  },
  {
    accessorKey: "rank",
    header: "Rank",
  },
];
