import { useState, useEffect, useCallback } from 'react';

const usePressToJump = ({jump, duration, hasFinished}) => {
  const [isPressing, setPressing] = useState(false);

  const press = useCallback(() => {
    if (hasFinished) return;
    setPressing(true);
  },[hasFinished])

  const pressed = useCallback(() => {
    setPressing(false);
  },[])

  useEffect(() => {
    if (hasFinished) {
      setPressing(false);
    }
  }, [hasFinished])

  useEffect(() => {
    if (isPressing) {
      jump();
      const timer = setInterval(jump, duration * 5);
      return () => clearInterval(timer);
    }
  }, [isPressing, jump, duration]);

  return { press, pressed };
}

export default usePressToJump;
