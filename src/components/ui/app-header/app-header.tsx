import React, { FC, ReactNode } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

const NavText: FC<{
  active: boolean;
  className?: string;
  children: ReactNode;
}> = ({ active, className, children }) => (
  <span
    className={`${className ? className + ' ' : ''}${active ? styles.text_primary : styles.text_secondary}`}
  >
    {children}
  </span>
);

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({
  userName,
  onProfileClick
}) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink
          to='/'
          className={({ isActive }) =>
            `${styles.link} ml-2 mr-10 ${isActive ? styles.link_active : ''}`
          }
          end
        >
          {({ isActive }) => (
            <>
              <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
              <NavText
                active={isActive}
                className='text text_type_main-default ml-2 mr-10'
              >
                Конструктор
              </NavText>
            </>
          )}
        </NavLink>
        <NavLink
          to='/feed'
          className={({ isActive }) =>
            `${styles.link} ml-2 ${isActive ? styles.link_active : ''}`
          }
        >
          {({ isActive }) => (
            <>
              <ListIcon type={isActive ? 'primary' : 'secondary'} />
              <NavText
                active={isActive}
                className='text text_type_main-default ml-2'
              >
                Лента заказов
              </NavText>
            </>
          )}
        </NavLink>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <div className={styles.link_position_last}>
        <NavLink
          to='/profile'
          className={({ isActive }) =>
            `${styles.link} ml-2 ${isActive ? styles.link_active : ''}`
          }
          onClick={onProfileClick}
        >
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <NavText
                active={isActive}
                className='text text_type_main-default ml-2'
              >
                {userName || 'Личный кабинет'}
              </NavText>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  </header>
);
