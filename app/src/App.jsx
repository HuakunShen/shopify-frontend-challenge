import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

const pmdbapi_key = '1583369f';
const nominate_size = 5;

window.Clipboard = (function (window, document, navigator) {
  var textArea, copy;

  function isOS() {
    return navigator.userAgent.match(/ipad|iphone/i);
  }

  function createTextArea(text) {
    textArea = document.createElement('textArea');
    textArea.value = text;
    document.body.appendChild(textArea);
  }

  function selectText() {
    var range, selection;

    if (isOS()) {
      range = document.createRange();
      range.selectNodeContents(textArea);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }
  }

  function copyToClipboard() {
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  copy = function (text) {
    createTextArea(text);
    selectText();
    copyToClipboard();
  };

  return {
    copy: copy,
  };
})(window, document, navigator);

const MovieCard = ({ movie }) => {
  return (
    <div className='movie-info'>
      <div className='row'>
        <div className='col-lg-4'>
          <img
            className='movie-poster'
            src={movie.Poster === 'N/A' ? 'not_available.png' : movie.Poster}
            alt=''
          />
        </div>
        <div className='col-lg-8'>
          <p>
            <strong>Title:</strong> {`${movie.Title}`}
          </p>
          <p>
            <strong>Year:</strong> {`${movie.Year}`}
          </p>
          <p>
            <strong>imdb ID:</strong> {`${movie.imdbID}`}
          </p>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  // const [nominateStatus, setNominateStatus] = useState([]);
  const [msg, setMsg] = useState('');
  const [msgErr, setMsgErr] = useState(false);
  const [nominated, setNominated] = useState([]);
  const [initLocalStorageLoaded, setInitLocalStorageLoaded] = useState(false);
  const [msgTimeoutID, setMsgTimeoutID] = useState(null);
  // message banner helper function
  const setMessage = (msg, err, time) => {
    const delay = time || 3000;
    setMsg(msg);
    setMsgErr(err);
    if (msgTimeoutID) {
      clearTimeout(msgTimeoutID);
    }
    setMsgTimeoutID(
      setTimeout(() => {
        setMsg('');
      }, delay)
    );
  };

  // ============================================= helpers for loading movie info from api =============================================
  const searchByTitle = () => {
    return new Promise((resolve, reject) => {
      fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${pmdbapi_key}`)
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.Response === 'True') {
              resolve(result.Search);
            } else {
              reject(result.Error);
            }
          },
          (error) => {
            reject(error);
          }
        );
    });
  };

  const searchById = (id) => {
    return new Promise((resolve, reject) => {
      fetch(`https://www.omdbapi.com/?i=${id}&apikey=${pmdbapi_key}`)
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.Response === 'True') {
              resolve(result);
            } else {
              reject(result.Error);
            }
          },
          (error) => {
            reject(error);
          }
        );
    });
  };

  const loadFromIds = (ids) => {
    const promises = [];
    ids.forEach(async (id, idx) => {
      if (idx >= nominate_size) {
        setMessage(
          `Error: Your share line contains more than ${nominate_size} movies, only 5 will be loaded`,
          true,
          5000
        );
      } else {
        promises.push(searchById(id));
      }
    });
    Promise.all(promises)
      .then((results) => {
        setNominated(results);
      })
      .catch((err) => {
        setMessage(`Error: Got error while loading shared movies. ${err}`);
      });
  };

  // ======================================== on vairable change and component init ========================================
  useEffect(() => {
    // process share link
    if (window.location.pathname === '/share') {
      const urlParams = new URLSearchParams(window.location.search);
      const ids_str = urlParams.get('ids');
      if (ids_str.length === 0) {
        setMessage('Error: Share Link has no content', true, 5000);
      }
      const ids = urlParams.get('ids').split(',');
      // load the movies
      loadFromIds(ids);
    } else if (localStorage.getItem('movie_ids')) {
      const ids = localStorage.getItem('movie_ids').split(',');
      loadFromIds(ids);
    }
    // eslint-disable-next-line
  }, []);

  // whenever nomination list changes, save a copy of their ids to localStorage.
  useEffect(() => {
    if (initLocalStorageLoaded) {
      localStorage.setItem(
        'movie_ids',
        nominated.map((movie) => movie.imdbID).join(',')
      );
      if (nominated.size === nominate_size) {
        setMessage(
          `${nominate_size} movies are nominated, you reached the limit`,
          false
        );
      }
    } else {
      setInitLocalStorageLoaded(true);
    }
    // eslint-disable-next-line
  }, [nominated, initLocalStorageLoaded]);

  // When input (searchTerm) changes, do a search with AP
  useEffect(() => {
    if (searchTerm === '') {
      setMovies([]);
    } else {
      searchByTitle()
        .then((result) => {
          setMovies(result);
        })
        .catch((err) => {
          setMessage(err, true);
          setMovies([]);
        });
    }
    // eslint-disable-next-line
  }, [searchTerm]);

  // ============================================= onClick events =============================================
  const nominateOnCLick = (idx, movie) => {
    console.log('click nominate');
    if (isNominated(movie)) {
      setMessage(
        "Error: Invalid Click on Nominate Button (Shouldnn't be able to click)",
        true
      );
    } else {
      if (nominated.length >= nominate_size) {
        setMessage(
          `You reach the max nomination limit: ${nominate_size}`,
          true
        );
      } else {
        setNominated([...nominated, movie]);
      }
    }
  };

  const removeAnimation = (element) => {
    $(element).addClass('removing');
    $(element).children('*').addClass('removing');
  };

  const removeOnClick = (e, movie) => {
    removeAnimation(e.target.parentElement);
    setTimeout(() => {
      setNominated(nominated.filter((m) => m.imdbID !== movie.imdbID));
    }, 850);
  };

  const shareOnClick = (e) => {
    const id_arr = nominated.map((movie) => movie.imdbID);
    if (id_arr.length === 0) {
      setMessage('Nothing to Share', true);
      return;
    }
    const urlParams = new URLSearchParams();
    urlParams.set('ids', id_arr);
    const share_link = `${
      window.location.origin
    }/share?${urlParams.toString()}`;
    window.Clipboard.copy(share_link);
    setMessage(
      `Your share link is generated and saved to your clipboard: ${share_link}`,
      false,
      10000
    );
  };

  const isNominated = (movie) => {
    for (let i = 0; i < nominated.length; i++) {
      if (nominated[i].imdbID === movie.imdbID) return true;
    }
    return false;
  };

  return (
    <div className='App'>
      <div className='container pt-5'>
        <h2 id='title'>The Shoppies</h2>

        <i className='far fa-share-square' onClick={shareOnClick}></i>
        <a
          id='source-code-link'
          target='_blank'
          rel='noreferrer'
          href='https://github.com/HuakunShen/shopify-frontend-challenge'
        >
          <i className='fas fa-code'></i>
        </a>
        <div className='card'>
          <div className='card-body'>
            <label htmlFor='search-box'>Movie Title</label>
            <div className='input-group'>
              <div className='input-group-prepend'>
                <button className='btn btn-outline-secondary'>
                  <i className='fas fa-search'></i>
                </button>
              </div>

              <input
                id='search-box'
                type='text'
                value={searchTerm}
                className='form-control'
                placeholder='Search'
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        {msg ? (
          <div
            className={`alert alert-${
              msgErr ? 'danger' : 'primary'
            } mt-3 sticky-top`}
            role='alert'
          >
            {msg}
          </div>
        ) : null}

        <div className='row mt-3'>
          <div className='col-md-6'>
            <div className='card'>
              <div id='movie-list' className='card-body'>
                <h3>Results For {searchTerm ? `"${searchTerm}"` : '...'}</h3>

                <ul className='list-group'>
                  {movies.map((movie, idx) => {
                    return (
                      <li
                        key={idx}
                        className='list-group-item d-flex justify-content-between align-items-center'
                      >
                        {<MovieCard movie={movie} />}
                        <button
                          className='btn btn-primary btn-sm'
                          disabled={isNominated(movie)}
                          onClick={() => nominateOnCLick(idx, movie)}
                        >
                          Nominate
                        </button>
                      </li>
                    );
                  })}
                  {movies.length !== 0 ? null : (
                    <div className='d-flex justify-content-center pt-4'>
                      <div className='spinner-border' role='status'>
                        <span className='sr-only'>Loading...</span>
                      </div>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-body'>
                <h3>Nominations</h3>
                <ul className='list-group'>
                  {nominated.map((movie) => {
                    return (
                      <li
                        key={movie.imdbID}
                        className='list-group-item d-flex justify-content-between align-items-center'
                      >
                        {<MovieCard movie={movie} />}
                        <button
                          className='btn btn-danger btn-sm'
                          disabled={false}
                          onClick={(e) => removeOnClick(e, movie)}
                        >
                          Remove
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
