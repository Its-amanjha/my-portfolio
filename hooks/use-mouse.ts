import { useState, useEffect, useRef } from 'react';

export function useMouse<T extends HTMLElement = HTMLDivElement>() {
  const [state, setState] = useState<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  const ref = useRef<T>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setState({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return [state, ref] as const;
}
