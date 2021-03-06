import React, { useEffect } from 'react';
import React1, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import i18n from "i18next";
import { useTranslation } from 'react-i18next';
import  "../lang/lang"
import logo from '../../assest/img/logo.png';
// @ts-ignore
import bootstrap from '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import cx from 'classnames';

import classes from './app-header.module.scss';

function Header() {
  const {t} = useTranslation()

  const [language, setLanguage] = useState("ru");

  const handleLangChange = (evt: { target: { value: any; }; }) => {
      const lang = evt.target.value;
      setLanguage(lang);
      i18n.changeLanguage(lang);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.getItem('i18nextLng') ? i18n.changeLanguage(localStorage.getItem('i18nextLng') || 'ru') : i18n.changeLanguage('ru');
      setLanguage(localStorage.getItem('i18nextLng') || 'ru')
    }
  }, []);


  const { totalCount, totalPrice } = useTypedSelector(({ cart }) => cart);
  return (
    <header className={classes.header}>
      <div className="container">
        <div className={classes.wrapper}>
          <Link to="/" className={cx('col-4', classes.left)}>
            <img className={classes.logo} src={logo} alt="logo" />
            <div className={classes.text}>
              <h1 className={classes.title}>REACT PIZZA</h1>
              <p className={classes.desc}>{t('header.title')}</p>
            </div>
          </Link>
          <Link to="/cart" className={cx('col-4', classes.right)}>
            <button className={classes.btn}>
              <div className={cx(classes.totalPrice, classes.text)}>
                {totalPrice ? totalPrice.toFixed(2) : totalPrice} с
              </div>
              <span className={classes.line}></span>
              <div className={cx(classes.totalCount, classes.text)}>
                <svg
                  className="me-2"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                    stroke="white"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                    stroke="white"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                    stroke="white"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {totalCount}
              </div>
            </button>
          </Link>
          <select onChange={handleLangChange} value={language} className={cx(classes.lang)}>
                        <option className={cx(classes.lang)} value="en">EN</option> 
                        <option className={cx(classes.lang)} value="ru">RU</option> 
                        <option className={cx(classes.lang)} value="kg">KG</option>
          </select> 
        </div>
      </div>
    </header>
  );
}

export default Header;
