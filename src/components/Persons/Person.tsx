import React from 'react';
import IPerson from "./IPerson";
interface PersonProps {
  person: IPerson
}

const Person = (props: PersonProps) => {
  const { person } = props;

  return (
    <div className="person-details">
      <ul>
        <li>
          <strong>Name: </strong> {person.name}
        </li>
        <li>
          <strong>Height: </strong> {person.height}
        </li>
      </ul>
    </div>
  );
};

export default Person;