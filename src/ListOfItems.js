import "./style2.css";
import Item from "./Item.js";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { lazy } from "react";
import { Suspense } from "react";

export default function ListOfItems() {
  var indents = [];
  var ShowingDataArray = [];
  const state = useSelector((state) => state.AppState.DataArray);
  const statefilt = useSelector((state) => state.FilterState);
  const SideBarComponent = lazy(()=>import('./Sidebar'));

  function getDataAfterPriceFilter(datalist) {
    if (
      "priceFilter" in statefilt.FilterState &&
      statefilt.FilterState.priceFilter == true
    ) {
      let temp = statefilt.FilterState.highestValue;
      var indents = [];
      for (var i = 0; i < datalist.length; i++) {
        if (datalist[i].price <= temp) {
          indents.push(datalist[i]);
        }
      }
      return indents;
    } else {
      return datalist;
    }
  }

  function getDataAfterSortPriceFilter(datalist) {
    if (
      "sortfilter" in statefilt.FilterState &&
      statefilt.FilterState.sortfilter == true &&
      statefilt.FilterState.sortway == "lowtohigh"
    ) {
      var indents = [...datalist];
      indents.sort((first, second) => first.price - second.price);
      return indents;
    } else if (
      "sortfilter" in statefilt.FilterState &&
      statefilt.FilterState.sortfilter == true &&
      statefilt.FilterState.sortway == "hightolow"
    ) {
      var indents = [...datalist];
      indents.sort((first, second) => second.price - first.price);
      return indents;
    } else {
      return datalist;
    }
  }

  function getDataAfterRateFilter(datalist) {
    if (
      "ratefilter" in statefilt.FilterState &&
      statefilt.FilterState.ratefilter == true &&
      statefilt.FilterState.rate == "high"
    ) {
      var indents = [];
      for (var i = 0; i < datalist.length; i++) {
        if (datalist[i].rating.rate >= 4) {
          indents.push(datalist[i]);
        }
      }
      return indents;
    } else if (
      "ratefilter" in statefilt.FilterState &&
      statefilt.FilterState.ratefilter == true &&
      statefilt.FilterState.rate == "mid"
    ) {
      var indents = [];
      for (var i = 0; i < datalist.length; i++) {
        if (datalist[i].rating.rate <= 4 && datalist[i].rating.rate >= 3) {
          indents.push(datalist[i]);
        }
      }
      return indents;
    } else if (
      "ratefilter" in statefilt.FilterState &&
      statefilt.FilterState.ratefilter == true &&
      statefilt.FilterState.rate == "low"
    ) {
      var indents = [];
      for (var i = 0; i < datalist.length; i++) {
        if (datalist[i].rating.rate <= 3) {
          indents.push(datalist[i]);
        }
      }
      return indents;
    }

    return datalist;
  }

  function getDataAfterCategoryFilter(datalist) {
    if (
      "sortbycategory" in statefilt.FilterState &&
      statefilt.FilterState.sortbycategory == true &&
      statefilt.FilterState.categoryValue.length !== 0
    ) {
      var indents = [];
      for (var i = 0; i < datalist.length; i++) {
        if (
          statefilt.FilterState.categoryValue.includes(datalist[i].category)
        ) {
          indents.push(datalist[i]);
        }
      }

      return indents;
    }

    return datalist;
  }

  function CreateShowingDataArray() {
    let data1 = getDataAfterPriceFilter(state);

    let data2 = getDataAfterSortPriceFilter(data1);

    let data3 = getDataAfterRateFilter(data2);

    let data4 = getDataAfterCategoryFilter(data3);

    return data4;
  }

  ShowingDataArray = CreateShowingDataArray();

  for (var i = 0; i < ShowingDataArray.length; i++) {
    indents.push(
      <Item
        index={i}
        SingleItemData={ShowingDataArray[i]}
        disableaddbtn={false}
      />
    );
  }

  return (
    <div className="ListOfItems-Main">
      <Suspense fallback={<div>Loading page....</div>}>
        <SideBarComponent/>
      </Suspense>
      {/* <Sidebar /> */}
      <div className="items-container">
        {indents.map((item, index) => {
          return (
            <div className="actual-item" value={item} key={index}>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
