import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className='bg-black shadow-md'>
<a href='https://endearing-parfait-b5df4e.netlify.app/' target='_blank' rel='noopener noreferrer' className='cursor-pointer'>
  <h1 className='font-bold text-sm sm:text-xl flex flex-wrap text-slate-100'>
    Managed By Porassingh Patle
  </h1>
</a>
      <div className='flex justify-between items-center max-w-7xl mx-auto p-3'>
        
        
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
          <span><img className="rounded-full h-9 w-9 object-cover " src= "\img\swirl-42566.png"></img></span>
            <span className='text-slate-100'>Swril </span>
            <span className='text-slate-200'>RealEstate</span>
            
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className='bg-slate-100 p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-100' />
          </button>
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-100 hover:underline'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-slate-100 hover:underline'>
              About
            </li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-slate-100 hover:underline'> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}