import React from "react";
const SearchResultCard = ({ result }) => {
  return (
    <div className="result">
      <div className="result-image">
        <img src={result.picture} alt={result.name} />
      </div>
      <div className="result-content">
        <h4>{result.name}</h4>
        <p>{result.about}</p>
      </div>
    </div>
  );
};

export default SearchResultCard;
