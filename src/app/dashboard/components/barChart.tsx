"use client";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
const data = [
  {
    course: "Mathematics",
    students: 25,
  },
  {
    course: "English",
    students: 30,
  },
  {
    course: "History",
    students: 20,
  },
  {
    course: "Physics",
    students: 15,
  },
  {
    course: "CS",
    students: 35,
  },
  {
    course: "Biology",
    students: 18,
  },
  {
    course: "Chemistry",
    students: 22,
  },
  {
    course: "Art",
    students: 28,
  },
  {
    course: "Music",
    students: 12,
  },
  {
    course: "Physical Ed",
    students: 40,
  },
];
export default function BarChartStat({
  // data,
  title,
  description,
  className,
}: {
  // data?: {
  //   course: string,
  //   students: number,
  // },
  title: string;
  stat: string;
  description: string;
  className?: string;
}) {
  return (
    <>
      <div
        className={`flex flex-col rounded-2xl border pb-3 pt-5 px-1 lg:px-6 ${className}`}
      >
        <div className="px-5 lg:px-0">
          <p className="pb-1 text-2xl font-medium leading-6">{title}</p>
          <p className="pb-4 pt-1 text-lg font-light leading-5 text-gray-500">
            {description}
          </p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="course"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Bar dataKey="students" fill="#072E69" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
