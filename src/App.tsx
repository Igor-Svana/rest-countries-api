import {
  useState,
  useEffect,
  ChangeEvent,
  MouseEventHandler,
  MouseEvent,
} from "react";
import SearchBar from "./components/searchBar/searchBar";
import "./App.css";
import { theme } from "./theme/theme";
import { fetchData } from "./utils/fetchData";
import { fetchRegion } from "./utils/fetchData";
import CountryBox from "./components/countryBox/countryBox";
import { BallTriangle } from "react-loader-spinner";
import { ICountires } from "./utils/fetchData";
import FilterBar from "./components/filterBar/filterBar";
import CountryDetail from "./components/countryDetail/countryDetail";
import GoBackButton from "./components/gobackbutton/gobackbutton";

export interface ICountryDetail {
  displayed: boolean;
  country: string;
}

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>("")
  const [region, setRegion] = useState<string>("all")
  const [detail, setDetail] = useState<ICountryDetail>({
    displayed: false,
    country: "",
  });
  const [page, setPage] = useState<number>(1);
  const [colorTheme, setColorTheme] = useState(theme.lightMode);
  const [countries, setCountries] = useState<ICountires[]>([]);
  const [searchInputCountries, setSearchInputCountries] = useState<
    ICountires[]
  >([]);
  const [filteredCountries, setFilteredCountries] = useState<ICountires[]>([]);

  const searchInputHandler = (
    inputTxt: ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchInput(inputTxt.target.value)
    const searchedContry = countries.filter((country) => {
      return country.name.official
        .toLocaleLowerCase()
        .includes(inputTxt.target.value.toLocaleLowerCase());
    });
    const paginationCountries = searchedContry.slice((page - 1) * 8, page * 8);
    setSearchInputCountries(paginationCountries);
    setFilteredCountries(searchedContry);
    setPage(1);
  };

  useEffect(() => {
    const fetch = async () => {
      const fetchCountries = await fetchData<ICountires[]>(
        import.meta.env.VITE_API_URL
      );
      setLoading(false);
      const paginationCountries = fetchCountries.slice(
        (page - 1) * 8,
        page * 8
      );
      setCountries(fetchCountries);
      setFilteredCountries(fetchCountries);
      setSearchInputCountries(paginationCountries);
    };
    fetch();
  }, []);

  const fetchRegionHandler = async (region: string) => {
    setLoading(true);
    setRegion(region)
    const fetchedRegion = await fetchRegion<ICountires[]>(
      region == "all"
        ? import.meta.env.VITE_API_URL
        : import.meta.env.VITE_API_REGION_URL + region
    );
    setLoading(false);
    const paginationCountries = fetchedRegion.slice((page - 1) * 8, page * 8);
    setCountries(fetchedRegion);
    setFilteredCountries(fetchedRegion);
    setSearchInputCountries(paginationCountries);
  };

  const Pagination = (
    fetchCountries: ICountires[],
    num: number,
    event: MouseEvent
  ): void => {
    const paginationCountries = fetchCountries.slice(
      (page < 1 ? 0 : page + num - 1) * 8,
      (page < 1 ? 1 : page + num) * 8
    );
    setLoading(false);
    setSearchInputCountries(paginationCountries);
    setPage(page + num);
  };

  return (
    <main
      className="main"
      style={{ background: colorTheme.bg_color, color: colorTheme.text_color }}
    >
      <header style={{ background: colorTheme.header_color }}>
        <div className="header-bar">
          <h1>Where in the world?</h1>
          <div
            className="mode-toogle"
            onClick={(e) =>
              setColorTheme(
                colorTheme === theme.lightMode
                  ? theme.darkMode
                  : theme.lightMode
              )
            }
          >
            {colorTheme === theme.lightMode ? <i className="fa-regular fa-moon"></i> : <i className="fa-solid fa-moon"></i>}
            <span>Dark Mode</span>
          </div>
        </div>
      </header>
      {loading === true && (
        <div
          className="spinner-container"
          style={{ background: colorTheme.bg_color }}
        >
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            visible={true}
          />
        </div>
      )}
      {loading === false && (
        <div className="main-container">
          <section className="countries-container">
            <div className="sub-header-container">
              {detail.displayed !== true ? (
                <div className="filter-container">
                  <SearchBar
                    bg={colorTheme.header_color}
                    color={colorTheme.text_color}
                    searchInputHandler={searchInputHandler}
                    value={searchInput}
                  />
                  <FilterBar
                    bg={colorTheme.header_color}
                    color={colorTheme.text_color}
                    fetchRegionHandler={fetchRegionHandler}
                    region={region}
                  />
                </div>
              ) : <GoBackButton bg={colorTheme.header_color} onClick={(e) => setDetail({displayed: false, country: ""})}/>
              }
            </div>
            {detail.displayed === false && (
              <div className="countries-grid">
                {searchInputCountries.map((country) => {
                  return (
                    <CountryBox
                      bg={colorTheme.header_color}
                      color={colorTheme.text_color}
                      dataColor={colorTheme.input_color}
                      flag={country.flags.svg}
                      name={country.name.official}
                      population={country.population}
                      region={country.region}
                      capital={country.capital}
                      key={Math.random()}
                      onClick={(e) =>
                        setDetail({
                          displayed: true,
                          country: country.name.official,
                        })
                      }
                    />
                  );
                })}
              </div>
            )}
            {detail.displayed === true && (
              <div>
                {searchInputCountries.map((country) => {
                  if (country.name.official === detail.country) {
                    return (
                      <CountryDetail
                        bg={colorTheme.header_color}
                        color={colorTheme.text_color}
                        dataColor={colorTheme.input_color}
                        flag={country.flags.svg}
                        name={country.name.official}
                        nativeName={country.name.nativeName}
                        population={country.population}
                        region={country.region}
                        subregion={country.subregion}
                        capital={country.capital}
                        tld={country.tld}
                        currency={country.currencies}
                        languages={country.languages}
                        borders={country.borders}
                        key={Math.random()}
                      />
                    );
                  }
                })}
              </div>
            )}
          </section>
        </div>
      )}
      {detail.displayed !== true && (
        <div className="arrow-container">
          {page !== 1 && (
            <span
              className="arrow-span"
              onClick={(e) => Pagination(filteredCountries, -1, e)}
            >
              <i className="fa-solid fa-circle-left"></i>
            </span>
          )}
          {page < filteredCountries.length / 8 && (
            <span
              className="arrow-span"
              onClick={(e) => Pagination(filteredCountries, 1, e)}
            >
              <i className="fa-solid fa-circle-right"></i>
            </span>
          )}
        </div>
      )}
    </main>
  );
}

export default App;
