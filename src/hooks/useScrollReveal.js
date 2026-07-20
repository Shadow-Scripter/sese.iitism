'use client';
import { useEffect, useRef, useState } from 'react';

export default function useScrollReveal(threshold = 0.2) {
  const [isVisible, setIsVisible] = useState(false);
  const [hiddenPosition, setHiddenPosition] = useState("bottom");
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (!entry.isIntersecting) {
          if (entry.boundingClientRect.top < 0) {
            setHiddenPosition("top");
          } else {
            setHiddenPosition("bottom");
          }
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return [ref, isVisible, hiddenPosition];
}
