import Part from "./Part";
import { CoursePart } from "../types";

const Content = ({ courses }: { courses: CoursePart[]; }) => {
  return (
    <div>
      {courses.map((course) => {
        return (
          <div key={course.name}>
            <Part part={course} />
          </div>
        );
      })}
    </div>
  );
};

export default Content;