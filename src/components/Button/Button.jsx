import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = props => {
  const handleClick = () => {
    const nextPage = props.page + 1;
    props.onClick(nextPage);
  };

  return (
    <button type="button" className={css.button} onClick={handleClick}>
      Load More
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;

// const Button = ({ onClick }) => {
//   return (
//     <button type="button" className={css.button} onClick={onClick}>
//       Load More
//     </button>
//   );
// };

// Button.propTypes = {
//   onClick: PropTypes.func,
// };

// export default Button;
