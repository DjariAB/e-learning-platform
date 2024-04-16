const StatContainer = ({
  statTitle,
  value,
  className,
}: {
  statTitle: string;
  value: string;
  className?: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className={`${className} text-2xl font-medium`}>{value}</p>
      <p className="text-md font-normal text-muted-foreground">{statTitle}</p>
    </div>
  );
};

export default StatContainer;
