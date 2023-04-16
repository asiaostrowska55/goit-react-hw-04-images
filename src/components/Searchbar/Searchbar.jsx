import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleChange = event => {
    const inputValue = event.currentTarget.value;
    this.setState({ inputValue });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { inputValue } = this.state;

    this.props.getImages(inputValue);
  };

  render() {
    const { inputValue } = this.state;
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
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
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  getImages: PropTypes.func.isRequired,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default Searchbar;
