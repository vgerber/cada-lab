import Link from "next/link";
import styles from "./navbar.module.scss";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <Link href="/">
        <a className={styles.home}>CADle</a>
      </Link>
      <div className={styles.topics}>
        <Link href="/shape">
          <a>Shape</a>
        </Link>
        <Link href="/collision">
          <a>Collision</a>
        </Link>
        <Link href="/mesh">
          <a>Mesh</a>
        </Link>
      </div>
    </div>
  );
}
