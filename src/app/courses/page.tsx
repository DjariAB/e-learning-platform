import { logoutAction } from "@/actions/auth";
import CourseCard from "@/components/courseCard";
import { Button } from "@/components/ui/button";

const Courses = async () => {
  return (
    <>
      <CourseCard />
      <form action={logoutAction}>
        <Button type="submit">logout</Button>
      </form>
    </>
  );
};

export default Courses;
