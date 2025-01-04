import { BooleanProperty } from "../../../lib/property/types";
import styles from "./../editor.module.scss";

export default function BooleanPropertyElement({ property, onPropertyChanged }: { property: BooleanProperty, onPropertyChanged: (arg0: BooleanProperty) => void }) {

    function onCheckboxChanged(e: React.ChangeEvent<HTMLInputElement>) {
        property.set(e.target.checked);
        onPropertyChanged(property);
    }

    return (
        <>
            <label className={styles.propertyName}>{property.getName()}</label>
            <input className={`${styles.propertyValue} ${styles.checkbox}`} type={"checkbox"} onChange={onCheckboxChanged} checked={property.value()} value={property.getName()} />
        </>
    )
}