import React from 'react';
interface PersonRequiredProps {
  name: string;
}

interface PersonOptionalProps {
  height: string;
}

interface PersonProps
  extends PersonRequiredProps,
    PersonOptionalProps {}

const defaultProps: PersonOptionalProps = {
  height: 'Test'
};

const Person = (props: PersonProps) => {
  const { name, height } = props;  
  return (
    <div className="Person">
      <h1>
        Name: {props.name}
      </h1>
      <p>
        Height: {props.height}
      </p>
    </div>
  );
};


Person.defaultProps = defaultProps;
export default Person;