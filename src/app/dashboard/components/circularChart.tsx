const CircularChart = ({
  stat,
  title,
  description,
}: {
  stat: number;
  title: string;
  description: string;
}) => {
  const width = 300;
  const radius = 100;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = (dashArray * (100 - stat)) / 100;

  return (
    <>
      <div className="row-span-2 flex flex-col gap-4 rounded-2xl border px-6 py-5">
        <div>
          <p className="text-2xl font-medium">{title}</p>
          <p className="text-lg font-light leading-5 text-gray-500">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center">
          <svg width={width} height={width} viewBox={`0 0 ${width} ${width}`}>
            <circle
              cx={width / 2}
              cy={width / 2}
              strokeWidth="16px"
              r={`${radius}`}
              className="
              fill-none stroke-gray-200"
              style={{
                strokeDasharray: dashArray,
              }}
            />
            <circle
              cx={width / 2}
              cy={width / 2}
              strokeWidth="16px"
              strokeLinecap="round"
              r={`${radius}`}
              className="
               fill-none stroke-blue-950"
              style={{
                strokeDasharray: dashArray,
                strokeDashoffset: dashOffset,
              }}
              transform={`rotate(-90 ${width / 2} ${width / 2})`}
            />
          </svg>
          <div className="absolute top-[120px] flex flex-col items-center gap-1">
            <p className="text-5xl font-medium">{stat}%</p>
            <p className="font-thin text-gray-400">{title}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CircularChart;
