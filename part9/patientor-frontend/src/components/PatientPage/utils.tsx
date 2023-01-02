import { useStateValue } from "../../state";

export const diagnosisCodes = (codes: string[]) => {
  const [{ diagnoses }] = useStateValue();

  if (!codes) return null;

  return (
    <div>
      <p><b>Diagnoses:</b></p>
      <ul>
        {codes.map((code, i) => <li key={i}>{code}: {diagnoses[code]?.name}</li>
        )}
      </ul>
    </div>
  );
};

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
