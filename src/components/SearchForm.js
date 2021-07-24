import React, { useRef, useEffect } from 'react'
import {useGlobalContext} from '../context'

import TextField from '@material-ui/core/TextField'
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const SearchForm = () => {
    const { setSearchTerm, setFilterParam } = useGlobalContext();
    const searchValue = useRef('');

    useEffect(() => {
        searchValue.current.focus();
    }, [])

    const searchCountry = () => {
        setSearchTerm(searchValue.current.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    
    const handleFilter = (e) => {
        setFilterParam(e.target.value)
    }

    return (
        <section className="section search">
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="form-control">
                    <TextField 
                        className="form-input"
                        inputRef={searchValue} 
                        onChange={searchCountry} 
                        placeholder="Search for a country..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment>
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            disableUnderline: true
                        }
                    }
                    
                    />
                </div>
            </form>

            <div className="filter-wrapper">
                <select onChange={handleFilter} className="filter-form">
                    <optgroup>
                        <option value="All">Filter by Region</option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">Americas</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </optgroup>
                </select>
            </div>
        </section>
    )
}

export default SearchForm
