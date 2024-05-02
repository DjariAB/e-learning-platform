import BarChartStat from "../components/barChart";
import StatCard from "../components/statCard";
import CircularChart from "../components/circularChart";

export default function Page() {
  return (
    <>
      <div className="grid gap-5 px-4 py-2 lg:grid-cols-3  lg:p-0 lg:pr-5">
        <StatCard
          title="Total Students"
          stat={"35" + " k"}
          description="Total enrolled students in all your courses"
        />
        <StatCard
          title="Overall Completion time"
          stat={"54" + " Pts"}
          description="Your students score 54 points on average"
        />
        <StatCard
          title="Total Students"
          stat="23 days"
          description="Your students takes 23 days to complete one of your courses"
        />
        <BarChartStat
          title="Students Per Course"
          stat="35 K"
          description="The bar chart illustrates the distribution of your students across your courses"
          className="row-span-2 lg:col-span-2"
        />
        <CircularChart
          stat={65}
          title="Overall Completion"
          description="The chart illustrates the overall completion percentage of your courses
among students"
        />
      </div>
    </>
  );
}
