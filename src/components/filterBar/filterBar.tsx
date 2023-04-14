import { useState } from "react";
import "./filterBar.css";

interface IFilterBox {
  bg: string;
  color: string;
  region: string,
  fetchRegionHandler: (region: string) => Promise<void>
}

const FilterBar = ({ bg, color, fetchRegionHandler, region }: IFilterBox) => {
 
  return (
    <div className="filterbar-conatiner">
      <label htmlFor="overlay-input"></label>
      <input className="filterbar input" id="overlay-input" readOnly />
      <div className="filterbar" style={{ background: bg }}></div>
      <div className="input-label-container">
        <label>{region==="all" ? "Filter by region" : region}</label>
        <i className="fa-solid fa-angle-down"></i>
      </div>

      <div className="region-list-container">
        <span style={{ background: bg, paddingTop: "1.5em"}} onClick={(e) => fetchRegionHandler("africa")}>Africa</span>
        <span style={{ background: bg }} onClick={(e) => fetchRegionHandler("america")}>America</span>
        <span style={{ background: bg }} onClick={(e) => fetchRegionHandler("asia")}>Asia</span>
        <span style={{ background: bg }} onClick={(e) => fetchRegionHandler("europe")}>Europe</span>
        <span style={{ background: bg }} onClick={(e) => fetchRegionHandler("oceania")}>Oceania</span>
        <span style={{ background: bg, paddingBottom: "1.5em" }} onClick={(e) => fetchRegionHandler("all")}>All</span>
      </div>
    </div>
  );
};

export default FilterBar;
