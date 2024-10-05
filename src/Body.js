import { useState, useEffect } from "react";
import Rows from "./Rows";
const Body = () => {
  const [details, setDetails] = useState(null);
  const [tempDetails, setTempDetails] = useState(null);
  const [searchValue, setSearchValue] = useState(null);

  useEffect(() => {
    fetcData();
  }, []);

  const fetcData = async function () {
    const data = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false "
    );

    const json = await data.json();
    console.log(json);
    setDetails(json);
    setTempDetails(json);
  };

  if (details === null) return;

  return (
    <div>
      <div className="nav">
        <div className="search--bar">
          <input
            type="search"
            placeholder="Search By Name Or Symbol"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const temp = details.filter((curr) => {
                  if (
                    curr.name
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) ||
                    curr.symbol
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                  ) {
                    return curr;
                  }
                });
                setTempDetails(temp);
              }
            }}
          ></input>
        </div>
        <div className="btn">
          <button
            onClick={() => {
              const temp = [...details].sort(
                (a, b) => a.market_cap - b.market_cap
              );

              setTempDetails(temp);
            }}
          >
            Sort By Mkt cap
          </button>
          <button
            onClick={() => {
              const temp = [...details].sort(
                (a, b) =>
                  a.price_change_percentage_24h - b.price_change_percentage_24h
              );
              setTempDetails(temp);
            }}
          >
            Sort By Percentage
          </button>
        </div>
      </div>
      <div>
        <Rows data={tempDetails} />
      </div>
    </div>
  );
};

export default Body;
