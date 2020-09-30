import { useState } from 'react';
import { useQuery } from '@apollo/client';
import NavResort from './NavResort';
import ExpandIcon from '../icons/ExpandIcon';
import CollapseIcon from '../icons/CollapseIcon';
import { LIST_RESORTS } from '../../queries';

const Nav = () => {
  const [open, setOpen] = useState(true);
  const { loading, error, data } = useQuery(LIST_RESORTS);
  if (loading || error) return <></>;
  const { resorts } = data;

  return (
    <nav className="col-start-1 col-end-2 row-start-1 row-end-3 flex flex-col border-r h-screen overflow-hidden">
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
      </ul>
    </nav>
  );
};

export default Nav;
