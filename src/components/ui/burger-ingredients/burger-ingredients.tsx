import React, { FC, memo } from 'react';
import { Tab } from '@zlden/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';
import { BurgerIngredientsUIProps } from './type';
import { IngredientsCategoryUI } from '../ingredients-category/ingredients-category';
import { useSelector } from '../../../services/store';

export const BurgerIngredientsUI: FC<BurgerIngredientsUIProps> = memo(
  ({
    currentTab,
    buns,
    mains,
    sauces,
    titleBunRef,
    titleMainRef,
    titleSaucesRef,
    bunsRef,
    mainsRef,
    saucesRef,
    onTabClick
  }) => {
    const constructorBun = useSelector((state) => state.burgerConstructor.bun);
    const constructorIngredients = useSelector(
      (state) => state.burgerConstructor.ingredients
    );

    // Счётчики для каждого ингредиента
    const ingredientsCounters: Record<string, number> = {};
    if (constructorBun) {
      ingredientsCounters[constructorBun._id] = 2;
    }
    constructorIngredients.forEach((item) => {
      ingredientsCounters[item._id] = (ingredientsCounters[item._id] || 0) + 1;
    });

    return (
      <section className={styles.burger_ingredients} data-testid="ingredients-section">
        <nav>
          <ul className={styles.menu} data-testid="ingredients-tabs">
            <Tab 
              value='bun' 
              active={currentTab === 'bun'} 
              onClick={onTabClick}
              data-testid="bun-tab"
            >
              Булки
            </Tab>
            <Tab
              value='main'
              active={currentTab === 'main'}
              onClick={onTabClick}
              data-testid="main-tab"
            >
              Начинки
            </Tab>
            <Tab
              value='sauce'
              active={currentTab === 'sauce'}
              onClick={onTabClick}
              data-testid="sauce-tab"
            >
              Соусы
            </Tab>
          </ul>
        </nav>
        <div className={styles.content} data-testid="ingredients-content">
          <IngredientsCategoryUI
            title='Булки'
            titleRef={titleBunRef}
            ingredients={buns}
            ingredientsCounters={ingredientsCounters}
            ref={bunsRef}
            data-testid="buns-section"
          />
          <IngredientsCategoryUI
            title='Начинки'
            titleRef={titleMainRef}
            ingredients={mains}
            ingredientsCounters={ingredientsCounters}
            ref={mainsRef}
            data-testid="mains-section"
          />
          <IngredientsCategoryUI
            title='Соусы'
            titleRef={titleSaucesRef}
            ingredients={sauces}
            ingredientsCounters={ingredientsCounters}
            ref={saucesRef}
            data-testid="sauces-section"
          />
        </div>
      </section>
    );
  }
);