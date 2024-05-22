import Image from "next/image";
import Timer from "./components/Timer";
import SettingsButton from "./components/SettingsButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-black p-10">
      <div className="text-white justify-between items-center text-5xl font-bold font-sans p-5 flex flex-row">
        <SettingsButton />
        <p className="inline mx-auto">Pomodoro</p>
      </div>
      <div className="flex w-full justify-center items-center p-20">
        <Timer />
      </div>
    </main>
  );
}
