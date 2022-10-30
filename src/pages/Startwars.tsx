import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Person from "../components/Persons/Person";
import _ from 'lodash';



function Startwars() {
  let peopleApi = 'https://swapi.dev/api/people';
  let peopleSearchApi = 'https://swapi.dev/api/people/?search=';

    // const [data, setData] =  useState<UserData | null>(null);
  const [data, setData] =  useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(peopleApi);

  const [value, setValue] = useState<string | null>(null);
  console.log('value ---', value)


  // const personResults: IDictionary<IPerson> = {};
  const params = useParams();
  const navigate = useNavigate();
  
  console.log('params --', params);
  if (params.name) {
    setValue(params.name);
  }
  

  // Get Stars wars persons
  useEffect(() => {
    fetch(search)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })
    .then((actualData) => {
      const personList = actualData.results;

      const persons = _.map(personList, _.partialRight(_.pick, ['name', 'height']));
  
      // const result: any[] = [];
      const result : any[] = _.map(persons, function(a) {
        return _.mapKeys(a, (value,key)=> key == 'name' ? 'label' : key )
      })

      setData(result);
      setError(null);
    })
    .catch((err) => {
      setError(err.message);
      setData(null);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [search]);


  // 
  // On input search change
  // new request to search /search
  const onSearch = (value: any) => {
    const requestUrl = value ? (peopleSearchApi + value) : peopleApi;
    setSearch(requestUrl)
  };

  // 
  // On select of autocomplete
  // 
  const onClick = (value: any) => {
    let pathName = '/startwars/';
    pathName = value ? (pathName + value.label) : pathName;

    // Navigate to person details page
    navigate(pathName);

    // Set autocomplete value
    setValue(value);
  };


  return (
    <div>
      <h1>Startwars</h1>

      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}

      {data && 
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={ data }
          noOptionsText="No results"
          loading={ !_.isEmpty(data) }
          value={value}
          onChange={(event: any, newValue: string | null) => {
            onClick(newValue)
          }}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={ev => {
                // dont fire API if the user delete or not entered anything
                if (ev.target.value !== "" || ev.target.value !== null) {
                  onSearch(ev.target.value);
                }
              }}
              label="Star wars persons"
            />
          )}
        />
      }
      
      <Person name="Heya"/>
      
    </div>
  );
}

export default Startwars;