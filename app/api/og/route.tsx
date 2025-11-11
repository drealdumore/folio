// Use the Edge runtime for ImageResponse
export const runtime = "edge";

import { ImageResponse } from "next/og";

type sizeType = {
  width: number;
  height: number;
};

const alt = "Samuel Isah | Full-Stack Developer & Mobile App Creator";

const size: sizeType = {
  width: 1200,
  height: 630,
};

const contentType = "image/png";

export async function GET() {
  const [regularFontData, boldFontData] = await Promise.all([
    fetch(
      new URL("../../../public/fonts/Geist-Regular.otf", import.meta.url)
    ).then((r) => r.arrayBuffer()),
    fetch(
      new URL("../../../public/fonts/Geist-Medium.otf", import.meta.url)
    ).then((r) => r.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            height: "100%",
            width: "100%",
            backgroundImage:
              "linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <span
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            position: "absolute",
            bottom: 100,
            left: 60,
            width: "80%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span
              style={{
                fontSize: "4.75rem",
                lineHeight: 1,
                fontWeight: 600,
              }}
            >
              Samuel Isah
            </span>
          </div>
          <span
            style={{
              fontSize: "2.5rem",
              lineHeight: "3rem",
              marginTop: "1rem",
            }}
          >
            Full-Stack Web and Mobile Developer creating innovative applications
            with modern technologies.
          </span>
        </span>
      </div>
    ),
    {
      width: size.width,
      height: size.height,
      fonts: [
        {
          name: "Geist Sans",
          data: regularFontData,
          style: "normal",
          weight: 400,
        },
        {
          name: "Geist Sans",
          data: boldFontData,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}

// was working on a project that needed to generate Open Graph images dynamically using Next.js and Puppeteer, but I decided to use the ImageResponse API instead for better performance and simplicity. and then i recalled that i have written something like it before. finally found it.
