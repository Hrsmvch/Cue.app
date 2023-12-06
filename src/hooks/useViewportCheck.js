import { useState, useEffect } from 'react';
 
export const useViewportCheck = (viewport) => {
  const defaultViewports = {
    mobile: { start: 320, end: 480 },
    tablet: { start: 480, end: 768 },
    laptop: { start: 768, end: 1024 },
    desktop: { start: 1024, end: 1920 },
  };

  function handleWindowSizeChange() {
    setViewportMatch(checkViewportMatch());
  }

  function checkViewportMatch() {
    return window.innerWidth >= defaultViewports[viewport]?.start && window.innerWidth <= defaultViewports[viewport]?.end;
  }

  const [isViewportMatch, setViewportMatch] = useState(checkViewportMatch());

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return isViewportMatch;
};
