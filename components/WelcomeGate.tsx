"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const AUDIO_SRC = "/assets/lagu-angkatan-bhramara-patria.mp3";
const LRC_SRC = "/assets/lagu-angkatan-bhramara-patria.lrc";
const STORAGE_KEY = "bp-gate-entered";
const TARGET_VOLUME = 0.7;

type LyricLine = { time: number; text: string };

function parseLrc(raw: string): LyricLine[] {
  const out: LyricLine[] = [];
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*\[([0-9:.]+)\]\s*(.*)$/);
    if (!m) continue;
    const parts = m[1].split(":").map(Number);
    let sec = 0;
    if (parts.length === 3) sec = parts[0] * 3600 + parts[1] * 60 + parts[2];
    else if (parts.length === 2) sec = parts[0] * 60 + parts[1];
    else sec = parts[0];
    const text = m[2].trim();
    if (text && !Number.isNaN(sec)) out.push({ time: sec, text });
  }
  return out.sort((a, b) => a.time - b.time);
}

function EqIcon() {
  return (
    <span
      style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 16 }}
      aria-hidden
    >
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="gate-eq"
          style={{
            width: 3,
            height: 16,
            borderRadius: 2,
            background: "#5E2329",
            transformOrigin: "bottom",
            animation: `eqBar 0.9s ease-in-out ${i * 0.15}s infinite`,
          }}
        />
      ))}
    </span>
  );
}

export default function WelcomeGate() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const lyricsRef = useRef<LyricLine[]>([]);
  const activeIdxRef = useRef<number>(-1);
  const progressRef = useRef<HTMLDivElement>(null);

  const [entered, setEntered] = useState(false);
  const [closing, setClosing] = useState(false);
  const [showControl, setShowControl] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [lyricsOpen, setLyricsOpen] = useState(true);
  const [activeIdx, setActiveIdx] = useState(-1);

  // Skip the splash if this session already entered (keeps music state on reload).
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") {
      setEntered(true);
      setShowControl(true);
    }
  }, []);

  // Load + parse the .lrc once.
  useEffect(() => {
    let alive = true;
    fetch(LRC_SRC, { cache: "no-store" })
      .then((r) => (r.ok ? r.text() : ""))
      .then((t) => {
        if (!alive) return;
        const parsed = parseLrc(t);
        lyricsRef.current = parsed;
        setLyrics(parsed);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  // Lock the page scroll while the splash covers the screen.
  useEffect(() => {
    if (entered) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [entered]);

  // Karaoke sync loop — runs only while the song plays.
  useEffect(() => {
    if (!playing) return;
    const audio = audioRef.current;
    if (!audio) return;

    const tick = () => {
      const lines = lyricsRef.current;
      const t = audio.currentTime;
      let idx = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].time <= t) idx = i;
        else break;
      }
      if (idx !== activeIdxRef.current) {
        activeIdxRef.current = idx;
        setActiveIdx(idx);
      }
      if (progressRef.current) {
        let p = 0;
        if (idx >= 0) {
          const start = lines[idx].time;
          const end =
            idx + 1 < lines.length
              ? lines[idx + 1].time
              : audio.duration || start + 4;
          p = end > start ? Math.min(1, (t - start) / (end - start)) : 0;
        }
        progressRef.current.style.width = `${p * 100}%`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  useEffect(() => {
    return () => {
      if (fadeRef.current) window.clearInterval(fadeRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function fadeInVolume() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    fadeRef.current = window.setInterval(() => {
      if (!audioRef.current) return;
      const next = Math.min(TARGET_VOLUME, audioRef.current.volume + 0.04);
      audioRef.current.volume = next;
      if (next >= TARGET_VOLUME && fadeRef.current) {
        window.clearInterval(fadeRef.current);
        fadeRef.current = null;
      }
    }, 90);
  }

  function handleEnter() {
    const audio = audioRef.current;
    if (audio) {
      audio
        .play()
        .then(() => {
          fadeInVolume();
          setStarted(true);
          setPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked — the floating control lets the user start it.
          setPlaying(false);
        });
    }
    sessionStorage.setItem(STORAGE_KEY, "1");
    setClosing(true);
  }

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio
        .play()
        .then(() => {
          setStarted(true);
          setPlaying(true);
        })
        .catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  const currentText = activeIdx >= 0 ? lyrics[activeIdx]?.text : null;
  const nextText = lyrics[activeIdx + 1]?.text ?? null;
  const showKaraoke = showControl && started && lyricsOpen && lyrics.length > 0;
  const showReopen = showControl && started && !lyricsOpen && lyrics.length > 0;

  return (
    <>
      {/* Rendered once at the layout level so playback survives page navigation. */}
      <audio ref={audioRef} src={AUDIO_SRC} loop preload="auto" />

      {!entered && (
        <div
          onAnimationEnd={(e) => {
            if (e.animationName === "gateOut") {
              setEntered(true);
              setShowControl(true);
            }
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            background:
              "radial-gradient(120% 120% at 50% 42%, #FEFCF8 0%, #FBF3E4 55%, #F6E9D2 100%)",
            animation: closing ? "gateOut 0.75s ease forwards" : "fadeIn 0.6s ease",
          }}
        >
          {/* Repeating motif-236 watermark, slowly drifting */}
          <div
            aria-hidden
            className="gate-drift"
            style={{
              position: "absolute",
              inset: "-260px",
              backgroundImage: "url(/assets/motif-236.png)",
              backgroundRepeat: "repeat",
              backgroundSize: "300px auto",
              opacity: 0.18,
              animation: "gateDrift 60s linear infinite",
            }}
          />

          {/* Soft cream spotlight so the pattern calms toward the center */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(58% 52% at 50% 48%, rgba(254,252,248,0.9) 0%, rgba(254,250,242,0.55) 40%, rgba(254,250,242,0) 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Center stack: logo + enter button only */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0 24px",
            }}
          >
            {/* Soft halo behind the logo */}
            <div
              className="gate-halo"
              style={{
                position: "absolute",
                top: "40%",
                left: "50%",
                width: 520,
                height: 520,
                maxWidth: "82vw",
                maxHeight: "82vw",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(233,169,60,0.28) 0%, rgba(233,169,60,0.09) 42%, rgba(233,169,60,0) 70%)",
                transform: "translate(-50%,-50%)",
                animation: "haloPulse 6s ease-in-out infinite",
                pointerEvents: "none",
              }}
            />

            <div className="gate-breathe" style={{ position: "relative", animation: "breathe 4.5s ease-in-out infinite" }}>
              <Image
                src="/assets/logo-bhramara-patria-colored.png"
                alt="PK-236 Bhramara Patria"
                width={2084}
                height={1250}
                preload
                style={{
                  width: "min(440px, 78vw)",
                  height: "auto",
                  filter: "drop-shadow(0 18px 40px rgba(94,35,41,0.18))",
                }}
              />
            </div>

            {/* Enter button */}
            <button
              type="button"
              onClick={handleEnter}
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: "pointer",
                marginTop: 44,
                padding: "16px 52px",
                borderRadius: 100,
                fontFamily: "inherit",
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: ".04em",
                color: "#5E2329",
                background: "linear-gradient(135deg, #FDAF40 0%, #EB8C56 100%)",
                boxShadow: "0 14px 30px rgba(233,169,60,0.42)",
                transition: "transform .18s ease, box-shadow .18s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 18px 38px rgba(233,169,60,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 14px 30px rgba(233,169,60,0.42)";
              }}
            >
              {/* expanding ring */}
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 100,
                  border: "2px solid #FDAF40",
                  animation: "btnRing 2.4s ease-out infinite",
                  pointerEvents: "none",
                }}
              />
              Masuk
            </button>
          </div>
        </div>
      )}

      {/* Floating control cluster: karaoke card + play/pause */}
      {showControl && (
        <div
          style={{
            position: "fixed",
            right: 20,
            bottom: 20,
            zIndex: 9998,
            display: "flex",
            alignItems: "flex-end",
            gap: 12,
            maxWidth: "calc(100vw - 40px)",
          }}
        >
          {showKaraoke && (
            <div
              style={{
                width: "min(320px, calc(100vw - 96px))",
                background: "rgba(255,253,248,0.94)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(233,169,60,0.4)",
                borderRadius: 18,
                padding: "13px 16px 15px",
                boxShadow: "0 14px 34px rgba(94,35,41,0.16)",
                animation: "controlIn 0.4s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 9,
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 10.5,
                    fontWeight: 800,
                    letterSpacing: ".16em",
                    color: "#C06A2A",
                  }}
                >
                  {playing ? <EqIcon /> : <span aria-hidden>♪</span>}
                  LIRIK LAGU
                </span>
                <button
                  type="button"
                  onClick={() => setLyricsOpen(false)}
                  aria-label="Sembunyikan lirik"
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "#A07A5E",
                    fontSize: 16,
                    lineHeight: 1,
                    padding: 2,
                  }}
                >
                  &times;
                </button>
              </div>

              <div style={{ minHeight: 44 }}>
                <div
                  key={activeIdx}
                  className="font-display"
                  style={{
                    fontSize: 16.5,
                    fontWeight: 700,
                    lineHeight: 1.32,
                    color: currentText ? "#8E343A" : "#B08A6C",
                    animation: "lyricIn 0.4s ease",
                  }}
                >
                  {currentText ?? "♪ ♪ ♪"}
                </div>
                {nextText && (
                  <div
                    style={{
                      fontSize: 13,
                      lineHeight: 1.35,
                      color: "#A78B77",
                      marginTop: 5,
                    }}
                  >
                    {nextText}
                  </div>
                )}
              </div>

              {/* progress toward next line */}
              <div
                style={{
                  marginTop: 11,
                  height: 3,
                  borderRadius: 3,
                  background: "rgba(233,169,60,0.22)",
                  overflow: "hidden",
                }}
              >
                <div
                  ref={progressRef}
                  style={{
                    height: "100%",
                    width: "0%",
                    borderRadius: 3,
                    background: "linear-gradient(90deg, #FDAF40, #EB8C56)",
                  }}
                />
              </div>
            </div>
          )}

          {showReopen && (
            <button
              type="button"
              onClick={() => setLyricsOpen(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                height: 40,
                padding: "0 15px",
                borderRadius: 100,
                border: "1px solid rgba(233,169,60,0.5)",
                background: "rgba(255,253,248,0.94)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 12.5,
                fontWeight: 800,
                letterSpacing: ".04em",
                color: "#8E343A",
                boxShadow: "0 10px 24px rgba(94,35,41,0.14)",
                animation: "controlIn 0.4s ease",
              }}
            >
              <span aria-hidden>♪</span> Lirik
            </button>
          )}

          <button
            type="button"
            onClick={toggleMusic}
            aria-label={playing ? "Jeda lagu angkatan" : "Putar lagu angkatan"}
            title={playing ? "Jeda lagu" : "Putar lagu"}
            style={{
              flexShrink: 0,
              width: 52,
              height: 52,
              borderRadius: "50%",
              border: "1px solid rgba(233,169,60,0.5)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #FDAF40 0%, #EB8C56 100%)",
              boxShadow: "0 10px 24px rgba(94,35,41,0.28)",
              animation: "controlIn 0.5s ease",
            }}
          >
            {playing ? (
              <EqIcon />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#5E2329" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      )}
    </>
  );
}
