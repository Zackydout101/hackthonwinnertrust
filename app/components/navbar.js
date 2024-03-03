import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
        <h3 className="navList">4School</h3>
      <ul className="navList">
        <li key="1" className="navList">
          <Link href="/">
            Home
          </Link>
        </li>
        <li key ="2" className="navList">
          <Link href="/chat">
            Chat
          </Link>
        </li>
        <li key="3" className="navList">
          <Link href="/shop">
            Shop
          </Link>
        </li>
      </ul>
    </nav>
  );
};

