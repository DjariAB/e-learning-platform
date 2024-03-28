/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Anek_Latin } from "next/font/google";

const anekLatin = Anek_Latin({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-anek-latin",
});

const CourseCard = ({
  title,
  educatorName,
  level,
  imageUrl,
}: {
  title: string;
  educatorName: string;
  level: string;
  imageUrl: string;
}) => {
  return (
    <>
      <div
        className={`${anekLatin.className}  flex h-[385px] min-w-[350px] max-w-[350px]  flex-col gap-3 rounded-[35px] bg-white p-4 transition duration-150 ease-in  hover:-translate-y-2 hover:translate-x-2 hover:drop-shadow-card`}
      >
        <div className="relative h-[260px] w-[100%]">
          <img
            src={imageUrl}
            alt="Course image"
            className="size-auto h-full  rounded-[20px] object-cover"
          />
          <div className="absolute bottom-4 left-3 flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1 ">
            <Image
              src="/SVGs/Level_icon.svg"
              className="h-3 w-3"
              width={8}
              height={8}
              alt="level icon"
            />
            <p>{level}</p>
          </div>
        </div>
        <div className="font-m flex flex-col gap-2 font-medium">
          <p className="text-2xl/6"> {title} </p>

          <div className="flex justify-between">
            <p className="font-normal">{educatorName}</p>
            <p>20%</p>
          </div>
          <Progress value={20} />
        </div>
      </div>
    </>
  );
};

export default CourseCard;
