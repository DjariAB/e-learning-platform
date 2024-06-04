function InstructorCard({
  name,
  image,
  category,
  children,
}: {
  name: string;
  image: string;
  category: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4 overflow-hidden rounded-3xl  border border-black lg:w-1/3">
      <img
        src={image}
        className="h-72 w-full object-cover"
        alt="Instructor image"
      />
      <div className="space-y-4 px-8 pb-6 pt-4">
        <div>
          <h3 className="text-xl font-bold text-inherit">{name}</h3>
          <p className="font-light">{category}</p>
        </div>
        <p className="text-xl font-[300] tracking-wide">{children}</p>
      </div>
    </div>
  );
}
export default InstructorCard;
