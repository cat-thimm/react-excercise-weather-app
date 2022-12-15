import {Link} from 'react-router-dom'

const Navigation = (props: {place: string}) => {
  return (
    <div className="navigation  column">
      <div className="app__title app__header">Weather With You</div>
      <Link to="/" className="navigation__tile"> Homepage </Link>
      <Link to={"/history/"+ props.place} className="navigation__tile"> History </Link>
      <Link to="/profile/" className="navigation__tile"> My Profile </Link>
    </div>
  );
};

export default Navigation;
