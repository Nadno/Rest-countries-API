import config from "./config.js";
import myFetch from "./myFetch.js";

import { activePagination, setPagination } from "../pagination.js";
import { setError } from "./validation.js";

const BASE_URL = "https://restcountries.eu/rest/v2";
const SEARCH_INPUT = "#country";

const parseJson = (res) => res.json();

export const getCountry = async (path, { name, fields }) => {
  try {
    const fetchAPI = window.fetch ? window.fetch : myFetch;
    const country = await fetchAPI(
      `${BASE_URL}${path}/${name}?fullText=true${fields ? "?&fields=" + fields.join(";") : ""}`
    ).then(parseJson);

    return country;
  } catch (err) {
    throw new Error("Erro ao buscar país:", err);
  }
};

export const getCountries = async ({ path, name, fields }) => {
  try {
    const fetchAPI = window.fetch ? window.fetch : myFetch;
    
    const countries = await fetchAPI(
      `${BASE_URL}${path}/${name}${fields ? "?fields=" + fields.join(";") : ""}`
    ).then(parseJson);
    const pages = countries.length / config.itemsForPage;

    if (countries?.status) return setError(SEARCH_INPUT, "noResults")
    
    setPagination({ countries, pages });
    activePagination(true);
  } catch (err) {
    throw new Error(err);
  }
};
