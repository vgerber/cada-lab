import { useState } from "react";
import * as THREE from "three";
import SketchBook from "../../../components/drawing/sketchbook";
import { DashedLineProperties, Line } from "../../../lib/drawing/shape/2d/line";
import { Point } from "../../../lib/drawing/shape/2d/point";
import { Shape } from "../../../lib/drawing/shape/shape";
import { DragPoint } from "../../../lib/drawing/sketch/interaction";
import { AnySketchShape, Sketch } from "../../../lib/drawing/sketch/sketch";
import { SketchShape } from "../../../lib/drawing/sketch/sketch_shape";

export default function LinePointDistance() {
    let [line, setLine] = useState(new Line("Line", new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 1, 0)));
    let [point, setPoint] = useState(new Point("Point", new THREE.Vector3(-1, 1, 0)));
    let closestPoint = new Point("Closest Point", line.closestPoint(point.position));
    let closestPointLine = new Line("Point Line", closestPoint.position, point.position);
    closestPointLine.properties.dashedProperties = new DashedLineProperties();

    let lineADrag = new DragPoint(line, (l) => l.a, (l, position) => (l.a.set(position.x, position.y, 0)));
    let lineBDrag = new DragPoint(line, (l) => l.b, (l, position) => (l.b.set(position.x, position.y, 0)));
    let sketchLine = new SketchShape(line);
    sketchLine.addInteractable(lineADrag);
    sketchLine.addInteractable(lineBDrag);

    let sketchPoint = new SketchShape(point);
    sketchPoint.addInteractable(new DragPoint(point, (p) => p.position, (p, position) => p.position.set(position.x, position.y, 0)));

    function onUpdateShape(sketchShape: AnySketchShape) {
        let updatedShapeName = (sketchShape.shape as Shape).getName();
        if (updatedShapeName === line.getName()) {
            setLine(sketchShape.getShape().clone());
        }
        if (updatedShapeName === point.getName()) {
            setPoint(sketchShape.getShape().clone());
        }
    }

    return (
        <SketchBook sketch={new Sketch([sketchLine, sketchPoint, new SketchShape(closestPoint), new SketchShape(closestPointLine)])} onPropertyChanged={() => { }} onUpdate={(sketchShape) => onUpdateShape(sketchShape)} />
    )
}