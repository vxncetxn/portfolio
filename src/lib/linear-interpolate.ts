export function linInterpolate(
  rangeMin: number,
  rangeMax: number,
  resultMin: number,
  resultMax: number,
  currentVal: number
) {
  return Math.max(
    Math.min(
      ((currentVal - rangeMin) / (rangeMax - rangeMin)) *
        (resultMax - resultMin) +
        resultMin,
      resultMax
    ),
    resultMin
  );
}
