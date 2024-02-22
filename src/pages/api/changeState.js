import { students } from "@/utils/data";
import fs from "fs";

const handler = (req, res) => {
  try {
    const studentId = req.body.id;
    const newState = req.body.state;
    const student = students.find((student) => student.id === studentId);
    student.state = newState;
    fs.writeFileSync(
      "src/utils/data.js",
      `export const students =${JSON.stringify(students)}`
    );
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;
