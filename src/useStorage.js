import { useState, useEffect, useCallback, useMemo } from 'react';

const useStorage = () => {
  const [canStore, setCanStore] = useState(true);
  const key = "@@WindHorseGame2024";

  const stored = useMemo(() => {
    const stored = localStorage.getItem(key);
    try {
      return JSON.parse(stored) || {};
    } catch (e) {
      return {};
    }
  }, [])

  const [storage, setStorage] = useState(stored);
  useEffect(() => {
    if (!canStore) return;
    const value = JSON.stringify(storage);
    localStorage.setItem(key, value);
  }, [storage, canStore])

  const resetStorage = useCallback((data) => {
    setCanStore(false);
    if (data) {
      setStorage(data);
      const value = JSON.stringify(data);
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
    }
    window.location.reload();
  }, []);

  return [storage, setStorage, resetStorage];
}

const useStorageKey = (key, defaultValue, storage, setStorage) => {
  const getValue = useCallback((s) => {
    let value = s[key];
    if (value === undefined) {
      value = defaultValue;
    }
    return value;
  }, [key, defaultValue])
  const value = useMemo(() => getValue(storage), [getValue, storage]);
  const setValue = useCallback((v) => {
    setStorage(s => ({...s, [key]: typeof v === 'function' ? v(getValue(s)) : v}));
  }, [setStorage, key, getValue]);
  return [value, setValue];
}

const useStorageValues = () => {
  const [storage, setStorage, resetStorage] = useStorage();

  const [score, setScore] = useStorageKey("score", 0, storage, setStorage);
  const [speed, setSpeed] = useStorageKey("speed", 1, storage, setStorage);
  const [fp, setFp] = useStorageKey("fp", 0, storage, setStorage);
  const [fpmax, setFpmax] = useStorageKey("fpmax", 50, storage, setStorage);

  const [fpCooldownTime, setFpCooldownTime] = useStorageKey("fpCooldownDate", null, storage, setStorage);
  const fpCooldownDate = useMemo(() => fpCooldownTime && new Date(fpCooldownTime), [fpCooldownTime]);
  const setFpCooldownDate = useCallback((date) => setFpCooldownTime(date && date.getTime()), [setFpCooldownTime])

  const [goodFoDates, setGoodFoDates] = useStorageKey("goodFoDates", {}, storage, setStorage);
  const ackedGoodFo = useCallback((key) => !!goodFoDates[key], [goodFoDates]);
  const ackGoodFo = useCallback((key) => {
    setGoodFoDates(dates => ({...dates, [key]: new Date()}));
  }, [setGoodFoDates]);

  const ackedGoodFos = useMemo(() => Object.keys(goodFoDates), [goodFoDates]);

  const [queue, setQueue] = useStorageKey("queue", [], storage, setStorage);
  const [velocityDiff, setVelocityDiff] = useStorageKey("velocityDiff", 0.5, storage, setStorage);
  const [gravity, setGravity] = useStorageKey("gravity", 0.1, storage, setStorage);

  const [horseMomHelpTimestamp, setHorseMomHelpTimestamp] = useStorageKey("horseMomHelpDate", null, storage, setStorage);
  const horseMomHelpDate = horseMomHelpTimestamp && new Date(horseMomHelpTimestamp);
  const setHorseMomHelpDate = useCallback((date) => setHorseMomHelpTimestamp(date && date.getTime()), [setHorseMomHelpTimestamp])

  const [windMomHelpTimestamp, setWindMomHelpTimestamp] = useStorageKey("windMomHelpDate", null, storage, setStorage);
  const windMomHelpDate = windMomHelpTimestamp && new Date(windMomHelpTimestamp);
  const setWindMomHelpDate = useCallback((date) => setWindMomHelpTimestamp(date && date.getTime()), [setWindMomHelpTimestamp])

  return {
    score, setScore,
    speed, setSpeed,
    fp, setFp,
    fpmax, setFpmax,
    fpCooldownDate, setFpCooldownDate,
    ackedGoodFo, ackGoodFo, ackedGoodFos,
    queue, setQueue,
    velocityDiff, setVelocityDiff,
    gravity, setGravity,
    horseMomHelpDate, setHorseMomHelpDate,
    windMomHelpDate, setWindMomHelpDate,
    resetStorage, data: storage,
  }
}

export default useStorageValues;
