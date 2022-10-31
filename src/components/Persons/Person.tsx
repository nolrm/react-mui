import React from 'react';
interface PersonProps {
  label: string;
  height: string;
}

const Person = (props: PersonProps) => {
  const { label, height } = props;  
  return (
    <div className="person-details">
      <ul>
        <li>
          <strong>Name: </strong> {label}
        </li>
        <li>
          <strong>Height: </strong> {height}
        </li>
      </ul>
    </div>
  );
};

export default Person;