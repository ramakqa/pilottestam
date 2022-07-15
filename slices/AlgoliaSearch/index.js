import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch('3JJXJQ6L4J', '4120b0e8f8feea9e15ed26ec04d2519c');

const AlgoliaSearch = ({ slice }) => (
  <InstantSearch searchClient={searchClient} indexName="demo_ecommerce" className="grid grid-cols-1 gap-6">
    <SearchBox />
    <Hits />
  </InstantSearch>
);

/*const AlgoliaSearch = ({ slice }) => (
  <section>
    <span className="title">
      {
        slice.primary.title ?
        <PrismicRichText field={slice.primary.title}/>
        : <h2>Template slice, update me!</h2>
      }
    </span>
    {
      slice.primary.description ?
      <PrismicRichText field={slice.primary.description}/>
      : <p>start by editing this slice from inside Slice Machine!</p>
    }
    <style jsx>{`
        section {
          max-width: 600px;
          margin: 4em auto;
          text-align: center;
        }
        .title {
          color: #8592e0;
        }
    `}</style>
  </section>
)*/

export default AlgoliaSearch