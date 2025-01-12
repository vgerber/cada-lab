import { BoundingBox } from "@/lib/drawing/shape/shape";
import { AnySketchShape, Sketch } from "@/lib/drawing/sketch/sketch";
import { Property, PropertyGroup } from "@/lib/property/types";
import { Box, useTheme } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react";
import { OrthographicSketchCamera } from "../drawing/orthographic_camera";
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

type SketchBookProps = {
  sketch: Sketch;
  onUpdate?: (shape: AnySketchShape) => void;
  onUpdateEnd?: (shape: AnySketchShape) => void;
};

export const SketchBook = observer(
  ({ sketch, onUpdate, onUpdateEnd }: SketchBookProps) => {
    const theme = useTheme();

    const state = useLocalObservable(() => ({
      sketchBounds: getBoundingBox(sketch, 0.1),
    }));

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
      runInAction(() => (state.sketchBounds = newBounds));
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
          style={{ background: theme.paletteExt.backgroundElevation[1] }}
        >
          <OrthographicSketchCamera sketchBounds={state.sketchBounds} />
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
        <div
          style={{
            overflow: "auto",
            background: theme.paletteExt.backgroundElevation[2],
          }}
        >
          <PropertiesEditor property={getProperties()} />
        </div>
      </Box>
    );
  },
);
