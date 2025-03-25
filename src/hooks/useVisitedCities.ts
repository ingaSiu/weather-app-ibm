import { useEffect, useState } from 'react';

export type VisitedCity = {
  code: string;
  name: string;
  count: number;
};

export const useVisitedCities = () => {
  const [visitedCities, setVisitedCities] = useState<VisitedCity[]>([]);

  useEffect(() => {
    const storedCities = localStorage.getItem('visitedCities');
    if (storedCities) {
      setVisitedCities(JSON.parse(storedCities));
    }
  }, []);

  const addCity = (cityCode: string, cityName: string) => {
    console.log(cityCode);
    const existingCity = visitedCities.find((city) => city.code === cityCode);

    let updatedCities;
    if (existingCity) {
      updatedCities = visitedCities.map((city) => (city.code === cityCode ? { ...city, count: city.count + 1 } : city));
    } else {
      updatedCities = [...visitedCities, { code: cityCode, name: cityName, count: 1 }];
    }

    updatedCities.sort((a, b) => b.count - a.count);

    setVisitedCities(updatedCities);
    localStorage.setItem('visitedCities', JSON.stringify(updatedCities));
  };

  return { visitedCities, addCity };
};
