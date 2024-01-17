import { OpenGraphImage } from "@/components/og-image";
import { sharedMetadata } from "@/constants/shared-meta";
import { getBoldFont, getRegularFont } from "@/utils/fonts";

import { ImageResponse } from "next/og";

type sizeType = {
  width: number;
  height: number;
};

const alt = sharedMetadata.title;

const size: sizeType = {
  width: sharedMetadata.ogImage.width,
  height: sharedMetadata.ogImage.height,
};

const contentType = sharedMetadata.ogImage.type;

export async function GET() {
  const [regularFontData, boldFontData] = await Promise.all([
    getRegularFont(),
    getBoldFont(),
  ]);

  return new ImageResponse(
    (
      <OpenGraphImage
        title={sharedMetadata.name}
        description={sharedMetadata.og}
      />
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
