import { useState, type CSSProperties } from "react"
import relaxed from "../assets/owl-relaxed.webp"
import hunter from "../assets/owl-hunter.webp"
import closed from "../assets/owl-closed.webp"

/** Calm at rest, focused on hover/focus or while busy, a blink while pressed. */
export type OwlEyes = "relaxed" | "hunter" | "closed"

const FACES: Record<OwlEyes, string> = { relaxed, hunter, closed }
const ALL: OwlEyes[] = ["relaxed", "hunter", "closed"]

/** The owl's head. All three faces are stacked so switching never waits for an image. */
export function Owl({ eyes = "relaxed", size = 56 }: { eyes?: OwlEyes; size?: number }) {
  return (
    <span aria-hidden="true" data-eyes={eyes} style={{ position: "relative", display: "inline-block", width: size, height: size }}>
      {ALL.map((e) => (
        <img
          key={e}
          src={FACES[e]}
          alt=""
          draggable={false}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", userSelect: "none", opacity: e === eyes ? 1 : 0 }}
        />
      ))}
    </span>
  )
}

const BUTTON: CSSProperties = {
  position: "fixed", right: 24, bottom: 24, width: 56, height: 56, padding: 0,
  border: 0, borderRadius: "50%", background: "transparent", cursor: "pointer",
}

/** Floating bottom-right launcher button with the owl's head.
 *  Only keyboard focus sets the focused eyes: in Chrome a mouse press also focuses the button and would hide the blink. */
export function OwlLauncher({ onOpen, busy = false, label = "Open assistant" }: { onOpen: () => void; busy?: boolean; label?: string }) {
  const [eyes, setEyes] = useState<OwlEyes>("relaxed")
  return (
    <button
      type="button"
      aria-label={label}
      style={BUTTON}
      onPointerEnter={() => setEyes("hunter")}
      onPointerLeave={() => setEyes("relaxed")}
      onPointerDown={() => setEyes("closed")}
      onFocus={(e) => { if (e.currentTarget.matches(":focus-visible")) setEyes("hunter") }}
      onBlur={() => setEyes("relaxed")}
      onClick={() => { setEyes("hunter"); onOpen() }}
    >
      <Owl eyes={busy ? "hunter" : eyes} />
    </button>
  )
}
