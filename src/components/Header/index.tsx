/* eslint-disable import/no-unresolved */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { FiShoppingCart } from 'react-icons/fi';
import { VscSignOut } from 'react-icons/vsc';
import CartContext from '../../contexts/Cart';
import UserContext from '../../contexts/User';
import { signOut } from '../../api';

export default function Header() {
  const { cart, loadingCart } = useContext(CartContext);
  const { currentUser, currentUserDispatch } = useContext(UserContext);
  const { t } = useTranslation(['common']);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }, { passive: true });

    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  function logout() {
    signOut()
      .then((res) => {
        if (res.ok) {
          currentUserDispatch({ type: 'LOGOUT' });
        }
      });
  }

  const
    mainContainer = classnames({
      'grid grid-cols-12 z-20 fixed top-0 w-full transition-all duration-100 ease-in-out': true,
      'py-3 light-shadow bg-white bg-opacity-90': scrolled,
      'py-4': !scrolled,
    });
  const titleClass = classnames({
    'z-10 font-bold inline-block md:mr-20 absolute md:relative -translate-x-1/2 transform md:translate-x-0 left-1/2 md:left-0': true,
    'text-lg': scrolled,
    'text-xl': !scrolled,
  });

  return (
    <header className={mainContainer}>
      <div className="col-start-2 col-span-10">
        <div className="flex items-center justify-end md:justify-between">
          <Link to="/" className={titleClass}>
            {t('brand')}
          </Link>
          <div className="flex items-center md:space-x-10 justify-between w-full md:w-auto">
            {currentUser?.role.name === 'customer' && (
              <Link to="/cart" className="relative order-1 md:order-none">
                <FiShoppingCart
                  size="1.5em"
                  color="black"
                />
                <div
                  style={{ right: '-8px', bottom: '-8px' }}
                  className="absolute bg-black text-white h-5 w-5 flex items-center justify-center rounded-full"
                >
                  <span style={{ fontSize: '11px' }}>
                    {loadingCart ? 0 : cart?.count && cart.count > 9 ? '+9' : cart?.count}
                  </span>
                </div>
              </Link>
            )}
            <VscSignOut
              size="1.8em"
              color="#4B5563"
              className="cursor-pointer"
              onClick={logout}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
