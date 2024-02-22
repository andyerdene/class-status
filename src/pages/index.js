import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    fetch("/api/students")
      .then((res) => res.json())
      .then(({ students }) => setStudents([...students]));
  }, []);

  async function changeStateHandler(state) {
    const res = await fetch("/api/changeState", {
      method: "POST",
      body: JSON.stringify({
        id: 1,
        state: state,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
  }
  return (
    <main className={""}>
      <div className="flex flex-col gap-5">
        <button onClick={() => changeStateHandler("Done")} className={"btn"}>
          Change Khosoo State to Done
        </button>
        <button onClick={() => changeStateHandler("Processing")}>
          Change Khosoo State to Processing
        </button>
      </div>
      <div className="w-[700px]">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-start">id</th>
              <th className="text-start">name</th>
              <th className="text-start">state</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
