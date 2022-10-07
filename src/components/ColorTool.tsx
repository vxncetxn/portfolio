import { useSelector } from "@legendapp/state/react";
import { color } from "../state/color";

export function ColorTool() {
  const selectedColor = useSelector(() => color.get());

  return (
    <div className="relative ml-16 h-[55.5px] aspect-square border-8 border-neutral-03 rounded-full overflow-hidden transition-colors">
      <label>
        <div className="w-full h-full bg-theme-selected"></div>
        <input
          type="color"
          id="head"
          name="head"
          value={selectedColor}
          onChange={(e) => color.set(e.target.value)}
          list="theme-colors"
          className="sr-only"
        />
      </label>
      <datalist id="theme-colors">
        <option>#34fdaa</option>
        <option>#fa1c41</option>
      </datalist>
    </div>
  );
}
