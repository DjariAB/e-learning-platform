import { StarIcon } from "@heroicons/react/24/solid";

const CourseRow = ({
  courseImage,
  courseTitle,
  courseTag,
  courseRating,
}: {
  courseImage: string;
  courseTitle: string;
  courseTag: string;
  courseRating: string;
}) => {
  return (
    <div className="flex w-full items-center gap-3">
      <img
        className="size-16 rounded-md"
        src={courseImage}
        alt="course Image"
      />
      <div className="flex grow flex-col ">
        <p className="text-lg font-normal">{courseTitle}</p>
        <div className="text-md flex justify-between">
          <p className="text-sm font-light text-gray-400 ">{courseTag}</p>
          <div className="flex items-center gap-1">
            <StarIcon className="size-3 text-[#ffa700]" />
            <p className="text-xs font-medium">{courseRating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRow;
