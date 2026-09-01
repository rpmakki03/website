import type { Metadata } from "next";
import QuizScreen from "@/components/activities/QuizScreen";

export const metadata: Metadata = {
  title: "Quiz · Geeta Gyan Challenge — LearnGeeta",
  description: "The scored round of the Geeta Gyan Challenge.",
};

export default function Page() {
  return <QuizScreen />;
}
