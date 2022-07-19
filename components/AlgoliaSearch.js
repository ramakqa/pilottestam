import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-hooks-web';
import 'instantsearch.css/themes/satellite.css';

const searchClient = algoliasearch('JDU2Y7CH79', 'fc3e9b86ed9ba8626af648bd639f7570');

function Hit({ hit }) {
  return (
    <article>
      <h1>{hit.firstname}</h1>
    </article>
  );
}

export const AlgoliaSearch = ({ slice }) => (
  <section className="pb-8">
    <div className="mx-auto w-full max-w-xl">      
      <InstantSearch indexName="pilot1_search1" searchClient={searchClient}>
        <SearchBox
          classNames={{
            root: 'p-4',
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