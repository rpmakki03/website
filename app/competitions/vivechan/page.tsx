import type { Metadata } from "next";
import ActivityScreen from "@/components/activities/ActivityScreen";

export const metadata: Metadata = {
  title: "Vivechan Reel · Swarnim Varg — LearnGeeta",
  description: "Creative Edit Challenge — craft a 30–60 second reel from the approved Vivechan Timestamp Bank.",
};

export default function Page() {
  return <ActivityScreen id="vivechan" />;
}
