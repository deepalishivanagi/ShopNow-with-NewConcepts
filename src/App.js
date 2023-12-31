import "./style2.css";
import ListOfItems from "./ListOfItems.js";
import Cart from "./cart.js";
import ItemBill from "./ItemBill";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Wishlist from "./Wishlist";
import { useEffect } from "react";

import ItemDetailPage from "./ItemDetailPage";
import { useSelector, useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch();

  async function callServer() {
    const response = await fetch("https://fakestoreapi.com/products?limit=8");
    const data = await response.json();
    var temp = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < data.length; i++) {
      const presentVal = data[i];
      temp[i] = { ...presentVal, count: 0, AddTolist: 0 };
    }

    dispatch({ type: "initialArraySet", temp: temp });

    const val = data[0].title;
    console.log(val);
  }

  useEffect(() => {
    callServer();
  }, []);

  return (
    <div className="App">
      <Router>
        <nav>
          <h1>Shopping cart</h1>
          <Link class="link" to="/ListOfItems">
            {" "}
            ListOfItems{" "}
          </Link>
          <Link class="link" to="/ItemBill">
            {" "}
            TotalItemBill{" "}
          </Link>
          <Link class="link" to="/Wishlist">
            Wishlist Items
          </Link>
          <Cart />
        </nav>

        <Routes>
          <Route path="/ListOfItems" element={<ListOfItems />} />
          <Route path="/ItemBill" element={<ItemBill />} />
          <Route path="/ItemBill2" element={<ItemBill />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/Wishlist2" element={<Wishlist />} />
          <Route path="/ItemDetailPage/:Item_id" element={<ItemDetailPage />} />
          <Route path="*" element={<ListOfItems />} />
        </Routes>
      </Router>
    </div>
  );
}
