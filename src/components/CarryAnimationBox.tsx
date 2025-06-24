import { useEffect, useState } from 'react';

interface CarryAnimationBoxProps {
  from: DOMRect;
  to: DOMRect;
  value: number;
  duration?: number;
  onAnimationEnd: () => void;
}

export default function CarryAnimationBox({
  from,
  to,
  value,
  duration,
  onAnimationEnd,
}: CarryAnimationBoxProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setActive(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        left: from.left,
        top: from.top,
        width: from.width,
        height: from.height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        fontSize:'8vh',
        fontWeight:'bolder',
        transition: `transform ${duration}ms ease-in`,
        transform: active
          ? `translate(${to.left - from.left}px, ${to.top - from.top}px)`
          : 'translate(0px, 0px)',
        zIndex: 1000,
      }}
      onTransitionEnd={onAnimationEnd}
    >
      {value}
    </div>
  );
}
