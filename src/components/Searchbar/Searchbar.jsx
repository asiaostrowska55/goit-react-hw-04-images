import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './Searchbar.module.css';

const Searchbar = ({ getImages }) => {
  // const initialState = {
  //   inputValue: '',
  // };

  const [inputValue, setInputValue] = useState('');

  const handleChange = event => {
    setInputValue(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    getImages(inputValue);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  getImages: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default Searchbar;

// import PropTypes from 'prop-types';
// import css from './Searchbar.module.css';

// const Searchbar = ({ onSubmit }) => {
//   return (
//     <header className={css.searchbar}>
//       <form className={css.form} onSubmit={onSubmit}>
//         <button type="submit" className={css.button}>
//           <span className={css.buttonLabel}>Search</span>
//         </button>

//         <input
//           className={css.input}
//           type="text"
//           autoComplete="off"
//           autoFocus
//           placeholder="Search images and photos"
//         />
//       </form>
//     </header>
//   );
// };

// Searchbar.propTypes = {
//   getImages: PropTypes.func,
// };

// export default Searchbar;
