import Image from "next/image";
import { BlinkPage } from "./components/BlinkPage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Look at this Blink!
      <BlinkPage />
    </main>
  );
}
