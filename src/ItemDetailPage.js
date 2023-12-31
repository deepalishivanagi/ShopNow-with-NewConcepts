import { useParams } from "react-router-dom";
import "./ItemDetailPage.css";
import { useSelector } from "react-redux";

export default function ItemDetailPage() {
  const { Item_id } = useParams();

  const state = useSelector((state) => state.AppState);

  var temp = [];

  for (var i = 0; i < state.DataArray.length; i++) {
    if (state.DataArray[i].id == Item_id) {
      temp.push(state.DataArray[i]);
    }
  }

  return (
    <div className="DetailPage-flex-container">
      <div id="Image-Container" style={{ height: "50%" }}>
        <img src={temp[0].image}></img>
      </div>
      <div id="Image-detail">
        <h2 id="ItemTitle">{temp[0].title}</h2>

        <hr></hr>

        <h2 id="Itemdesc">
          <span>Description: </span>
          {temp[0].description}
        </h2>
        <h2 id="ItemRate">
          <span>Rate: </span>
          {temp[0].rating.rate}
        </h2>
        <h2 id="ItemPrice">
          <span>Price: </span>Rs. {temp[0].price}
        </h2>
        <h2 id="ItemCategory">
          <span>Category: </span>
          {temp[0].category}
        </h2>
      </div>
    </div>
  );
}
