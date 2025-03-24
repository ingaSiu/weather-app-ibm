import styles from './Search.module.scss';

type SearchInputProps = {
  value: string;
  setValue: (value: string) => void;
};

const SearchInput = ({ value, setValue }: SearchInputProps) => {
  return (
    <div className={styles.searchWrapper}>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search for Location" />
    </div>
  );
};

export default SearchInput;
