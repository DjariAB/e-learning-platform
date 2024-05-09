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
        <div className="flex min-w-36 items-center gap-4">
          {row.original.student.imgUrl ? (
            <img
              className="size-8  overflow-hidden rounded-full object-cover"
              src={row.original.student.imgUrl}
              alt="Student avatar image"
            />
          ) : (
            <div className="flex size-8 items-center justify-center rounded-full bg-black">
              <p className="text-xl font-semibold text-white">
                {row.original.student.studentName.charAt(0).toUpperCase()}
              </p>
            </div>
          )}

          <p>{row.original.student.studentName}</p>
        </div>
      );
    },
  },
  {
    cell({ row }) {
      return row.original.score + " pts";
    },
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
