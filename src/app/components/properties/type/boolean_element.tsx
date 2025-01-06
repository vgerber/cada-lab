import { BooleanProperty } from "@/lib/property/types";

export default function BooleanPropertyElement({
  property,
  onPropertyChanged,
}: {
  property: BooleanProperty;
  onPropertyChanged: (arg0: BooleanProperty) => void;
}) {
  function onCheckboxChanged(e: React.ChangeEvent<HTMLInputElement>) {
    property.set(e.target.checked);
    onPropertyChanged(property);
  }

  return (
    <>
      <label>{property.getName()}</label>
      <input
        type={"checkbox"}
        onChange={onCheckboxChanged}
        checked={property.value()}
        value={property.getName()}
      />
    </>
  );
}
