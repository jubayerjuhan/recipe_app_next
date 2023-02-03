import { urlBuilder } from "lib/sanity.js";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import styles from "../../styles/index.module.css";

export const RecipeCard = ({ recipe }) => {
  const [showed, setShowed] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) return setShowed(true);
  }, [inView]);

  console.log(showed, recipe.name);
  return (
    <div className={inView || showed ? styles.show : styles.hide}>
      <div className={styles.recipe__card} ref={ref}>
        <div className={styles.recipe__image_container}>
          <Image
            className={styles.recipe__image}
            src={urlBuilder(recipe.image).url()}
            width={100}
            height={100}
            alt={recipe.name}
          ></Image>
        </div>
        <p className={styles.recipe__title}>{recipe.name}</p>
        <p className={styles.recipe__chef}>👩🏻‍🍳 {recipe.chef?.name}</p>
      </div>
    </div>
  );
};
