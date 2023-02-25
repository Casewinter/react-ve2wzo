import React from 'react';
import './style.css';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function App() {
  const [data, setData] = useState([]);
  const [pages, setPages] = useState('');
  const [menuPages, setMenuPages] = useState(1);
  const [input, setInput] = useState('');
  const [url, setUrl] = useState(
    'https://rickandmortyapi.com/api/character/?name=rick'
  );

  const baseUrl = 'https://rickandmortyapi.com/api';
  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then(
        (resp) => {
          setData(resp.results);
          setPages(resp.info);
        },
        (error) => {
          console.error(error);
        }
      );
  }, [url]);

  const search = () => {
    if (input !== '' && input !== ' ') {
      setUrl(baseUrl + '/character/?name=' + input);
      setInput('');
    }
  };

  const filterByAlive = () => {
    url.includes('&')
      ? setUrl(url.substr(0, url.indexOf('&')) + '&status=alive')
      : setUrl(url + '&status=alive');
  };
  const filterByDead = () => {
    url.includes('&')
      ? setUrl(url.substr(0, url.indexOf('&')) + '&status=dead')
      : setUrl(url + '&status=dead');
  };
  const filterByUnknow = () => {
    url.includes('&')
      ? setUrl(url.substr(0, url.indexOf('&')) + '&status=unknow')
      : setUrl(url + '&status=unknow');
  };

  const clearFilter = () => {
    url.includes('&') ? setUrl(url.substr(0, url.indexOf('&'))) : null;
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const nextPage = () => {
    setUrl(pages.next);
    setMenuPages(menuPages + 1);
    scrollToTop();
  };
  const prevPage = () => {
    setUrl(pages.prev);
    setMenuPages(menuPages - 1);
    scrollToTop();
  };

  return (
    <div>
      <header>
        <h1>Find a Rick, or anyone</h1>
        <p>Actually, you don't need to use this, you know that. Right?</p>
        <div className="input-wrapper">
          <label className="sr-only">Search</label>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            id="filter"
            type="text"
            placeholder="Search by name"
          />
          <Search className="search" onClick={search} />
        </div>
        <aside>
          <button onClick={filterByAlive}>Alive</button>
          <button onClick={filterByDead}>Dead</button>
          <button onClick={filterByUnknow}>Who knows?</button>
          <button onClick={clearFilter}>Clear filter</button>
        </aside>
        <p className="resultsCounter">
          Well, we find: {pages.count} of... you know, what you searched! Don't
          ask again.
        </p>
      </header>
      <main>
        <ul>
          {data.map((resp) => {
            return (
              <li className="card">
                <div className="img-part">
                  <img src={resp.image} alt="character" width="200px" />
                </div>
                <div>
                  <div className=" header">
                    <h2>{resp.name}</h2>
                    <div className="text-part">
                      <p>
                        Origin: <span>{resp.origin.name}</span>
                      </p>
                      <p>
                        Specie: <span>{resp.species}</span>
                      </p>
                      <p>
                        Status:
                        <span className={resp.status}> {resp.status}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <footer>
          <button
            onClick={prevPage}
            disabled={pages.prev == null ? true : false}
          >
            Prev page
          </button>
          <span>{menuPages}</span>
          <span>/</span>
          <span>{pages.pages}</span>
          <button
            onClick={nextPage}
            disabled={pages.next == null ? true : false}
          >
            Next page
          </button>{' '}
          <div className="credits">
            <p>
              This site was made in react. API used:{' '}
              <a href="https://rickandmortyapi.com/">rickandmorty</a>
            </p>
            <p>
              Find me in my GitHub:{' '}
              <a href="https://github.com/Casewinter">Casewinter</a>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
