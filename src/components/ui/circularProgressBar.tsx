const CircularProgress = ({
  percentage,
  statTitle,
}: {
  percentage: number;
  statTitle: string;
}) => {
  const width = 100;
  const radius = 40;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = (dashArray * (100 - percentage)) / 100;

  return (
    <>
      <div className="h-32 relative flex w-full flex-col items-center">
        <svg width={width} height={width} viewBox={`0 0 ${width} ${width}`}>
          <circle
            cx={width / 2}
            cy={width / 2}
            strokeWidth="8px"
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
            strokeWidth="8px"
            strokeLinecap="round"
            r={`${radius}`}
            className="
             fill-none stroke-blue-950"
            style={{ strokeDasharray: dashArray, strokeDashoffset: dashOffset }}
            transform={`rotate(-90 ${width / 2} ${width / 2})`}
          />
          <text
            x="50%"
            y="56%"
            textAnchor="middle"
            className="text-xl font-medium"
          >
            {percentage}%
          </text>
        </svg>
        <p className="absolute top-[100px] text-gray-400">{statTitle}</p>
      </div>
    </>
  );
};

export default CircularProgress;
