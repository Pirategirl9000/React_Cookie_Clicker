import "./styles.css";
import { useState } from "react";
import { useEffect } from "react";

export default function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

function Game() {
  const [cookies, setCookies] = useState(0);
  const [clickModifier, setClickModifier] = useState(1);

  const [clickers, setClickers] = useState({
    count: 0,
    price: 5,
    multiplier: 1,
  });

  const [grandmas, setGrandmas] = useState({
    count: 0,
    price: 25,
    multiplier: 1,
  });

  function Cookie() {
    return (
      <button
        className="cookie"
        onClick={() => setCookies(cookies + clickModifier)}
      >
        {cookies}
      </button>
    );
  }

  function Clicker() {
    let getNewPrice = function () {
      return 3 ** (clickers.count + 1) + 4;
    };

    function handleClick() {
      if (cookies >= clickers.price) {
        setClickers((clickers) => ({
          ...clickers, // brings over the multiplier
          count: clickers.count + 1,
          price: getNewPrice(), // (clicker.count + 1) to signify the clicker it is adding
        }));

        setCookies(cookies - clickers.price);
      }
    }

    return (
      <button className="clicker" onClick={handleClick}>
        {clickers.price}
      </button>
    );
  }

  function Grandma() {
    let getNewPrice = function () {
      return 5 ** (grandmas.count + 1) + 24;
    };

    function handleClick() {
      if (cookies >= grandmas.price) {
        setGrandmas((grandmas) => ({
          ...grandmas,
          count: grandmas.count + 1,
          price: getNewPrice(),
        }));

        setCookies(cookies - grandmas.price);
      }
    }

    return (
      <button className="grandmas" onClick={handleClick}>
        {grandmas.price}
      </button>
    );
  }

  /*
   * Must be updated for each new CPS OBJECT
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCookies(
        (prevCookies) =>
          prevCookies +
          clickers.count * clickers.multiplier +
          grandmas.count * 5 * grandmas.multiplier
      );
    }, 1000); // end of setInterval
 
    /*
    * Cleanup function
    * When a dependency changes then it will start by cleaning up by running the below function
    * Then it will redefine the array
    */

    return () => clearInterval(interval);  // get rid of old interval to make new one
  }, [clickers, grandmas]);  // Dependency array, when these change the useEffect gets called

  return (
    <>
      <Cookie />
      <Clicker />
      <Grandma />
    </>
  );
}
