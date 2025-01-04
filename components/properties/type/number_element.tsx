import { NumberProperty } from "../../../lib/property/types";
import styles from "./../editor.module.scss";

export default function NumberPropertyElement({ property, onPropertyChanged }: { property: NumberProperty, onPropertyChanged: (arg0: NumberProperty) => void }) {

    function onValueChanged(e: React.ChangeEvent<HTMLInputElement>) {
        let enteredNumber = Number.parseFloat(e.target.value);
        console.log(enteredNumber);
        enteredNumber = Number.isNaN(enteredNumber) ? 0 : enteredNumber;
        property.set(enteredNumber);
        onPropertyChanged(property);
    }

    return (
        <>
            <label className={styles.propertyName}>{property.getName()}</label>
            <input className={styles.propertyValue} type={"text"} onChange={onValueChanged} value={property.value()} />
        </>
    )
}