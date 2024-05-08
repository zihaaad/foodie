import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Choose from a fiverse menu featuring a delectable Array of Dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission in to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <a href="#explore-menu">
          <button>View Menu</button>
        </a>
      </div>
    </header>
  );
};

export default Header;
