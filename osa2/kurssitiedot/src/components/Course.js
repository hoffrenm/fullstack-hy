import React from 'react'

const Header = ({ name }) => {
  return (
    <>
      <h2>{name}</h2>
    </>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => (
        <Part part={part} key={part.id} />
      ))}
    </>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((a, b) => a + b.exercises, 0)

  return (
    <>
      <b>Total of {total} exercises</b>
    </>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course
