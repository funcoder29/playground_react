import { useMemo, useState } from "react";

const marks = Array.from({ length: 50000 }, (_, index) => index % 101);

function calculateTotalWithoutMemo(marks) {
  const start = performance.now();
  let total = 0;

  for (const mark of marks) {
    for (let i = 0; i < 1000; i++) {
      total += mark;
    }
  }
  const end = performance.now();
  console.log(`Time taken without memo: ${end - start} ms`);
  return total;
}

function calculateTotalWithMemo(marks) {
  const start = performance.now();
  let total = 0;

  for (const mark of marks) {
    for (let i = 0; i < 1000; i++) {
      total += mark;
    }
  }
  const end = performance.now();
  console.log(`Time taken with memo: ${end - start} ms`);
  return total;
}

const Dashboard = () => {
  const [theme, setTheme] = useState("light");

  const totalWithMemo = useMemo(() => {
    return calculateTotalWithMemo(marks);
  }, []);

  const totalWithoutMemo = calculateTotalWithoutMemo(marks);

  return (
    <div className={theme}>
      <h2>Student Dashboard</h2>

      <p>Total marks with memo: {totalWithMemo}</p>
      <p>Total marks without memo: {totalWithoutMemo}</p>

      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Change theme
      </button>
    </div>
  );
};

export const Home = () => {
  return <Dashboard />;
};
