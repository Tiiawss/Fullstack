
  const Header = ({ course }) => {
        console.log("course header", course)
        return (
        <div>
            <h1>
            {course}
            </h1>
        </div>
        )
    }
  
  const Content = ({parts}) => {
    console.log('parts', parts)
    return (
    <div>
      {parts.map(part =>
        <p key = {part.id}>
        {part.name} {part.exercises}
        </p>
      )}
    </div>
    )
  }
  
  const Total = ( {parts} ) => {
    console.log("total", parts)
    const sum = parts.reduce((total, part) => total + part.exercises, 0)
    console.log(sum)
    return (
      <p><b>
        Total of {sum} exercises
      </b></p>
    )
  }
  
  const Course = ({ courses }) => {
    console.log('courses', courses)
    return (
      <div> 
        {courses.map(course =>
          <div key={course.id}>
            <Header course={course.name} key={course.id} />
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
          </div>
        )}
      </div>
      )
  }

export default Course