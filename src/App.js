import React, { useState } from 'react';
import './App.css';

const animatedText = "the deployed project";
const nextText = "this is done by [Your Name]";

function App() {
  const [showAnimated, setShowAnimated] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);

  const handleClick = () => {
    setShowAnimated(true);
    setShowNext(false);
    setDisplayed('');
    setIndex(0);
    animateText(animatedText, () => setShowNext(true));
  };

  const animateText = (text, callback) => {
    let i = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      setDisplayed(prev => prev + text[i]);
      i++;
      if (i === text.length) {
        clearInterval(interval);
        if (callback) setTimeout(callback, 700);
      }
    }, 90);
  };

  React.useEffect(() => {
    if (showAnimated && displayed.length === animatedText.length && showNext) {
      // Animate next text
      let i = 0;
      setDisplayed('');
      const interval = setInterval(() => {
        setDisplayed(prev => prev + nextText[i]);
        i++;
        if (i === nextText.length) clearInterval(interval);
      }, 90);
    }
    // eslint-disable-next-line
  }, [showNext]);

  return (
    <div className="App">
      <header className="App-header">
        <button className="fancy-btn" onClick={handleClick}>Click Me</button>
        <h1 className="animated-text">
          {displayed.split('').map((char, idx) => (
            <span key={idx} style={{ animationDelay: `${idx * 0.07}s` }}>{char}</span>
          ))}
        </h1>
      </header>
    </div>
  );
}

export default App;