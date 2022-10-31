import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Person from "../components/Persons/Person";
import PersonAPI from "../components/Persons/PersonAPI";
import _ from 'lodash';


function Startwars() {
  const peopleApi = 'https://swapi.dev/api/people';
  const peopleSearchApi = 'https://swapi.dev/api/people/?search=';

  const [allPeople, setPeople] =  useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState(peopleApi);
  const [autoVal, setAutoVal] = useState<any | null>(null);
  
  // const params = useParams();
  const navigate = useNavigate();


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
      const getPersonKeys = _.map(actualData.results, _.partialRight(_.pick, ['name', 'height']));
      const results : any[] = _.map(getPersonKeys, function(a) {
        return _.mapKeys(a, (val,key)=> key === 'name' ? 'label' : key )
      })
      setPeople(results);
      setError(null);
    })
    .catch((err) => {
      setError(err.message);
      setPeople(null);
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
    PersonAPI(query)
    setSearch(requestUrl)
  };


  // 
  // On select of autocomplete
  // 
  const onClick = (val: any) => {
    let pathName = '/Startwars/';
    pathName += val ? val.label : '';

    // Navigate to person details page
    navigate(pathName);
    // Set autocomplete value
    setAutoVal(val);
  };


  return (
    <div className='page-startwars'>
      <h1>Startwars</h1>

      {loading && <div>A moment please...</div>}

      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      

      {allPeople && 
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={ allPeople }
          noOptionsText="No results"
          loading={ !_.isEmpty(allPeople) }
          value={autoVal}
          onChange={(event: any, newVal: string | null) => {
            onClick(newVal)
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
      
      {autoVal &&
        <Person {...autoVal}/>
      }
      
    </div>
  );
}

export default Startwars;