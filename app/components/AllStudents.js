import React from 'react';

const AllStudents = (props) => {
  return (
    <div>
      <ul>
        {props.students && props.students.map(student => (
          <li key={student.id}>{student.firstName} {student.lastName}</li>
        ))}
      </ul>
    </div>
  )
}

export default AllStudents
