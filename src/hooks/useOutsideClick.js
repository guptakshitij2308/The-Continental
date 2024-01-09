import { useEffect, useRef } from "react";

export default function useOutsideClick(handler) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        // ref.current stores the dom node which references the styled modal
        if (ref.current && !ref.current.contains(e.target)) handler();
      }

      document.addEventListener("click", handleClick, true); // we use true as events bubble up in JS; using true it is attached in event capturing phase.

      return () => document.removeEventListener("click", handleClick, true);
    },
    [handler]
  );
  return ref;
}
