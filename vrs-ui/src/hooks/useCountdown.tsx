import { useRef, useState } from "react";

const useCountdown = () => {
  const [counter, setCounter] = useState(0);
  const intervalRef = useRef<any>(null);

  const beginCount = (num: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Limpiar cualquier intervalo previo
    }

    setCounter(num);
    intervalRef.current= setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter <= 1) {
          clearInterval(intervalRef.current!); // Detener el intervalo cuando llegue a 0
          return 0;
        }
        return prevCounter - 1; // Reducir el contador
      });
    }, 1000);
  };

  return [counter, beginCount] as const;
};

export default useCountdown;