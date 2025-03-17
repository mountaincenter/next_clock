"use client";

import { useRef, useEffect } from "react";

type PipProps = {
  time: string; // 親 (page.tsx) から受け取る最新の時刻
  isPipActive: boolean; // 親の isPip
  setIsPipActive: (active: boolean) => void; // 親の isPipActive を更新するコールバック
};

/**
 * 画面上には時計をほぼ表示せず、PiP 内にのみ時計を表示
 * - 親の setIsPipActive を呼び出して、PiP 状態を制御させる
 */
export default function PipComponent({
  time,
  isPipActive,
  setIsPipActive,
}: PipProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas -> Video -> PiP
  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas の映像を Video に転送
    const stream = canvas.captureStream();
    video.srcObject = stream;
    video.muted = true; // 自動再生を通しやすくする
    video.play().catch((err) => {
      console.error("video.play() failed:", err);
    });

    // 毎フレーム Canvas に時刻を描画
    const drawClock = () => {
      const w = canvas.width;
      const h = canvas.height;

      // 背景
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, w, h);

      // 文字：白
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "bold 80px Helvetica";
      ctx.fillText(time, w / 2, h / 2);

      requestAnimationFrame(drawClock);
    };
    drawClock(); // レンダリング開始

    // PiP イベント監視して、親へ通知
    const handleEnterPip = () => {
      setIsPipActive(true);
    };
    const handleLeavePip = () => {
      setIsPipActive(false);
    };

    video.addEventListener("enterpictureinpicture", handleEnterPip);
    video.addEventListener("leavepictureinpicture", handleLeavePip);

    // クリーンアップ
    return () => {
      video.removeEventListener("enterpictureinpicture", handleEnterPip);
      video.removeEventListener("leavepictureinpicture", handleLeavePip);
    };
  }, [time, setIsPipActive]);

  return (
    <div>
      {/**
       * PiP に入っているかどうかは親で管理しているため、
       * ここでは isPipActive の状態を一切持たず、
       * テキスト表示なども全部「親で制御する」か、ここでフラグを受け取るかに応じて自由に。
       *
       * 今回は例として「PiPComponent」は PiP 用のキャンバスだけ表示し、
       * 画面上のメッセージが必要なら、親で isPipActive を見て切り替える。
       */}

      {/* PiP 用 Canvas & Video は非表示 */}
      <canvas ref={canvasRef} width={800} height={400} className="hidden" />
      <video ref={videoRef} className="hidden" playsInline autoPlay />
    </div>
  );
}
