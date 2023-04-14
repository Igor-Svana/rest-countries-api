export interface ICurrency {
  name: string
}

export interface INativeName {
  official: string;
}

export interface ICountires {
    name: {
      official: string;
      nativeName: [INativeName];
    };
    population: number;
    region: string;
    subregion: string;
    capital: [string];
    currencies: [ICurrency];
    tld: [string];
    languages: [];
    borders?: string[];
    flags: {
      svg: string;
    };
  }

export const fetchData = async <T>(url: string): Promise<T> => {
    const response = await fetch(url)
    return await response.json()
}

export const fetchRegion = async <T>(url: string): Promise<T> => {
  const response = await fetch(url)
  return await response.json()
}