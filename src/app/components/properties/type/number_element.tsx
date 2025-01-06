import { NumberProperty } from "@/lib/property/types";

export default function NumberPropertyElement({
  property,
  onPropertyChanged,
}: {
  property: NumberProperty;
  onPropertyChanged: (arg0: NumberProperty) => void;
}) {
  function onValueChanged(e: React.ChangeEvent<HTMLInputElement>) {
    let enteredNumber = Number.parseFloat(e.target.value);
    console.log(enteredNumber);
    enteredNumber = Number.isNaN(enteredNumber) ? 0 : enteredNumber;
    property.set(enteredNumber);
    onPropertyChanged(property);
  }

  return (
    <>
      <label>{property.getName()}</label>
      <input type={"text"} onChange={onValueChanged} value={property.value()} />
    </>
  );
}
