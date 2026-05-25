import { AnimatedSection } from "@/components/layout/animated-section";

type Heading = {
  title?: string | undefined;
  sub?: string | undefined;
};

export const Heading = ({ title, sub }: Heading) => {
  return (
    <AnimatedSection>
      <div className="flex flex-col gap-2 mb-4">
        <h1
          className="w-full text-[20px] leading-9 text-text-heading"
          style={{ fontFamily: "Gabarito" }}
        >
          {title}
        </h1>
        <p className="font-medium text-[15px] text-text-normal">{sub}</p>
      </div>
    </AnimatedSection>
  );
};

export const WorkHeading = ({ title, sub }: Heading) => {
  return (
    <AnimatedSection>
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="font-medium text-text-normal text-[20px]">{title}</h1>
        <p className="w-full font-mono leading-9 text-text-heading">{sub}</p>
      </div>
    </AnimatedSection>
  );
};
