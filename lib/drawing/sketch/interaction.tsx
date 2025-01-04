import * as THREE from "three";

export abstract class SketchInteractable<TargetType> {
    protected target: TargetType;
    onMove: ((target: TargetType, movePosition: THREE.Vector3) => void) | null = null;
    onMoveEnd: ((target: TargetType) => void) | null = null;

    constructor(target: TargetType) {
        this.target = target;
    }

    getTarget(): TargetType {
        return this.target;
    }

    abstract clone(target?: TargetType): SketchInteractable<TargetType>;
}

export class DragPoint<TargetType> extends SketchInteractable<TargetType> {
    getPosition: (target: TargetType) => THREE.Vector3;

    constructor(target: TargetType, getPosition: (target: TargetType) => THREE.Vector3, onMove: (target: TargetType, movePosition: THREE.Vector3) => void, onMoveEnd?: (target: TargetType) => void) {
        super(target);
        this.getPosition = getPosition;
        this.onMove = onMove;
        this.onMoveEnd = onMoveEnd ? onMoveEnd : null;
    }

    getTarget() {
        return this.target;
    }

    clone(target?: TargetType): DragPoint<TargetType> {
        if (!target) {
            target = this.target;
        }
        if (this.onMove === null) {
            throw new Error("onMove on DragPoint cannot be null");
        }
        return new DragPoint<TargetType>(target, this.getPosition, this.onMove, this.onMoveEnd ? this.onMoveEnd : undefined);
    }


    move(movedPosition: THREE.Vector3) {
        if (this.onMove) {
            this.onMove(this.target, movedPosition);
        }
    }

    moveEnd() {
        if (this.onMoveEnd) {
            this.onMoveEnd(this.target);
        }
    }
}