import { useEffect, useState } from 'react';
/**
 * @author Only use in client component
 */
export function useBreakpoint(width = 768) {
  const mq = window.matchMedia(`(min-width: ${width}px)`);
  const [mqMatches, setMqMatches] = useState(mq.matches);
  const updateMqMatches = () => {
    setMqMatches(mq.matches);
  };
  useEffect(() => {
    mq.addEventListener('change', updateMqMatches, false);
    return () => mq.removeEventListener('change', updateMqMatches);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { isGreaterOrEqual: mqMatches };
}
