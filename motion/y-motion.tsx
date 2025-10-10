import React from "react";

const Motion = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="animate-in fade-in duration-300">
      {children}
    </div>
  );
};

export default Motion;
