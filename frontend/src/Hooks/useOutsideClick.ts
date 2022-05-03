import React from 'react';

type Handler = (event: UIEvent) => Unrestricted;

export const useOutsideClick = (ref: React.MutableRefObject<Unrestricted>, handler: Handler) => {
  React.useEffect(() => {
    const listener = (event: UIEvent) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
