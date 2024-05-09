/* eslint-disable @next/next/no-img-element */
const HeroSec = ({ className }: { className?: string }) => {
  return (
    <>
      <div
        className={`flex h-72 items-center rounded-[38px] bg-[#072E6A] px-7 pt-5 text-white drop-shadow-[-8px_10px_0px_rgba(0,0,0,1)] ${className}`}
      >
        <div className="grow">
          <h1 className="pb-3 text-5xl font-bold">
            Explore Limitless Learning <br />
            Opportunities
          </h1>
          <p className="text-2xl font-normal">
            Our curated courses designed to empower you on your learning
            journey. <br /> Whether you&apos;re a beginner or a seasoned
            learner, there&apos;s something here <br />
            to spark your curiosity and fuel your growth.
          </p>
        </div>
        <img
          src="/SVGs/Hero image frame.png"
          alt=""
          className="h-[100%] pr-12 pt-4"
        />
      </div>
    </>
  );
};

export default HeroSec;
