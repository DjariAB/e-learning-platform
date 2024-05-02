export default function StatCard({
  title,
  stat,
  description,
  className,
}: {
  title: string;
  stat: string;
  description: string;
  className?: string;
}) {
  return (
    <>
      <div
        className={`flex flex-col gap-4 rounded-2xl border px-6 py-5 ${className}`}
      >
        <p className="text-2xl font-medium">{title}</p>
        <p className="pl-3 text-5xl font-medium text-mainblue">{stat}</p>
        <p className="text-lg font-light leading-5 text-gray-500">
          {description}
        </p>
      </div>
    </>
  );
}
