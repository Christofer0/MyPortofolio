import { useEffect, useRef } from "react";

export default function SnowBackground({ theme }: { theme: "light" | "dark" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // ❄️ JUMLAH SALJU DIKURANGI (TIPIS)
    const flakes = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.5, // kecil & lembut
      s: Math.random() * 0.6 + 0.2, // jatuh pelan
      o: Math.random() * 0.4 + 0.3, // opacity rendah
    }));

    const color = theme === "dark" ? "#ffffff" : "#cbd5e1";

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      ctx.beginPath();

      flakes.forEach((f) => {
        ctx.globalAlpha = f.o;
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        f.y += f.s;

        // sedikit gerakan ke samping (natural)
        f.x += Math.sin(f.y * 0.01) * 0.2;

        if (f.y > height) {
          f.y = -5;
          f.x = Math.random() * width;
        }
      });

      ctx.fill();
      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
