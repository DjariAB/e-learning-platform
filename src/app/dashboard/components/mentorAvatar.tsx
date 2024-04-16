import { ChevronRightIcon } from "@heroicons/react/24/outline";

const MentorAvatar = ({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image?: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      {image ? (
        <img className="size-9 rounded-full object-cover" src={image} />
      ) : (
        <div className="flex size-9 items-center justify-center rounded-full bg-black">
          <p className="text-xl font-semibold text-white">
            {name.charAt(0).toUpperCase()}
          </p>
        </div>
      )}

      <div className="flex flex-col items-start pl-1">
        <h3 className="text-[14px] font-semibold leading-tight">{name}</h3>
        <p className="text-sm font-light leading-none text-gray-500">{email}</p>
      </div>
      <ChevronRightIcon className="size-4" />
    </div>
  );
};

export default MentorAvatar;
