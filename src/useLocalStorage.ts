import { useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(() => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (data: T) => {
    setValue(data);
    localStorage.setItem(key, JSON.stringify(data));
  };

  return [value, save];
};
