import React from 'react';

const AllCampuses = (props) => {
  return (
    <div>
      <ul>
        {props.campuses && props.campuses.map(campus => (
          <li key={campus.id}>
            <span>{campus.name}</span>
            <img src={campus.imageUrl} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AllCampuses
