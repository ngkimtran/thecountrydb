import React from 'react'
import { Link } from 'react-router-dom'

const Country = ({ name, population, region, capital, flag }) => {
    return (
        <Link to={`/thecountrydb/country/${name}`}>
            <article className="country">
                <div className="img-container">
                    <img src={flag} alt={name} />
                </div>
                <div className="country-footer">
                    <h3>{name}</h3>
                    <p>
                        <span className="footer-data">Population: </span>
                        {population}
                    </p>
                    <p>
                        <span className="footer-data">Region: </span>
                        {region}
                    </p>
                    <p>
                        <span className="footer-data">Capital: </span>
                        {capital}
                    </p>
                </div>
            </article>
        </Link>
    )
}

export default Country
