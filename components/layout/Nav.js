import { useState } from 'react';
import { useQuery } from '@apollo/client';
import currentUser from '../auth/User';
import NavResort from './NavResort';
import NavItem from './NavItem';
import ExpandIcon from '../icons/ExpandIcon';
import CollapseIcon from '../icons/CollapseIcon';
import { RESORTS } from '../../queries';

const Nav = () => {
  const user = currentUser();
  const [open, setOpen] = useState(true);
  const { loading, error, data } = useQuery(RESORTS);
  if (loading || error) return <></>;
  const { resorts } = data;

  return (
    <nav className="flex flex-col border-r h-screen overflow-hidden">
      <div className="flex justify-end items-center p-4 h-12 border-b">
        <button
          type="button"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open && <CollapseIcon />}
          {!open && <ExpandIcon />}
        </button>
      </div>
      <ul className="p-4">
        {resorts.map(resort => (
          <NavResort
            key={`nav_resort_${resort.id}`}
            resort={resort}
            open={open}
          />
        ))}
        {user && (
          <>
            <NavItem title={open ? 'Admin' : 'A'} nested={false} open={open} />
            <NavItem
              title={open ? 'Jobs' : 'J'}
              href="/jobs"
              hrefAs="/jobs/"
              nested
              open={open}
            />
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
