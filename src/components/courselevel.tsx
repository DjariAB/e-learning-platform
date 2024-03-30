import Image from "next/image";

function CourseLevel({
  level,
  additionalStyle,
}: {
  level: string;
  additionalStyle: string;
}) {
  return (
    <div
      className={`flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1 ${additionalStyle}`}
    >
      <Image
        src="/SVGs/Level_icon.svg"
        className="h-3 w-3"
        width={8}
        height={8}
        alt="level icon"
      />
      <p className="font-medium">{level}</p>
    </div>
  );
}
export default CourseLevel;
