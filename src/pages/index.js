import Head from "next/head";
import Image from "next/image";
import { sanityClient, urlBuilder } from "lib/sanity.js";
import styles from "../styles/index.module.css";
import Link from "next/link.js";
import { useInView } from "react-intersection-observer";
import { RecipeCard } from "@/components/RecipeCard/RecipeCard.jsx";

export default function Home({ recipes }) {
  console.log(process.env.NEXT_PUBLIC_SANITY_TOKEN);
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
        <h2 className={styles.mainTitle}>All Recipes</h2>
      </section>

      <section className={styles.all__recipes}>
        {recipes.map((recipe, key) => {
          return (
            <Link
              key={key}
              href={`/recipe/${recipe.slug.current}`}
              className={styles.link}
            >
              <>
                <RecipeCard recipe={recipe} delay={key * 100} />
              </>
            </Link>
          );
        })}
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
