import { useCallback, useMemo } from 'react';

const useBackdropStyle = () => {
  const hrDiff = useCallback((h1, h2) => {
    return Math.min(
        Math.abs(h1 - h2),
        Math.abs(h1 - (h2 + 24)),
        Math.abs((h1 + 24) - h2),
      )
    }, [])

  const now = new Date()
  const hr = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600

  const computedScale = useCallback((min, max, midHr, hrBandWidth, isMidHrPeak) => {
    if (isMidHrPeak) {
      return max - Math.min(max - min, (max - min) * hrDiff(hr, midHr) / hrBandWidth)
    } else {
      return min + Math.min(max - min, (max - min) * hrDiff(hr, midHr) / hrBandWidth)
    }
  }, [hr, hrDiff])

  // around noon, use sepia
  const saturate = useMemo(() => computedScale(100, 200, 13, 5, true), [computedScale])

  // around dawn, use sepia
  const sepia = useMemo(() => computedScale(0, 100, 17, 3, true), [computedScale])

  // around night, use grayscale
  const grayscale = useMemo(() => computedScale(0, 100, 24, 6, true), [computedScale])
  const brightness = useMemo(() => computedScale(10, 100, 24, 6, false), [computedScale])

  return {filter: `saturate(${saturate}%) sepia(${sepia}%) grayscale(${grayscale}%) brightness(${brightness}%)`}
}

export default useBackdropStyle;
