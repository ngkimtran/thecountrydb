import React, { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import {useParams, Link } from 'react-router-dom'

const url = 'https://restcountries.eu/rest/v2/name/'
const fullText='?fullText=true'

const SingleCountry = () => {
    const {name} = useParams();
    const [loading, setLoading] = useState(false);
    const [country, setCountry] = useState(null);
    // const [border, setBorder] = useState([]);

    // const borderCountries = async (item) => {
    //     try {
    //         const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${item}`)
    //         const data = await response.json()
            
    //         if(data) {
    //             const newBorder = data.name;
    //             setBorder(...border, newBorder);
                
    //         }
    //         else {
    //             setBorder([]);
    //         } 
    //     } catch(e) {
    //         console.log(e)
    //     }
    // }

    useEffect(() => {
        const getCountry = async () => {
            setLoading(true);
    
            try {
                const response = await fetch(`${url}${name}${fullText}`);
                const data = await response.json();
    
                if(data[0]) {
                    const {
                        nativeName,
                        population,
                        region,
                        subregion,
                        capital,
                        topLevelDomain,
                        currencies,
                        languages,
                        borders,
                        flag
                    } = data[0];
                    const newCountry = {
                        nativeName,
                        population,
                        region,
                        subregion,
                        capital,
                        topLevelDomain,
                        currencies,
                        languages,
                        borders,
                        flag
                    }
                    setCountry(newCountry);
    
                }
                else {
                    setCountry(null);
                }
                setLoading(false);
            }
            catch (e) {
                console.log(e);
                setLoading(false);
            }
        }

        getCountry();  
    }, [name]);

    

    if(loading) {
        return <Loading />
    }
    if(!country) {
        return (
            <section className="section country-section">
                <h2 className="section-title">no country to display</h2>
                <Link to="/thecountrydb/" className="btn btn-primary">back home</Link>
            </section>
        )
    }
    else {
        const {
            nativeName,
            population,
            region,
            subregion,
            capital,
            topLevelDomain,
            currencies,
            languages,
            borders,
            flag
        } = country;

        return (
            <section className="section country-section">
                <Link to="/thecountrydb/">
                    <button className="btn btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
                    <span>back</span>    
                    </button>
                </Link>
                <div className="item">
                    <img src={flag} alt={name} />
                    <div className="item-info">
                        <h2 className="item-title">{name}</h2>
                        <div className="item-data">
                            <p>
                                <span>native name: </span>
                                {nativeName}
                            </p>
                            <p>
                                <span>population: </span>
                                {population}
                            </p>
                            <p>
                                <span>region: </span>
                                {region}
                            </p>
                            <p>
                                <span>sub region: </span>
                                {subregion}
                            </p>
                            <p>
                                <span>capital: </span>
                                {capital}
                            </p>
                            <p>
                                <span>top level domain: </span>
                                {topLevelDomain}
                            </p>
                            <p>
                                <span>currencies: </span>
                                {currencies[0].name}
                            </p>
                            <p>
                                <span>languages: </span>
                                {languages.map((item, index) => (
                                    <>{item.name}{index < languages.length - 1 ? ',\u00A0' : ''}</>
                                ))}
                            </p>
                        </div>
                        <p className="borders">
                            <span>border countries: </span>
                            <div>
                                {
                                    borders.length < 1 ?
                                        <span>none</span> :
                                        borders.map((item, index) => {
                                            // borderCountries(item)
                                            return (
                                                <span className="border" key={index}>{item} </span>
                                            )
                                })}
                            </div>
                            </p>
                    </div>
                </div>
            </section>
        )
    }
}

export default SingleCountry
