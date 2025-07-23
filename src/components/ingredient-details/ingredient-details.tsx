import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/ingredientsSlice';
import styles from '../ui/ingredient-details/ingredient-details.module.css';
import { useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const ingredients = useSelector((state) => state.ingredients.items);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredients.length) return <Preloader />;
  if (!ingredientData) return <div>Ингредиент не найден</div>;

  if (!location.state?.background) {
    return (
      <div className={styles.centeredPage}>
        <IngredientDetailsUI ingredientData={ingredientData} />
      </div>
    );
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
