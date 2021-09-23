import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { NavSmall, NavLarge } from './Nav';
import currentUser from '../auth/User';
import { RESORTS, CURRENT_USER, LOGOUT } from '../../queries';

const Header = () => {
  const router = useRouter();
  const { slug: slugs } = router.query;
  const slugKey = `${(slugs && slugs[0]) || ''}_${(slugs && slugs[1]) || ''}`;

  const [selectedResort, setSelectedResort] = useState();

  const user = currentUser();
  const [logout] = useMutation(LOGOUT, {
    refetchQueries: [{ query: CURRENT_USER }],
  });

  const { loading, error, data } = useQuery(RESORTS, {
    onCompleted: () => {
      setSelectedResort(data.resorts.find((resort) => resort.slug === 'wdw'));
    },
  });

  if (loading || error) return <></>;

  const { resorts } = data;

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b">
            <div className=" flex items-center justify-start h-16">
              <div className="flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:justify-between">
                <div>
                  <Link href="/">
                    <a title="Theme Park Stats">
                      <div className="flex justify-start items-center h-9 mt-2">
                        <svg
                          className="stroke-black fill-purple h-9 w-auto mr-1 mb-3"
                          viewBox="0 0 24 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.5 8.5L1 26H9.5H14.5H22.5L23 2L14.5 16L9.5 8.5Z" />
                        </svg>
                        <span className="text-4xl font-bold whitespace-nowrap">
                          Theme Park Stats
                        </span>
                      </div>
                    </a>
                  </Link>
                </div>
                <div className="hidden sm:block">
                  {!user && (
                    <Link href="/login">
                      <a className="px-4 py-2 rounded-md shadow-sm text-base font-medium text-white bg-purple-500 hover:bg-purple-600">
                        Login
                      </a>
                    </Link>
                  )}
                  {user && (
                    <>
                      <span className="mr-2">Welcome {user.email}</span>
                      <button
                        type="button"
                        className="px-4 py-2 rounded-md shadow-sm text-base font-medium text-white bg-purple-500 hover:bg-purple-600"
                        onClick={logout}
                      >
                        Login
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="hidden sm:block">
              <NavLarge
                resorts={resorts}
                slugKey={slugKey}
                selectedResort={selectedResort}
                setSelectedResort={setSelectedResort}
              />
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="flex flex-col justify-end items-stretch text-center">
              <NavSmall resorts={resorts} slugKey={slugKey} />
              <div className="px-2 border-gray-900 border-t-2 border-b-2">
                {!user && (
                  <Link key="login" href="/login">
                    <a
                      className="text-xl font-bold text-gray-500 hover:bg-gray-700 hover:text-white block px-5 py-2 rounded-md"
                      title="login"
                    >
                      Login
                    </a>
                  </Link>
                )}
                {user && (
                  <button
                    type="button"
                    className="text-xl font-bold text-gray-500 hover:bg-gray-700 hover:text-white block px-5 py-2 rounded-md"
                    onClick={logout}
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
