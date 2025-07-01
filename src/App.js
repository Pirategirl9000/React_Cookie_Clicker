import "./styles.css";
import { useState } from "react";
import { useEffect } from "react";
import cookieImg from "./cookie.png";

export default function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

/**
 * Serves as the root directory for the game
 * @returns JSX code for rendering screen
 */
function Game() {
  const [cookies, setCookies] = useState(0);
  const [clickModifier, setClickModifier] = useState(1);
  const SCALINGFACTOR = 1.1;
  const GROWTHMULTIPLIER = 1.1;

  const cpsDict = {  // defines the cookies per second of each producer
    clickers: 1,
    grandmas: 5
  } 

  const basePriceDict = {  // defines the base price of each producer
    clickers: 5,
    grandmas: 25
  }
  const getNewPrice = (basePrice, CPS, quantity) => {return (basePrice * ((++quantity * CPS) ** SCALINGFACTOR) * (GROWTHMULTIPLIER ** quantity))};

  const [clickers, setClickers] = useState({
    count: 0,
    price: basePriceDict.clickers,
    multiplier: 1,
  });

  const [grandmas, setGrandmas] = useState({
    count: 0,
    price: basePriceDict.grandmas,
    multiplier: 1,
  });

  function Cookie() {
    return (
      <button
        className="cookie"
        onClick={() => setCookies(cookies + clickModifier)}
      >
        <img src={cookieImg} style={{width: 100 + "px", height: 100 + "px"}}/>
      </button>
    );
  }

  function Clicker() {
    function handleClick() {
      console.log(basePriceDict.clickers);
      console.log(cpsDict.clickers);
      console.log(clickers.count);
      if (cookies >= clickers.price) {
        setClickers((clickers) => ({
          ...clickers, // brings over the multiplier
          count: clickers.count + 1,
          price: getNewPrice(basePriceDict.clickers, cpsDict.clickers, clickers.count),
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
    function handleClick() {
      if (cookies >= grandmas.price) {
        setGrandmas((grandmas) => ({
          ...grandmas,
          count: grandmas.count + 1,
          price: getNewPrice(basePriceDict.grandmas, cpsDict.grandmas, grandmas.count),
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
          grandmas.count * cpsDict.grandmas * grandmas.multiplier
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
      <h3>Cookies: {cookies}</h3>
      <Cookie />
      <br/>
      <br/>
      <ul style={{listStyleType: "none"}}>
      <li>Buy Clicker: <Clicker /></li>
      <li>Buy Grandma: <Grandma /></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      
      </ul>
    </>
  );
}
