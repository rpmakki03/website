import type { Metadata } from "next";
import { Suspense } from "react";
import QuizScreen from "@/components/activities/QuizScreen";

export const metadata: Metadata = {
  title: "Quiz · Geeta Gyan Challenge — LearnGeeta",
  description: "Practice Zone and Official Round of the Geeta Gyan Challenge.",
};

export default function Page() {
  return (
    <Suspense>
      <QuizScreen />
    </Suspense>
  );
}
