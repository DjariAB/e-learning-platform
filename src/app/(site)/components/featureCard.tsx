import {
  BeakerIcon,
  CpuChipIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

function FeatureCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative space-y-4 rounded-3xl border border-white p-8">
      <div className="absolute -right-4 -top-8 rounded-full bg-[#131313] p-3">
        {title === "High-Quality Content" ? (
          <BeakerIcon className="size-16 stroke-[0.7]" />
        ) : title === "Talented Tutors" ? (
          <UserGroupIcon className="size-16 stroke-[0.7]" />
        ) : (
          <CpuChipIcon className="size-16 stroke-[0.7]" />
        )}
      </div>
      <h3 className="text-xl font-medium text-inherit">{title}</h3>
      <p className="text-lg font-light text-inherit">{children}</p>
    </div>
  );
}
export default FeatureCard;
