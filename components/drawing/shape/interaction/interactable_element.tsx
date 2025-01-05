import {
  DragPoint,
  SketchInteractable,
} from "../../../../lib/drawing/sketch/interaction";
import DragSphere from "../drag/sphere";
import * as THREE from "three";

export default function InteractableElement({
  interactable,
  onDrag,
  onDragEnd,
}: {
  interactable: SketchInteractable<any>;
  onDrag?: (target: any, move: THREE.Vector3) => void;
  onDragEnd?: (target: any) => void;
}) {
  let position = new THREE.Vector3(0, 0, 0);
  if (interactable instanceof DragPoint) {
    position = interactable.getPosition(interactable.getTarget());
  }

  function onElementDrag(movePosition: THREE.Vector3) {
    movePosition = movePosition.clone();
    if (interactable.onMove) {
      interactable.onMove(interactable.getTarget(), movePosition);
    }
    if (onDrag) {
      onDrag(interactable.getTarget(), movePosition);
    }
  }

  function onElementDragEnd() {
    if (interactable.onMoveEnd) {
      interactable.onMoveEnd(interactable.getTarget());
    }
    if (onDragEnd) {
      onDragEnd(interactable.getTarget());
    }
  }

  return (
    <DragSphere
      position={position}
      onDrag={(p) => onElementDrag(p)}
      onDragEnd={() => onElementDragEnd()}
    />
  );
}
