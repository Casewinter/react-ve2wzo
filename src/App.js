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
  document.title = 'Rick And Morty';
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
            placeholder="Filter"
          />
          <Search className="search" onClick={search} />
        </div>
      </header>
      <main>
        <p className="resultsCounter">
          Well, we find: {pages.count} of... you know, what you searched! Don't
          ask again.
        </p>
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
          </button>
        </footer>
      </main>
    </div>
  );
}
