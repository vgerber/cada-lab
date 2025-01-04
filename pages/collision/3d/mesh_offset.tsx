import { useState } from "react";
import * as THREE from "three";
import { MathUtils } from "three";
import SketchBook from "../../../components/drawing/sketchbook";
import { DashedLineProperties, Line } from "../../../lib/drawing/shape/2d/line";
import { Point } from "../../../lib/drawing/shape/2d/point";
import { Shape } from "../../../lib/drawing/shape/shape";
import { DragPoint } from "../../../lib/drawing/sketch/interaction";
import { AnySketchShape, Sketch } from "../../../lib/drawing/sketch/sketch";
import { SketchShape } from "../../../lib/drawing/sketch/sketch_shape";

export default function LinePointDistance() {
    let [lineA, setLineA] = useState(new Line("Line A", new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 1, 0)));
    let [lineB, setLineB] = useState(new Line("Line B", new THREE.Vector3(0, 0, 0), new THREE.Vector3(-1, 1, 0)));

    let meshOffset = 0.3;

    let lineAADrag = new DragPoint(lineA, (l) => l.a, (l, position) => (l.a.set(position.x, position.y, 0)));
    let lineABDrag = new DragPoint(lineA, (l) => l.b, (l, position) => (l.b.set(position.x, position.y, 0)));
    let sketchLineA = new SketchShape(lineA);
    sketchLineA.addInteractable(lineAADrag);
    sketchLineA.addInteractable(lineABDrag);

    lineB.a = lineA.a;
    let lineBBDrag = new DragPoint(lineB, (l) => l.b, (l, position) => (l.b.set(position.x, position.y, 0)));
    let sketchLineB = new SketchShape(lineB);
    sketchLineB.addInteractable(lineBBDrag);

    let normalA = sketchLineA.shape.dirNormalized().cross(new THREE.Vector3(0, 0, 1)).multiplyScalar(-1);
    let normalB = sketchLineB.shape.dirNormalized().cross(new THREE.Vector3(0, 0, 1));

    let normalLineA = new Line("Normal A", lineA.a, lineA.a.clone().add(normalA.clone().multiplyScalar(meshOffset)));
    normalLineA.properties.dashedProperties = new DashedLineProperties();
    let normalLineB = new Line("Normal B", lineA.a, lineA.a.clone().add(normalB.clone().multiplyScalar(meshOffset)));
    normalLineB.properties.dashedProperties = new DashedLineProperties();



    let alpha = Math.acos(normalA.dot(normalB) / (normalA.length() * normalB.length()));
    console.log(MathUtils.radToDeg(alpha).toFixed(0));

    let offsetLength = Math.abs(meshOffset) / Math.cos(alpha / 2);

    let meanNormalVector = normalLineA.dirNormalized().clone().add(normalLineB.dirNormalized()).normalize();
    let offsetPosition = lineA.a.clone().add(meanNormalVector.clone().multiplyScalar(offsetLength));
    let shiftLine = new Line("Shift Line", lineA.a, offsetPosition);
    shiftLine.properties.dashedProperties = new DashedLineProperties();

    let offsetPoint = new Point("Shift Offset", offsetPosition);

    let lineAOpposite = new Line("A Opposite", offsetPosition, lineA.a.clone().add(normalA.clone().multiplyScalar(meshOffset)));
    lineAOpposite.properties.dashedProperties = new DashedLineProperties();
    let lineBOpposite = new Line("B Opposite", offsetPosition, lineB.a.clone().add(normalB.clone().multiplyScalar(meshOffset)));
    lineBOpposite.properties.dashedProperties = new DashedLineProperties();

    let lineAOffset = new Line("Line A (Offset)", offsetPosition, lineA.b.clone().add(normalA.clone().multiplyScalar(meshOffset)));
    let lineBOffset = new Line("Line B (Offset)", offsetPosition, lineB.b.clone().add(normalB.clone().multiplyScalar(meshOffset)));

    function onUpdateShape(sketchShape: AnySketchShape) {
        let updatedShapeName = (sketchShape.shape as Shape).getName();
        if (updatedShapeName === lineA.getName()) {
            setLineA(sketchShape.getShape().clone());
        }
        if (updatedShapeName === lineB.getName()) {
            setLineB(sketchShape.getShape().clone());
        }
    }

    let shapes = [
        sketchLineA,
        sketchLineB,
        new SketchShape(normalLineA),
        new SketchShape(normalLineB),
        new SketchShape(shiftLine),
        new SketchShape(offsetPoint),
        new SketchShape(lineAOffset),
        new SketchShape(lineBOffset),
        new SketchShape(lineAOpposite),
        new SketchShape(lineBOpposite)
    ];

    return (
        <SketchBook sketch={new Sketch(shapes)} onPropertyChanged={() => { }} onUpdate={(sketchShape) => onUpdateShape(sketchShape)} />
    )
}