"use client";

import { type ColumnDef } from "@tanstack/react-table";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type studentCell = { imgUrl: string; studentName: string };
export type Student = {
  id: string;
  student: studentCell;
  score: number;
  course: string;
  progress: string;
  rank: string;
};

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "student",
    header: "Student",
    cell({ row }) {
      return (
        <div className="flex items-center gap-4">
          <img
            className="size-8 overflow-hidden rounded-full object-cover"
            src={row.original.student.imgUrl}
            alt="Student avatar image"
          />

          <p>{row.original.student.studentName}</p>
        </div>
      );
    },
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
