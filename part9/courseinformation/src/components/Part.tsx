import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart; }) => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <p><b>{part.name} {part.exerciseCount}</b></p>
          <i>{part.description}</i>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <p><b>{part.name} {part.exerciseCount}</b></p>
          <p>Project exercises {part.groupProjectCount}</p>
        </div>
      );
    case "submission":
      return (
        <div>
          <p><b>{part.name} {part.exerciseCount}</b></p>
          <i>{part.description}</i>
          <p>Submit to {part.exerciseSubmissionLink}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <p><b>{part.name} {part.exerciseCount}</b></p>
          <i>{part.description}</i>
          <p>Required skills: {part.requirements.join(" ")}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part;