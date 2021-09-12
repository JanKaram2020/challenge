import {BackToHome} from "../App";
import {Moon, Sun} from "heroicons-react";
import "./styles/_four.scss";
import {useState} from "react";

/*
  Think: How we would use this Dark/Light mode switcher on other potential routes/components in a bigger application.
  Would your solution work for this?
*/
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setValue = (value) => {
    try {
      const valueToStore =
          value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}

const ChallengeFour = () => {
  const [dark, setDark] = useLocalStorage("mode", "true");
  const body = document.querySelector('body');
  const handleClick = () => {
    setDark(!dark);
    if (dark) {
      body.classList.add('lightMode');
    } else {
      body.classList.remove('lightMode');
    }
  }
  const isDark = !body.classList.contains('lightMode');
  return (
      <div className="ch4">
        <BackToHome/>
        <div className="level">
          <div>
            <h1 className={`title is-1 ${isDark ? 'has-text-white' : 'has-text-black'}`}>Challenge 4</h1>
          </div>
          <button className="ch4__dark-mode-btn" onClick={handleClick}>
            {dark ? (<Sun fontSize={30}/>) : <Moon fontSize={30}/>}
          </button>
        </div>
        <h2 className={`subtitle ${isDark ? 'has-text-grey-lighter' : 'has-text-grey-dark'}`}>
          This page is looking a little dark. Mind turning on the lights in here?
          It seems like the toggle button doesn't work...
          <span role="img" aria-label="ponder">
          🤔
        </span>
        </h2>
        <div className={`columns ${isDark ? 'has-text-grey-lighter' : 'has-text-grey-dark'}`}>
          <div className="column">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
              vel dolor massa. Quisque euismod ante nec quam tristique
              sollicitudin. Morbi dolor nisi, vehicula sit amet mi vitae,
              scelerisque vehicula risus. Mauris mauris augue, fermentum id ex
              quis, tempor convallis nulla. Etiam auctor tellus blandit purus
              tristique lacinia. Mauris turpis lorem, ultricies sit amet orci
              hendrerit, sodales sodales tellus. Suspendisse fermentum, tortor
              eget pellentesque lacinia, velit augue consequat odio, ut fermentum
              quam diam id odio. Suspendisse pulvinar quam magna, eget tempor
              neque ullamcorper in.
            </p>
          </div>
          <div className="column">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
              vel dolor massa. Quisque euismod ante nec quam tristique
              sollicitudin. Morbi dolor nisi, vehicula sit amet mi vitae,
              scelerisque vehicula risus. Mauris mauris augue, fermentum id ex
              quis, tempor convallis nulla. Etiam auctor tellus blandit purus
              tristique lacinia. Mauris turpis lorem, ultricies sit amet orci
              hendrerit, sodales sodales tellus. Suspendisse fermentum, tortor
              eget pellentesque lacinia, velit augue consequat odio, ut fermentum
              quam diam id odio. Suspendisse pulvinar quam magna, eget tempor
              neque ullamcorper in.
            </p>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input className="input" type="text" placeholder="Name"/>
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input className="input" type="text" placeholder="Email"/>
          </div>
          <div className="buttons level-right mt-4">
            <button className="button is-primary">Save</button>
            <button className="button is-link">Submit</button>
          </div>
        </div>
      </div>
  );
};

export default ChallengeFour;
