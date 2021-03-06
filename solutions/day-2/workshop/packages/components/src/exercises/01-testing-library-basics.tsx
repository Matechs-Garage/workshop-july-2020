import * as React from "react";
import * as timers from "./01-timers";

export const Message = ({ message }: { message: string }) => (
  <div data-testid={"message-box"}>{message}</div>
);

export const Counter = () => {
  const [count, setCount] = React.useState(0);

  const increment = () => {
    setCount((current) => current + 1);
  };

  const decrement = () => {
    setCount((current) => current + 1);
  };

  return (
    <>
      <button onClick={() => decrement()}>-</button>
      <span>{count}</span>
      <button onClick={() => increment()}>+</button>
    </>
  );
};

export const AsyncCounter = () => {
  const [count, setCount] = React.useState(0);

  const increment = () => {
    setTimeout(() => {
      setCount((current) => current + 1);
    }, 1000);
  };

  const decrement = () => {
    setTimeout(() => {
      setCount((current) => current - 1);
    }, 1000);
  };

  return (
    <>
      <button onClick={() => decrement()}>-</button>
      <span>{count}</span>
      <button onClick={() => increment()}>+</button>
    </>
  );
};

export const AutoIncrement = () => {
  const [count, setCount] = React.useState(0);

  const increment = () => {
    setCount((current) => current + 1);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      increment();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <span>{count}</span>
    </>
  );
};

export const AutoIncrementAsync = (p: { interval?: number }) => {
  const [count, setCount] = React.useState(0);

  const increment = async (_: { cleared: boolean }) => {
    await new Promise((r) => {
      timers.timeout(() => {
        r();
      }, 100);
    });
    if (!_.cleared) {
      setCount((c) => c + 1);
    }
  };

  React.useEffect(() => {
    const _ = { cleared: false };
    const interval = timers.interval(() => {
      increment(_);
    }, p.interval || 5000);
    return () => {
      _.cleared = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <span>{count}</span>
    </>
  );
};
