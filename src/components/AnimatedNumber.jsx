import { useState, useEffect, useRef } from 'react';

const AnimatedNumber = ({ value = 0, duration = 800, suffix = '' }) => {
  const [displayedValue, setDisplayedValue] = useState(0);
  const startValueRef = useRef(0);

  useEffect(() => {
    let animationFrameId;
    let startTime = null;
    const startValue = startValueRef.current;
    const endValue = typeof value === 'number' ? value : (parseFloat(value) || 0);
    const changeInValue = endValue - startValue;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      const currentVal = Math.round(startValue + changeInValue * easedProgress);
      setDisplayedValue(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        startValueRef.current = endValue;
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [value, duration]);

  return (
    <span className="animated-number">
      {displayedValue}
      {suffix}
    </span>
  );
};

export default AnimatedNumber;
