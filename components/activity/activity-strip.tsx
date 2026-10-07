// components/activity-strip.tsx  (server component: fetches, then hands data to the client)
import ActivityStripClient, { type Day } from "./activity-strip-client";

async function getContributions(username: string): Promise<Day[] | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 60 * 60 * 12 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data.contributions) ? data.contributions : null;
  } catch {
    return null;
  }
}

export default async function ActivityStrip({
  username = "drealdumore",
  inline = false,
}: {
  username?: string;
  inline?: boolean;
}) {
  const days = await getContributions(username);
  if (!days?.length) return null;
  return <ActivityStripClient days={days} inline={inline} />;
}
