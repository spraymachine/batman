import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?<>/';

export default function TextScramble({ text, trigger = true, speed = 30, className = '', style = {} }) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!trigger) {
      setDisplay(text);
      return;
    }

    let iteration = 0;
    clearInterval(frameRef.current);

    frameRef.current = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iteration) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );
      iteration += 1 / 2;
      if (iteration >= text.length) {
        clearInterval(frameRef.current);
        setDisplay(text);
      }
    }, speed);

    return () => clearInterval(frameRef.current);
  }, [text, trigger, speed]);

  return <span className={className} style={style}>{display}</span>;
}
