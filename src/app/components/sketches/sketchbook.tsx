"use client";
import { BoundingBox } from "@/lib/drawing/shape/shape";
import { AnySketchShape, Sketch } from "@/lib/drawing/sketch/sketch";
import { Property, PropertyGroup } from "@/lib/property/types";
import { Box, useTheme } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from "three";
import OrthographicSketchCamera from "../drawing/orthographic_camera";
import SketchShapeElement from "../drawing/shape/sketch_shape_element";
import PropertiesEditor from "../properties/editor";
function getBoundingBox(sketch: Sketch, oversize = 0.1): BoundingBox {
  const sketchBoundingBox = sketch.getBoundingBox();
  const size = sketchBoundingBox.size().multiplyScalar(oversize);
  //console.log(size);
  return new BoundingBox(
    sketchBoundingBox.min.clone().sub(size),
    sketchBoundingBox.max.clone().add(size),
  );
}

export default function SketchBook({
  sketch,
  onPropertyChanged,
  onUpdate,
  onUpdateEnd,
}: {
  sketch: Sketch;
  onPropertyChanged: (arg0: Property) => void;
  onUpdate?: (shape: AnySketchShape) => void;
  onUpdateEnd?: (shape: AnySketchShape) => void;
}) {
  const theme = useTheme();
  const [sketchBounds, setSketchBounds] = useState(getBoundingBox(sketch, 0.1));

  function getProperties(): PropertyGroup {
    return new PropertyGroup(
      "Sketch",
      sketch.shapes.map((shape) => shape.getShape().getProperties()),
    );
  }

  function onShapeUpdateEnd(sketchShape: AnySketchShape) {
    if (onUpdateEnd) {
      onUpdateEnd(sketchShape);
    }
    sketch.updateBoundingBox();
    const newBounds = getBoundingBox(sketch, 0.1);
    setSketchBounds(newBounds);
  }

  function onSketchUpdate(sketchShape: AnySketchShape) {
    if (onUpdate) {
      onUpdate(sketchShape);
    }
  }

  return (
    <Box
      id="sketchBook"
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr min-content",
        minHeight: 0,
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Canvas
        frameloop="demand"
        style={{ background: theme.canvas.background }}
      >
        <OrthographicSketchCamera
          position={sketchBounds.center().add(new THREE.Vector3(0, 0, 3))}
          sceneMin={new THREE.Vector2(sketchBounds.min.x, sketchBounds.min.y)}
          sceneMax={new THREE.Vector2(sketchBounds.max.x, sketchBounds.max.y)}
        />
        <ambientLight intensity={0.7} />
        {sketch.shapes.map((shape, shapeIndex) => (
          <SketchShapeElement
            key={shapeIndex}
            sketchShape={shape}
            onUpdate={onSketchUpdate}
            onUpdateEnd={onShapeUpdateEnd}
          />
        ))}
      </Canvas>
      <div style={{ overflow: "auto" }}>
        <PropertiesEditor
          property={getProperties()}
          onPropertyChanged={onPropertyChanged}
        />
      </div>
    </Box>
  );
}

function timeout(delay: number): Promise<unknown> {
  return new Promise((res) => setTimeout(res, delay));
}
