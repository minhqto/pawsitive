import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, incrementByAmount } from "../../redux/counter";

// This example shows how to use redux in the app
export function Counter() {
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter</h1>

      <p>This is a simple example of a React component.</p>

      <p aria-live="polite">
        Current count: <strong>{count}</strong>
      </p>

      <button
        className="btn btn-primary"
        onClick={() => dispatch(incrementByAmount(10))}
      >
        Increment
      </button>
    </div>
  );
}
