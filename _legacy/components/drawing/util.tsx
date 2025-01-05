import { ThreeEvent } from "@react-three/fiber";
import { useState, useRef, useCallback, useEffect } from "react";

export function useDrag(
  onDrag: (arg0: THREE.Vector3) => void,
  onDragEnd: () => void,
) {
  let [active, setActive] = useState(false);
  const activeRef = useRef<boolean>();
  const down = useCallback((e: ThreeEvent<PointerEvent>) => {
    setActive(true);
    e.stopPropagation();

    //let nativeEvent = e.nativeEvent;
    //if (nativeEvent.target && nativeEvent.target instanceof Element) {
    //    nativeEvent.target.setPointerCapture(nativeEvent.pointerId)
    //}
    e.target.setPointerCapture(e.pointerId);
  }, []);
  const up = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      setActive(false);

      //let nativeEvent = e.nativeEvent;
      //if (nativeEvent.target && nativeEvent.target instanceof Element) {
      //    nativeEvent.target.releasePointerCapture(nativeEvent.pointerId)
      //}
      e.target.releasePointerCapture(e.pointerId);
      onDragEnd();
    },
    [onDragEnd],
  );
  const move = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (activeRef.current) {
        e.stopPropagation();
        onDrag(e.unprojectedPoint);
      }
    },
    [onDrag],
  );
  useEffect(() => void (activeRef.current = active));
  return { onPointerDown: down, onPointerUp: up, onPointerMove: move };
}

export function useHover() {
  let [hovered, setIsHovered] = useState(false);

  const enter = useCallback(
    (e: ThreeEvent<PointerEvent>) => setIsHovered(true),
    [],
  );
  const out = useCallback(
    (e: ThreeEvent<PointerEvent>) => setIsHovered(false),
    [],
  );

  return {
    isHovered: hovered,
    bindings: { onPointerEnter: enter, onPointerOut: out },
  };
}
