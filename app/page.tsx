"use client";

import { useState, useEffect } from "react";
import PipComponent from "./TimeDisplay/PictureInPicture";
import TimeDisplay from "./TimeDisplay/TimeDisplay";
import SlackButton from "./Button/SlackButton";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

export default function Home() {
  // 親コンポーネントで「時刻」と「日付」、そして isPipActive を一元管理
  const [time, setTime] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [isPipActive, setIsPipActive] = useState(false);

  // 時刻・日付を1秒ごとに更新
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(format(now, "HH:mm:ss"));
      setDateStr(format(now, "yyyy年MM月dd日(EEE)", { locale: ja }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/*
          常に <PipComponent> をマウントしておき、
          PiP イベント発火で isPipActive が true/false に切り替わるようにする
        */}
        <PipComponent time={time} setIsPipActive={setIsPipActive} />

        {/*
          isPipActive が false のときだけ通常の時計表示を出す
          (PiP 中は消したいなど、自由に制御可能)
        */}
        {!isPipActive ? (
          <TimeDisplay time={time} dateStr={dateStr} />
        ) : (
          <div className="text-xl">
            ピクチャー イン ピクチャーで表示しています
          </div>
        )}
        <SlackButton message="Hello World" />
      </main>
    </div>
  );
}
