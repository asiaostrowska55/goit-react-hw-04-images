import { Blocks } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <Blocks
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      className={css.loader}
    />
  );
};

export default Loader;
