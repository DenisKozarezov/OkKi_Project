import React, { useEffect, useState } from 'react';

const ThemeSwitcher = (props) => {
  const [theme, setTheme] = useState('light');

  const changeTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setTheme('light');
    }
  };

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setTheme('light');
    }
  }, []);

  return (
    <button
      type='button'
      onClick={changeTheme}
      className='grid h-11 w-11 overflow-hidden items-center fixed top-3 left-1/2 -translate-x-1/2 z-[500] rounded-md p-3 shadow-lg bg-white dark:bg-gray-700 text-yellow-500 transition-all'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={`h-6 w-6 transition-all absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 ${
          theme === 'dark' ? '-mt-8' : ''
        }`}
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          className='transition-all'
          d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
        />
      </svg>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={`h-6 w-6 transition-all absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 ${
          theme === 'light' ? 'mt-8' : ''
        }`}
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          className='transition-all'
          d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
        />
      </svg>
    </button>
  );
};

export default ThemeSwitcher;
