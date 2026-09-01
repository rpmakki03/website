import type { Metadata } from "next";
import CompetitionsHub from "@/components/CompetitionsHub";

export const metadata: Metadata = {
  title: "Competitions · Swarnim Varg — LearnGeeta Golden Batch 50",
  description:
    "All five Swarnim Varg competitions — Geeta Chitrakala, Geeta Swar, Geeta Gyan Challenge, Geeta Expression and Vivechan Reel.",
};

export default function Page() {
  return <CompetitionsHub />;
}
