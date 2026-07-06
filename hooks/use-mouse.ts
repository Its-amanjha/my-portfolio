import { useState, useEffect } from 'react';

export function useMouse() {
  const [state, setState] = useState<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

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

  return [state] as const;
}
