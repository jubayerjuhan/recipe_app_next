import { createClient, createPreviewSubscription } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const config = {
  projectId: "fnlngmet",
  dataset: "production",
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  apiVersion: "2022-03-25",
  useCdn: false,
};

export const sanityClient = createClient(config);

export const urlBuilder = (source) => imageUrlBuilder(config).image(source);
