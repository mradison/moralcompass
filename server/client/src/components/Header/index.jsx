import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  
  return (
    <header>
        <Link className="headerLink" to="/">
          <h1 className="headerName">
            Moral Compass
          </h1>
        </Link>        
    </header>
  );
};

export default Header;
