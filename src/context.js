import React, { useState, useEffect, useContext, useCallback } from 'react'

const url = 'https://restcountries.eu/rest/v2/all'
const url_search = 'https://restcountries.eu/rest/v2/name/'
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [countries, setCountries] = useState([]);
    const [filterParam, setFilterParam] = useState('All');

    const fetchCountries = useCallback(async () => {
        setLoading(true);
        if(searchTerm === '') {
            try { 
                const response = await fetch(`${url}`);
                const data = await response.json();

                if (data.message === 'Not Found') {
                    setCountries([]);
                }
                else {
                    const newCountries = data.map((item) => {
                        const {
                            name,
                            population,
                            region,
                            capital,
                            numericCode,
                            flag
                        } = item;

                        return {
                            name,
                            population,
                            region,
                            capital,
                            id: numericCode,
                            flag
                        }
                    })
                    if(filterParam === 'All') {
                        setCountries(newCountries);
                    }
                    else {
                        setCountries(newCountries.filter((country) => 
                           country.region === filterParam
                        ));
                    }
                }

                setLoading(false);
            } catch(e) {
                console.log(e);
                setLoading(false);
            }
            return;
        }
        else {
            try { 
                const response = await fetch(`${url_search}${searchTerm}`);
                const data = await response.json();
    
                if (data.message === 'Not Found') {
                    setCountries([]);
                }
                else {
                    const newCountries = data.map((item) => {
                        const {
                            name,
                            population,
                            region,
                            capital,
                            numericCode,
                            flag
                        } = item;
    
                        return {
                            name,
                            population,
                            region,
                            capital,
                            id: numericCode,
                            flag
                        }
                    })
                    if(filterParam === 'All') {
                        setCountries(newCountries);
                    }
                    else {
                        setCountries(newCountries.filter((country) => 
                           country.region === filterParam
                        ));
                    }
                }
    
                setLoading(false);
            } catch(e) {
                console.log(e);
                setLoading(false);
            }
            return;
        }
    }, [filterParam, searchTerm]);

    useEffect(() => {
        fetchCountries();
    }, [filterParam, searchTerm, fetchCountries]);

    return (
        <AppContext.Provider 
            value={{loading, countries, setSearchTerm, setFilterParam}}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider }