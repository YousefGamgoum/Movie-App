import React from "react";
import { FaHeart } from "react-icons/fa";
import styles from "./Nav.module.css";
import { useSelector } from "react-redux";

function Navbar() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const wishlistCount = wishlistItems.length;

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Movie App</div>
      <div className={styles.rightSection}>
        <div className={styles.watchlist}>
          <FaHeart className={styles.icon} />
          <span className={styles.text}>WATCHLIST</span>
          {wishlistCount > 0 && <span className={styles.num}>{wishlistCount}</span>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
