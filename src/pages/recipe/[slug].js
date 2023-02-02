import { sanityClient, urlBuilder } from "lib/sanity.js";
import Head from "next/head.js";
import Image from "next/image.js";
import React from "react";
import styles from "../../styles/singleRecipe.module.scss";

const OneRecipe = ({ recipe }) => {
  console.log(recipe, "recipe...");
  return (
    <div className={styles.one__recipe_main}>
      <Head>
        <title>Recipe - {recipe?.name}</title>
      </Head>
      <section className={styles.header__section}>
        <div className={styles.mainImage__wrapper}>
          <Image
            className={styles.recipe__image}
            src={urlBuilder(recipe.image).url()}
            alt={recipe.name}
            width={100}
            height={100}
          ></Image>
        </div>
        <h2 className={styles.recipe__title}>{recipe.name}</h2>
      </section>
    </div>
  );
};

export default OneRecipe;

export const getStaticPaths = async () => {
  const pathsQuery = `
  *[_type == "recipe"&& defined(slug.current)]{
    "params": {
      "slug": slug.current
    }
  }`;

  const paths = await sanityClient.fetch(`${pathsQuery}`);
  console.log(paths, "paths");

  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const recipeOneQuery = `
  *[_type == "recipe" && slug.current == $slug ][0]{
    _id,
    name,
    slug,
    image,
    chef -> {
      name,
      image
    },
    ingredients[] {
      quantity,
      unit,
      ingredient ->{
      name,
      image
    }
  }  
}
`;
  const recipe = await sanityClient.fetch(recipeOneQuery, { slug });
  return {
    props: { recipe },
  };
};
