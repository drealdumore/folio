type Heading = {
  title?: string | undefined;
  sub?: string | undefined;
};


export const Heading = ({ title, sub }: Heading) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <h1 className="lg:text-[40px] font-semibold w-full font-cal text-[25px] leading-9 text-text-heading">
        {title}
      </h1>
      <p className="font-medium text-text-normal">{sub}</p>
    </div>
  );
};



export const WorkHeading = ({ title, sub }: Heading) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <h1 className="font-medium text-lg text-text-normal text-[16px] lg:text-[25px] font-instrumentSerif">
        {title}
      </h1>
      <p className="lg:text-[40px] font-semibold w-full font-firacode text-[25px] leading-9 text-text-heading">
        {sub}
      </p>
    </div>
  );
};
