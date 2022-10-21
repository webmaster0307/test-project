/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 *
 */
import React, { useEffect, useRef, useState } from "react";
import SearchResultCard from "./searchResultCard";

const Menu = () => {
  const [showingSearch, setShowingSearch] = useState(false);
  const [searchResponse, setSearchResponse] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  /**
   * Shows or hides the search container
   * @memberof Menu
   * @param e [Object] - the event from a click handler
   */
  const showSearchContainer = (e) => {
    e.preventDefault();
    setShowingSearch((prev) => !prev);
  };

  /**
   * Calls upon search change
   * @memberof Menu
   * @param e [Object] - the event from a text change handler
   */

  // this handles fetching data from the api based on the query provided by the user
  const onSearch = (e) => {
    const searchInput = e.target.value;
    if (searchInput.length < 2) {
      setSearchResponse([]);
      setSearchTerm("");
      return;
    }
    setSearchTerm(e.target.value);
    fetch(`http://localhost:3035?q=${searchInput}`)
      .then((res) => res.json())
      .then((result) => setSearchResponse(result))
      .catch((err) => setError(err));
  };
  //auto focusing input field
  useEffect(() => {
    searchInputRef.current.focus();
  }, [showingSearch]);

  /**
   * Renders the default app in the window, we have assigned this to an element called root.
   *
   * @returns JSX
   * @memberof App
   */
  return (
    <header className="menu">
      <div className="menu-container">
        <div className="menu-holder">
          <h1>ELC</h1>
          <nav>
            <a href="#" className="nav-item">
              HOLIDAY
            </a>
            <a href="#" className="nav-item">
              WHAT'S NEW
            </a>
            <a href="#" className="nav-item">
              PRODUCTS
            </a>
            <a href="#" className="nav-item">
              BESTSELLERS
            </a>
            <a href="#" className="nav-item">
              GOODBYES
            </a>
            <a href="#" className="nav-item">
              STORES
            </a>
            <a href="#" className="nav-item">
              INSPIRATION
            </a>

            <a href="#" onClick={(e) => showSearchContainer(e)}>
              <i className="material-icons search">search</i>
            </a>
          </nav>
        </div>
      </div>
      <div className={(showingSearch ? "showing " : "") + "search-container"}>
        <input type="text" onChange={(e) => onSearch(e)} ref={searchInputRef} />
        <a href="#" onClick={(e) => showSearchContainer(e)}>
          <i className="material-icons close">close</i>
        </a>
        {searchTerm.length > 1 && searchResponse.length < 1 ? (
          <div className="no-results-wrapper">
            {error ? (
              "Sorry an error occured, try again"
            ) : (
              <div>
                No results found for&nbsp;<strong>{searchTerm}</strong>!{" "}
              </div>
            )}
          </div>
        ) : searchTerm.length > 1 && searchResponse.length ? (
          <>
            <div className="result-info">
              Showing {searchResponse.length > 4 ? 4 : searchResponse.length} of{" "}
              {searchResponse.length} results &nbsp; <a href="#">View all Results</a>
            </div>

            <div className="results-wrapper">
              {searchResponse.slice(0, 4).map((result) => (
                <SearchResultCard result={result} key={result._id} />
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
};

// Export out the React Component
module.exports = Menu;
