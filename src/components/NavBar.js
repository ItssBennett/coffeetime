import { NavLink } from 'react-router-dom';


//navbar with navlinks from dom
export default function NavBar() {
  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16">
          <div className="flex items-center justify-center flex-1">
            <div className="flex items-stretch space-x-8">
              <NavLink
                exact
                to="/"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                activeClassName="border-indigo-500 text-gray-900"
              >
                Landing
              </NavLink>
              <NavLink
                to="/calendar"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                activeClassName="border-indigo-500 text-gray-900"
              >
                Calendar
              </NavLink>
              <NavLink
                to="/about"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                activeClassName="border-indigo-500 text-gray-900"
              >
                About
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

