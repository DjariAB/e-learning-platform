import StatCard from "../dashboard/components/statCard";
import styles from "@/styles/main.module.css";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="pl-4 text-3xl font-medium">Learning Center</h2>
      <div className={`grid  grid-cols-5 grid-rows-1 gap-4 `}>
        <div
          className={`col-span-2 space-y-2 p-6 ${styles.gradientBg} rounded-xl bg-cover text-white`}
        >
          <h1 className="text-3xl font-bold">Welcome back, Messi</h1>
          <p className="text-3xl font-thin">
            Welcome to your Learning Center! Let&apos;s <br /> learn together
          </p>
        </div>
        <StatCard
          className="col-span-1"
          title="Completed courses"
          stat="2"
          description="Out of 5 enrolled courses"
        />
        <StatCard
          className="col-span-1"
          title="Completed courses"
          stat="2"
          description="Out of 5 enrolled courses"
        />
        <StatCard
          className="col-span-1"
          title="Completed courses"
          stat="2"
          description="Out of 5 enrolled courses"
        />
      </div>
      <h3 className="text-3xl font-medium ">Enrolled courses</h3>
      <div className="grid grid-cols-2 gap-2"></div>
    </div>
  );
}
