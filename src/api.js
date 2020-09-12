const BASE_URL = "https://restcountries.eu/rest/v2";

const parseJson = (res) => {
  return res.json();
};

export const getRegion = async (name, params) => {
  try {
    const countries = await fetch(`${BASE_URL}/region/${name}${params ? params : ''}`)
    .then(parseJson);

    return countries;
  } catch (err) {
    throw new Error("Erro ao buscar região:", err);
  }
};

export const getCountry = async (name) => {
  try {
    const countries = await fetch(`${BASE_URL}/name/${name}?fullText=true`)
      .then(parseJson);

    return countries[0];
  } catch (err) {
    throw new Error("Erro ao buscar país:", err);
  }
};

export const getCountries = async (path, name, params) => {
  try {
    const countries = await fetch(`${BASE_URL}${path}/${name}${params ? params : ''}`)
      .then(parseJson);

    return countries;
  } catch (err) {
    throw new Error("Erro ao buscar países:", err);
  }
};

export const getCountriesNames = async (name) => {
  try {
    const names = await fetch(`${BASE_URL}/name/${name}?fields=name`)
      .then(parseJson);
      
      return names;
    } catch (err) {
      throw new Error("Erro ao buscar sugestões:", err);
    }
};