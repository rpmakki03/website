import type { Metadata } from "next";
import ActivityScreen from "@/components/activities/ActivityScreen";

export const metadata: Metadata = {
  title: "Geeta Expression · Swarnim Varg — LearnGeeta",
  description: "60-sec Personal Reflection Challenge — one Geeta thought, one real reflection, one Golden Batch invitation.",
};

export default function Page() {
  return <ActivityScreen id="expression" />;
}
