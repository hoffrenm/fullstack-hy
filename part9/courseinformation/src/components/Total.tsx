const Total = ({ courseParts }: courseProps) => {
  const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);

  return (
    <p>
      Number of exercises {total}
    </p>
  );
};

interface courseProps {
  courseParts: { name: string, exerciseCount: number; }[];
}

export default Total;