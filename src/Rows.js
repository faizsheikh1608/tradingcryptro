const Rows = (props) => {
  return (
    <table>
      <tbody>
        {props.data.map((curr) => {
          return (
            <tr key={curr.id}>
              <td>
                <img src={curr.image} alt={curr.name}></img>
              </td>
              <td>{curr.name}</td>

              <td>{curr.symbol.toUpperCase()}</td>
              <td>
                {"$"}
                {curr.current_price}
              </td>
              <td>
                {"$"}
                {curr.total_volume.toLocaleString()}
              </td>
              <td
                className={
                  curr.price_change_percentage_24h > 0 ? "positive" : "negative"
                }
              >
                {curr.price_change_percentage_24h.toFixed(2)}
                {"%"}
              </td>
              <td>
                {"Mkt Cap"}
                {curr.market_cap.toLocaleString()}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Rows;
