/* eslint-disable max-len */
import dotenv from 'dotenv';

dotenv.config();

const getCountries = async (req, res) => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/subregion/South%20America?fields=name,cca2');
    const countries = await response.json();
    return res.status(200).json({ message: 'Paises encontrados', data: countries, error: false });
  } catch (e) {
    return res.status(400).json({ message: 'Error al obtener paises', data: null, error: true });
  }
};

const getStates = async (req, res) => {
  const { ccode } = req.params;
  try {
    const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${ccode}/regions?limit=10&languageCode=es`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': process.env.RAPIDAPI_HOST,
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      },
    });
    const states = await response.json();
    return res.status(200).json({ message: 'Estados encontrados', data: states, error: false });
  } catch (e) {
    return res.status(400).json({ message: 'Error al obtener estados', data: null, error: true });
  }
};

const getCities = async (req, res) => {
  const { ccode, rcode } = req.params;
  try {
    const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${ccode}/regions/${rcode}/places?types=CITY&languageCode=es&minPopulation=30000&limit=10`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': process.env.RAPIDAPI_HOST,
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      },
    });
    const cities = await response.json();
    return res.status(200).json({ message: 'Ciudades encontradas', data: cities, error: false });
  } catch (e) {
    return res.status(400).json({ message: 'Error al obtener ciudades', data: null, error: true });
  }
};

export default { getCountries, getStates, getCities };
