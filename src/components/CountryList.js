import React, {useEffect} from 'react'
import { useGlobalContext } from '../context'
import Country from './Country'
import Loading from './Loading'

const CountryList = () => {
    const {setSearchTerm, countries, loading} = useGlobalContext();

    useEffect(() => {
        setSearchTerm('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(loading) {
        return <Loading />
    }

    if(countries.length < 1) {
        return (
            <h2 className="section-title">
                No country found.
            </h2>
        )
    }

    return (
        <section className="section">
            <div className="countries-center">
                {countries.map((item) => {
                    return <Country key={item.id} {...item} />
                })}
            </div>
        </section>
    )
}

export default CountryList
