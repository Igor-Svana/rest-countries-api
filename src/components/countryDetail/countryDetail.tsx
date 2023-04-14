import "./countryDetail.css";
import { ICurrency } from "../../utils/fetchData";
import { INativeName } from "../../utils/fetchData";

interface ICountryDetail {
  bg: string;
  color: string;
  dataColor: string;
  flag: string;
  name: string;
  nativeName: [INativeName];
  population: number;
  region: string;
  subregion: string;
  capital: [string];
  tld: [string];
  currency: [ICurrency];
  languages: [];
  borders?: string[];
}

const CountryDetail = ({
  bg,
  color,
  dataColor,
  flag,
  name,
  nativeName,
  population,
  region,
  subregion,
  capital,
  tld,
  currency,
  languages,
  borders,
}: ICountryDetail) => {
 
  let ntv: string = "";
  const ntvName = nativeName ? Object.values(nativeName).map((ntvName) => {
   
   if(ntv != ntvName.official){
    ntv = ntvName.official;
    return ntvName.official + " "
   }
    
  }) : [];
  const cur = currency ? Object.values(currency).map((cur) => cur.name + " ") : [];
  const lng = languages ? Object.values(languages).map((ang) => ang + " ") : [];
  return (
    <div className="country-container">
      <img src={flag} alt="flag" />
      <div className="info-container">
        <h1>{name}</h1>
        <div className="info-box">
          <p style={{ color: dataColor }}>
            <span style={{ color: color }}>Native Name: </span>
            {...ntvName}
          </p>
          <p style={{ color: dataColor }}>
            <span style={{ color: color }}>Top Level Domain: </span>
            {tld}
          </p>
          <p style={{ color: dataColor }}>
            <span style={{ color: color }}>Population: </span>
            {population}
          </p>
          <p style={{ color: dataColor }}>
            <span style={{ color: color }}>Currencies: </span>
            {...cur}
          </p>
          <p style={{ color: dataColor }}>
            <span style={{ color: color }}>Region: </span>
            {region}
          </p>
          <p style={{ color: dataColor }}>
            <span style={{ color: color }}>Languages: </span>
            {...lng}
          </p>
          <p style={{ color: dataColor }}>
            <span style={{ color: color }}>Sub Region: </span>
            {subregion}
          </p>
          <p style={{ color: dataColor }}>
            <span style={{ color: color }}></span>
          </p>
          <p style={{ color: dataColor }}>
            <span style={{ color: color }}>Capital: </span>
            {capital}
          </p>
        </div>
        {borders && (
          <div className="borders-container">
            <p style={{ color: dataColor }}>
              <span style={{ color: color }}>Border Countries: </span>
              
            </p>
            <div className="span-conateiner">
                {borders.map((border) => {
                  return <span style={{background: bg}} className="span-box">{border}</span>;
                })}
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryDetail;
