import { useEffect, useState } from 'react';

import { City } from '../../types/city';
import SearchInput from './SearchInput';
import { getCities } from '../../api/getCities';
import styles from './Search.module.scss';
import useDebounce from '../../hooks/useDebounce';

type CitySearchProps = {
  onCitySelect: (city: string) => void;
};

const CitySearch = ({ onCitySelect }: CitySearchProps) => {
  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const debouncedSearchValue = useDebounce(searchValue, 300);

  useEffect(() => {
    const fetchCities = async () => {
      const data = await getCities();
      setCities(data);
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const results = cities.filter((city) => city.name.toLowerCase().includes(debouncedSearchValue.toLowerCase()));
    setFilteredCities(results);
  }, [debouncedSearchValue, cities]);

  const handleCityClick = (cityName: string) => {
    onCitySelect(cityName);
    setSearchValue('');
  };

  return (
    <div className={styles.searchWrapper}>
      <SearchInput value={searchValue} setValue={setSearchValue} />
      {searchValue && (
        <ul>
          {filteredCities.map((city) => (
            <li key={city.code} onClick={() => handleCityClick(city.code)}>
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
