import { useEffect } from "react";
import { observable } from "@legendapp/state";
import { useSelector } from "@legendapp/state/react";
import { Text } from "./Text";

const time = observable(new Date().toLocaleTimeString("en-US"));

export function ClockWidget() {
  const selectedTime = useSelector(() => time.get());

  useEffect(() => {
    const timerId = setInterval(() => {
      time.set(new Date().toLocaleTimeString("en-US"));
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  });

  return (
    <Text size="small" className="ml-12 tabular-nums">
      {selectedTime} (GMT+8)
    </Text>
  );
}
