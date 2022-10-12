import { useEffect } from "react";
import { useObservable } from "@legendapp/state/react";
import { Text } from "./Text";

export function ClockWidget() {
  const time = useObservable(
    (() => {
      let timeString = new Date().toLocaleTimeString("en-US");
      return `${timeString.slice(0, -6)} ${timeString.slice(-2)}`;
    })()
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      let timeString = new Date().toLocaleTimeString("en-US");
      time.set(`${timeString.slice(0, -6)} ${timeString.slice(-2)}`);
    }, 60000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <Text size="small" className="tabular-nums">
      {time} (+8)
    </Text>
  );
}
