import type { Metadata } from "next";
import ActivityScreen from "@/components/activities/ActivityScreen";

export const metadata: Metadata = {
  title: "Geeta Swar · Swarnim Varg — LearnGeeta",
  description: "Shloka · Meaning · Life Application Challenge — recite one of the Geeta's 700 shlokas as an Instagram Reel.",
};

export default function Page() {
  return <ActivityScreen id="swar" />;
}
