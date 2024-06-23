import { useState, useEffect } from 'react';

import { baseUrl } from '../constants';

const transformArrayToObject = (arr, keys) => {
  const result = {};

  arr.forEach((subArray) => {
    const [region, tradingNetwork, returnPoint, ...values] = subArray;

    if (!region || !tradingNetwork || !returnPoint) {
      return;
    }

    if (!result[region]) {
      result[region] = {};
    }

    if (!result[region][tradingNetwork]) {
      result[region][tradingNetwork] = {};
    }

    result[region][tradingNetwork][returnPoint] = {};

    keys.forEach((key, index) => {
      result[region][tradingNetwork][returnPoint][key] = values[index];
    });
  });

  return result;
};

function fetchDataFromGoogleSheets() {
  return fetch(baseUrl)
    .then((response) => {
      if (!response.ok) {
        console.log('Network response was not ok');
      }

      return response.json();
    })
    .then((data) => {
      if (data && data.values && data.values.length > 0) {
        return data.values;
      }

      console.log('Empty data or invalid format returned from Google Sheets');
    })
    .catch((error) => {
      console.log('Error fetching data from Google Sheets:', error);
    });
}

const googleSheetDataAdapter = (data) => {
  const keys = ['pln', 'rcs', 'tariff'];

  return transformArrayToObject(data, keys);
};

function useFetchData() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const values = await fetchDataFromGoogleSheets();
        const adaptedDatas = googleSheetDataAdapter(values);

        setFormData(adaptedDatas);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, formData };
}

export default useFetchData;
