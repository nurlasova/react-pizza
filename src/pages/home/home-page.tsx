import React, { useCallback, useEffect } from 'react';
import Card from '../../components/card/card';
import { useDispatch } from 'react-redux';
import './_home-page.scss'

import { useTypedSelector } from '../../hooks/useTypedSelector';
import Categories from '../../components/categories/categories';
import SortPopup from '../../components/sort-popup/sort-popup';
import { setCategory, setSortBy } from '../../redux/redux-components/filter';
import { thunkPizzaAction } from '../../redux/redux-components/card';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const { category, sortBy } = useTypedSelector((state) => state.filter);

  useEffect(() => {
    dispatch(thunkPizzaAction(category, sortBy));
  }, [category, sortBy]);
  const sortIems = [
    { name: 'По популярности', type: 'popular', order: 'desc' },
    { name: 'По цене', type: 'price', order: 'desc' },
    { name: 'По алфавиту', type: 'name', order: 'asc' },
  ];

  const categoryNames = [
    'Мясные',
    'Веган',
    'Гриль',
    'Острый',
    'Закрытые',
  ];

  const onSelectCategory = useCallback((index: number | null) => {
    dispatch(setCategory(index));
  }, []);

  const onSelectSortType = useCallback((type: { [key: string]: string }) => {
    dispatch(setSortBy(type));
  }, []);
  const { type } = sortBy;

  return (
    <div>
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
        <SortPopup
          activeSortType={type}
          onClickSortType={onSelectSortType}
          items={sortIems}
        />
      </div>
      <Card />
    </div>
  );
};

export default HomePage;
