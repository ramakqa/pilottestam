import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import 'instantsearch.css/themes/satellite.css';

const searchClient = algoliasearch('3JJXJQ6L4J', '4120b0e8f8feea9e15ed26ec04d2519c');

function Hit({ hit }) {
  return (
    <article>
      <img src={hit.image} alt={hit.name} />
      <p>{hit.categories[0]}</p>
      <h1>{hit.name}</h1>
      <p>${hit.price}</p>
    </article>
  );
}

const AlgoliaSearch = ({ slice }) => (
  <section className="px-4 py-8">
    <div className="mx-auto w-full max-w-xl">      
      <InstantSearch indexName="instant_search" searchClient={searchClient}>
        <SearchBox
          classNames={{
            root: 'p-3 shadow-sm',
            form: 'relative',
            input: 'block w-full pl-9 pr-3 py-2 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md focus:ring-1',
            submitIcon: 'absolute top-0 left-0 bottom-0 w-6',
          }}
        />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </div>
  </section>
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