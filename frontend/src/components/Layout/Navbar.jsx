import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";
import styles from "../../styles/styles";

const Navbar = ({ active }) => {
  const reload = () => {
    window.location.reload();
  };
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex" key={index} onClick={reload}>
            <Link
              to={i.url}
              className={`${
                active === index + 1
                  ? "text-blue-700"
                  : "text-black 800px:text-[#fff]"
              } pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
