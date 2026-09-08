"use client";

import { useState } from "react";

export function CalculatorForm() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const left = Number(a);
  const right = Number(b);
  const result =
    a !== "" && b !== "" && Number.isFinite(left) && Number.isFinite(right) ? left * right : null;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <fieldset>
        <legend>Calculator</legend>
        <p>
          <label htmlFor="calc-a">Input A</label>
          <input
            id="calc-a"
            name="a"
            type="number"
            value={a}
            onChange={(event) => setA(event.target.value)}
          />
        </p>
        <p>
          <label htmlFor="calc-b">Input B</label>
          <input
            id="calc-b"
            name="b"
            type="number"
            value={b}
            onChange={(event) => setB(event.target.value)}
          />
        </p>
      </fieldset>
      <p>Result: {result === null ? "—" : result}</p>
    </form>
  );
}
