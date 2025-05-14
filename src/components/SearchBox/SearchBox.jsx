import styles from './SearchBox.module.css';

function SearchBox({ value, onChange }) {
  return (
    <div className={styles.searchBox}>
      <label htmlFor="search" className={styles.label}>
        Find contacts by name
      </label>
      <input
        type="text"
        id="search"
        value={value}
        onChange={onChange}
        className={styles.input}
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchBox;