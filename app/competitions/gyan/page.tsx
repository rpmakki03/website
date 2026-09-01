import type { Metadata } from "next";
import ActivityScreen from "@/components/activities/ActivityScreen";

export const metadata: Metadata = {
  title: "Geeta Gyan Challenge · Swarnim Varg — LearnGeeta",
  description: "50 Questions · 18 Chapters · One Golden Challenge — the global Bhagavad Geeta quiz.",
};

export default function Page() {
  return <ActivityScreen id="gyan" />;
}
