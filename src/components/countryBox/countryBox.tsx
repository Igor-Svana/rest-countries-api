import './countryBox.css';
import { ICountryDetail } from '../../App';

interface ICountryData {
    bg: string,
    color: string,
    dataColor: string,
    flag: string,
    name: string,
    population: number,
    region: string,
    capital: [string],
    onClick: (value: React.SetStateAction<ICountryDetail>) => void

}

const CountryBox = ({bg, color, dataColor, flag, name, population, region, capital, onClick}: ICountryData) => {
  
    return(
        <div className='box-container' style={{background: bg}} onClick={() => onClick({displayed: true, country: name})}>
            <img src={flag} alt="flag" />
            <div className='info-container'>
                <h2>{name}</h2>
                <p style={{color: dataColor}}><span style={{color: color}}>Population: </span>{population}</p>
                <p style={{color: dataColor}}><span style={{color: color}}>Region: </span>{region}</p>
                <p style={{color: dataColor}}><span style={{color: color}}>Capital: </span>{capital}</p>
            </div>
        </div>
    )
}

export default CountryBox;