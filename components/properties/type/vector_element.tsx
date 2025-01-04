import React from "react";
import { Vector2Property, Vector3Property, VectorProperty } from "../../../lib/property/types";
import editorStyles from "./../editor.module.scss";
import styles from "./vector_element.module.scss";

export default function VectorElement({ property, onPropertyChanged }: { property: VectorProperty, onPropertyChanged: (arg0: VectorProperty) => void }) {
    if (property instanceof Vector2Property) {
        return <Vector2Element property={property} onPropertyChanged={onPropertyChanged} />
    } else if (property instanceof Vector3Property) {
        return <Vector3Element property={property} onPropertyChanged={onPropertyChanged} />
    }
    return <span>Unknown vector type</span>
}

function parseFloat(number: string): number {
    let parsedNumber = Number.parseFloat(number);
    return Number.isNaN(parsedNumber) ? 0 : parsedNumber;
}

export function Vector3Element({ property, onPropertyChanged }: { property: Vector3Property, onPropertyChanged: (arg0: Vector3Property) => void }) {

    function onXChanged(e: React.ChangeEvent<HTMLInputElement>) {
        property.set(property.value().clone().setX(parseFloat(e.target.value)))
        onPropertyChanged(property);
    }

    function onYChanged(e: React.ChangeEvent<HTMLInputElement>) {
        property.set(property.value().clone().setY(parseFloat(e.target.value)))
        onPropertyChanged(property);
    }

    function onZChanged(e: React.ChangeEvent<HTMLInputElement>) {
        property.set(property.value().clone().setZ(parseFloat(e.target.value)))
        onPropertyChanged(property);
    }

    return (
        <>
            <span className={editorStyles.propertyName}>{property.getName()}</span>
            <div className={`${editorStyles.propertyValue} ${styles.vector}`}>
                <label>X</label>
                <input type={"text"} value={property.value().x} onChange={onXChanged} />
                <label>Y</label>
                <input type={"text"} value={property.value().y} onChange={onYChanged} />
                <label>Z</label>
                <input type={"text"} value={property.value().z} onChange={onZChanged} />
            </div>
        </>
    )
}

export function Vector2Element({ property, onPropertyChanged }: { property: Vector2Property, onPropertyChanged: (arg0: Vector2Property) => void }) {

    function onXChanged(e: React.ChangeEvent<HTMLInputElement>) {
        property.set(property.value().setX(parseFloat(e.target.value)))
        onPropertyChanged(property);
    }

    function onYChanged(e: React.ChangeEvent<HTMLInputElement>) {
        property.set(property.value().setY(parseFloat(e.target.value)))
        onPropertyChanged(property);
    }

    return (
        <>
            <span className={editorStyles.propertyName}>{property.getName()}</span>
            <div className={`${editorStyles.propertyValue} ${styles.vector}`}>
                <label>X</label>
                <input type={"text"} value={property.value().x} onChange={onXChanged} />
                <label>Y</label>
                <input type={"text"} value={property.value().y} onChange={onYChanged} />
            </div>
        </>
    )
}