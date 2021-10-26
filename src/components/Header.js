import { useState } from 'react';
import logo from '../images/logo.svg';

function Header(props) {
  const [topMenuHeadden, setTopMenuHeadden] = useState('true');

  function openTopMenu() {
    setTopMenuHeadden(!topMenuHeadden);
  }


  return (
    <div>
      <section className={`header__menu-top ${topMenuHeadden && `header__menu-top_headden`}`}>
          <p className='header__text'>{props.email}</p>
          <button className='header__button' onClick={props.onClick}>{props.headerButton}</button>
      </section>
      <header className="header page__content">
        <img src={logo} alt="Логотип страницы" className="header__logo" />
        <button onClick={openTopMenu} className={`header__mobile-menu ${!topMenuHeadden && `header__menu-top_headden`}`}></button>
        <button onClick={openTopMenu} className={`header__close-menu ${topMenuHeadden && `header__menu-top_headden`}`}></button>
        <div className='header__menu'>
          <p className='header__text'>{props.email}</p>
          <button className='header__button' onClick={props.onClick}>{props.headerButton}</button>
        </div>
      </header>
    </div>
  )
}

export default Header;
