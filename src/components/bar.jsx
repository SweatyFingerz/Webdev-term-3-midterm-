import React, { useState, useEffect } from 'react';

function MotivationBar() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [likedQuotes, setLikedQuotes] = useState([]);
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  function getNewQuote() {
    setLoading(true);
    fetch('https://api.adviceslip.com/advice')
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.slip.advice);
        setAuthor("Unknown");
        setLoading(false);
      });
  }

  useEffect(function () {
    getNewQuote();
  }, []);

  function handleLike() {
    const currentQuoteObject = { text: quote, creator: author };
    const isDuplicate = likedQuotes.some((item) => item.text === quote);

    if (isDuplicate) {
      alert("You already liked this one!");
    } else {
      setLikedQuotes([...likedQuotes, currentQuoteObject]);
    }
  }

  const themeClass = darkMode ? "container dark" : "container";

  return (
    <div className={themeClass}>
      <button onClick={() => setDarkMode(!darkMode)} className="toggle-btn">
        {darkMode ? "Light Mode" : " Dark Mode"}
      </button>

      <h1>My Motivation App</h1>

      <div className="card">
        {loading === true ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h3>"{quote}"</h3>
            <p className="author-text">— {author}</p>
          </div>
        )}

        <button onClick={getNewQuote} disabled={loading}>New Quote</button>
        <button onClick={handleLike}>Like ❤️</button>
        <p>Total Likes: {likedQuotes.length}</p>
      </div>

      <button onClick={() => setShowList(!showList)}>
        {showList ? "Hide My Likes" : "Show My Likes"}
      </button>

      {showList && (
        <div className="list-area">
          <input
            type="text"
            placeholder="Search likes..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul>
            {likedQuotes.map(function (item, index) {
              if (item.text.toLowerCase().includes(search.toLowerCase())) {
                return (
                  <li key={index}>
                    "{item.text}" <strong>({item.creator})</strong>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MotivationBar;