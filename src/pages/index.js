import Head from "next/head";
import Image from "next/image";
import { sanityClient, urlBuilder } from "lib/sanity.js";
import styles from "../styles/index.module.css";
import Link from "next/link.js";

export default function Home({ recipes }) {
  return (
    <div>
      <Head>
        <title>Juhan Recipes</title>
        <meta
          name="description"
          content={"This is the recipe page for Jubayer Juhan"}
        />
      </Head>
      <section
        className="recipe_hero-section"
        style={{ padding: 40, display: "flex", justifyContent: "center" }}
      >
        <h2>All Recipes</h2>
      </section>

      <section className={styles.all__recipes}>
        {recipes.map((recipe, key) => (
          <Link key={key} href={`/recipe/${recipe.slug.current}`}>
            <div className={styles.recipe__card}>
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
          </Link>
        ))}
      </section>
    </div>
  );
}

export async function getStaticProps() {
  const recipeQuery = `*[_type == "recipe"]{
    _id,
      name,
      slug,
      image,
      chef -> {name,image}
  }`;

  const recipes = await sanityClient.fetch(recipeQuery);
  console.log(recipes, "recipes");
  return {
    props: { recipes },
  };
}
