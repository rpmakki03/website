import type { Metadata } from "next";
import ActivityScreen from "@/components/activities/ActivityScreen";

export const metadata: Metadata = {
  title: "Geeta Chitrakala · Swarnim Varg — LearnGeeta",
  description: "Global Drawing & Painting Competition — express the wisdom of the Geeta through your own original art.",
};

export default function Page() {
  return <ActivityScreen id="chitrakala" />;
}
