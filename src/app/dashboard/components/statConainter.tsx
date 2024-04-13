const StatContainer = ({
  statTitle,
  value,
}: {
  statTitle: string;
  value: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-2xl font-medium">{value}</p>
      <p className="text-md font-normal text-gray-400">{statTitle}</p>
    </div>
  );
};

export default StatContainer;
