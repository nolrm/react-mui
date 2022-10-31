import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Person from "../components/Persons/Person";
import _ from 'lodash';



function Startwars() {
  const peopleApi = 'https://swapi.dev/api/people';
  const peopleSearchApi = 'https://swapi.dev/api/people/?search=';

    // const [data, setData] =  useState<UserData | null>(null);
  const [items, setData] =  useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState(peopleApi);
  const [value, setValue] = useState<any | null>(null);

  // const [error, setError] = useState(null);
  
  const params = useParams();
  const navigate = useNavigate();
  
  console.log('value ---', value)
  console.log('params --', params);

  // if (params.name && !value) {
  //   // if (value != null) {
  //   //   console.log(value.label)
  //   // }
  //   // setValue(params.name);
  // }
  

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
        return _.mapKeys(a, (val,key)=> key === 'name' ? 'label' : key )
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
  const onSearch = (query: any) => {
    const requestUrl = query ? (peopleSearchApi + query) : peopleApi;
    setSearch(requestUrl)
  };

  // 
  // On select of autocomplete
  // 
  const onClick = (val: any) => {
    let pathName = '/Startwars/';
    pathName = val ? (pathName + val.label) : pathName;

    // Navigate to person details page
    navigate(pathName);

    // Set autocomplete value
    setValue(val);
  };


  return (
    <div className='page-startwars'>
      <h1>Startwars</h1>

      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      

      {items && 
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={ items }
          noOptionsText="No results"
          loading={ !_.isEmpty(items) }
          value={value}
          onChange={(event: any, newValue: string | null) => {
            onClick(newValue)
          }}
          sx={{ width: 300 }}
          style={{ margin: '0 auto' }}
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
      
      {value &&
        <Person {...value}/>
      }
      
    </div>
  );
}

export default Startwars;