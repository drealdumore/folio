"use client";

const Content = () => {
  const content = [
    "For over three years, I’ve been building everything from sleek landing pages to full-on enterprise platforms across Africa.",

    "I work with JavaScript, TypeScript, React Native, Next.js, and Node.js. These tools help me build fast, reliable apps for web and mobile.",

    "I love prototyping quickly, iterating often, and sweating the little details. If it doesn’t improve performance or the user experience, it probably doesn’t need to be there.",

    "Solving problems is my thing. Whether it's debugging a tricky algorithm or speeding up a sluggish app, I break things down and figure them out.",

    "Collaboration matters. I enjoy working closely with designers, devs, and clients to turn ideas into intuitive, well-built products, with a few jokes along the way.",

    "Outside of work, I run, swim, and dive into good books. It keeps me sharp and inspired.",

    "Tech moves fast, so I’m always learning. For me, growth isn’t optional, it’s part of the job.",
  ];

  return (
    <div className="flex-grow md:max-w-2xl font-light flex text-text-normal flex-col gap-2 md:gap-4 xl:text-[1.02rem] sm:text-[1.05rem]">
      <div className="flex flex-col gap-2 pt-2">
        <h1 className="text-[1.5rem] font-medium font-instrumentSerif text-text-heading">
          Fullstack Developer
        </h1>
        <h2 className=" font-[500] text-text-normal">Samuel Isah</h2>
      </div>

      <div className="xl:max-w-[35rem] sm:max-w-none xl:leading-[30px] sm:leading-[27px]">
        <p className="leading-[30px]">
          Hi there, I’m{" "}
          <span className="whitespace-nowrap cursor-pointer border w-max border-zinc-600 text-[13px] rounded-[6px] font-firacode py-[2px] px-[3px] transition-all duration-300 ease-in-out hover:bg-zinc-700 text-text-normal">
            Samuel
          </span>
          {"  "} a full-stack developer. who turns ideas into smooth
          digital experiences.
        </p>
      </div>

      {content.map((paragraph, index) => (
        <p className="leading-[30px]" key={index}>
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default Content;
