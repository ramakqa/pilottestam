import Head from "next/head";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import * as prismicH from "@prismicio/helpers";

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox } from 'react-instantsearch-hooks-web';

const searchClient = algoliasearch('3JJXJQ6L4J', '4120b0e8f8feea9e15ed26ec04d2519c');


import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import { Bounded } from "../components/Bounded";
import { Heading } from "../components/Heading";
import { AlgoliaSearch } from "../components/AlgoliaSearch";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const findFirstImage = (slices) => {
  const imageSlice = slices.find((slice) => slice.slice_type === "image");

  if (imageSlice && prismicH.isFilled.image(imageSlice.primary.image)) {
    return imageSlice.primary.image;
  }
};

const getExcerpt = (slices) => {
  const text = slices
    .filter((slice) => slice.slice_type === "text")
    .map((slice) => prismicH.asText(slice.primary.text))
    .join(" ");

  const excerpt = text.substring(0, 300);

  if (text.length > 300) {
    return excerpt.substring(0, excerpt.lastIndexOf(" ")) + "…";
  } else {
    return excerpt;
  }
};

const Article = ({ article }) => {
  const featuredImage =
    (prismicH.isFilled.image(article.data.featuredImage) &&
      article.data.featuredImage) ||
    findFirstImage(article.data.slices);
  const date = prismicH.asDate(
    article.data.publishDate || article.first_publication_date
  );
  const excerpt = getExcerpt(article.data.slices);

  return (
    <li className="grid grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-8">
      <PrismicLink document={article} tabIndex="-1">
        <div className="aspect-w-4 aspect-h-3 relative bg-gray-100">
          {prismicH.isFilled.image(featuredImage) && (
            <PrismicNextImage
              field={featuredImage}
              layout="fill"
              className="object-cover"
            />
          )}
        </div>
      </PrismicLink>
      <div className="grid grid-cols-1 gap-3 md:col-span-2">
        <Heading as="h2">
          <PrismicLink document={article}>
            <PrismicText field={article.data.title} />
          </PrismicLink>
        </Heading>
        <p className="font-serif italic tracking-tighter text-slate-500">
          {dateFormatter.format(date)}
        </p>
        {excerpt && (
          <p className="font-serif leading-relaxed md:text-lg md:leading-relaxed">
            {excerpt}
          </p>
        )}
      </div>
    </li>
  );
};

const AlgoliaSearch = ({}) => {
  return (
    <section className="pb-8">
      <div className="mx-auto w-full max-w-xl">      
        <InstantSearch indexName="instant_search" searchClient={searchClient}>
          <SearchBox
            classNames={{
              root: 'p-3',
              form: 'relative',
              input: 'block w-full pl-9 pr-3 py-2 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md focus:ring-1',
              submitIcon: 'absolute top-0 right-0 bottom-0 w-6',
              resetIcon: 'absolute top-0 right-0 bottom-0 w-6',
            }}
          />
        </InstantSearch>
      </div>
    </section>
  )
}

const Index = ({ articles, navigation, settings }) => {
  return (
    <Layout
      withHeaderDivider={false}
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>{prismicH.asText(settings.data.name)}</title>
      </Head>
      <Bounded size="widest">
        <AlgoliaSearch></AlgoliaSearch>
        <ul className="grid grid-cols-1 gap-16">
          {articles.map((article) => (
            <Article key={article.id} article={article} />
          ))}
        </ul>
      </Bounded>
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const articles = await client.getAllByType("article", {
    orderings: [
      { field: "my.article.publishDate", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return {
    props: {
      articles,
      navigation,
      settings,
    },
  };
}
