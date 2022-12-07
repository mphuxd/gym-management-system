import React from "react";
import Link from "next/link";

function SideNav() {
  return (
    <div id='side-nav' className={styles.sideNav}>
      <nav>
        <ul className={styles.sideNavList}>
          <Link href='/'>Home</Link>
          <Link href='/members'>Members</Link>
          <Link href='/signup'>Sign Up New Member</Link>
          <Link>Settings</Link>
          <Link>Analytics</Link>
        </ul>
      </nav>
    </div>
  );
}

export default SideNav;
