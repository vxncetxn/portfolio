import { useSelector } from "@legendapp/state/react";
import { color } from "../state/color";

export function ColorTool() {
  const selectedColor = useSelector(() => color.get());

  return (
    <div className="relative ml-16 overflow-hidden transition-colors border-4 rounded-full lg:border-8 aspect-square border-neutral-03 focus-within:outline-none focus-within:shadow-2xl focus-within:shadow-theme-selected focus-within:border-neutral-04">
      <label className="cursor-pointer">
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
