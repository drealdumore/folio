import React from "react";
import { JSX, SVGProps } from "react";

export function LINK(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-link2 "
      {...props}
    >
      <path d="M9 17H7A5 5 0 0 1 7 7h2"></path>
      <path d="M15 7h2a5 5 0 1 1 0 10h-2"></path>
      <line x1="8" x2="16" y1="12" y2="12"></line>
    </svg>
  );
}

export function FOLDER(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16 12C11.5817 12 8 15.5817 8 20V72C8 76.4183 11.5817 80 16 80H80C84.4183 80 88 76.4183 88 72V32C88 27.5817 84.4183 24 80 24H50.1407L44.5157 15.5624C43.0319 13.3368 40.5341 12 37.8593 12H16Z"
        fill="#dcdcdc"
      ></path>
    </svg>
  );
}

export function X(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-4"
      {...props}
      width="44"
      height="44"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#000000"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}

export function Dice(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className=" size-4"
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
      <path d="M16 8h.01"></path>
      <path d="M8 8h.01"></path>
      <path d="M8 16h.01"></path>
      <path d="M16 16h.01"></path>
    </svg>
  );
}
