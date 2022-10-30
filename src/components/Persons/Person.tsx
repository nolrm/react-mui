import React from 'react';
interface PersonProps {
  label: string;
  height: string;
}

const Person = (props: PersonProps) => {
  const { label, height } = props;  
  return (
    <div className="person">
      <h1>
        Name: {props.label}
      </h1>
      <p>
        Height: {props.height}
      </p>
    </div>
  );
};

export default Person;