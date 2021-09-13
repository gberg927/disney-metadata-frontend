import Link from 'next/link';

const Footer = () => (
  <footer className="text-gray-600 body-font border-t">
    <div className="flex justify-between items-center px-4 py-8 mx-auto">
      <Link href="/">
        <a title="Theme Park Stats">
          <div className="flex justify-start items-center h-5">
            <svg
              className="stroke-black fill-purple h-5 mr-1 mb-2"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.5 8.5L1 26H9.5H14.5H22.5L23 2L14.5 16L9.5 8.5Z" />
            </svg>
            <span className="text-lg font-bold whitespace-nowrap">
              Theme Park Stats
            </span>
          </div>
        </a>
      </Link>
      <p className="text-sm text-gray-500">© 2020</p>
    </div>
  </footer>
);

export default Footer;
