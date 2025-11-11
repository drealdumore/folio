import { AnimatedSection } from "@/components/layout/animated-section";

type Heading = {
  title?: string | undefined;
  sub?: string | undefined;
};

export const Heading = ({ title, sub }: Heading) => {
  return (
    <AnimatedSection>
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="lg:text-4xl font-semibold w-full font-mono text-2xl leading-9 text-text-heading">
          {title}
        </h1>
        <p className="font-medium text-text-normal">{sub}</p>
      </div>
    </AnimatedSection>
  );
};

export const WorkHeading = ({ title, sub }: Heading) => {
  return (
    <AnimatedSection>
      <div className="flex flex-col gap-2 mb-4">
        <p className="font-medium text-text-normal text-base lg:text-2xl font-instrumentSerif">
          {title}
        </p>
        <h1 className="lg:text-[40px] font-semibold w-full text-[25px] leading-9 text-text-heading">
          {sub}
        </h1>
      </div>
    </AnimatedSection>
  );
};
