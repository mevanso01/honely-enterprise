import React from "react";

export default function ReportSearch() {
  return (
    <div
      className="search-input-wrapper"
      style={{ background: "white", padding: "2px", width: '100%' }}
    >
      <input
        type="text"
        autoFocus
        id="search-input-simple"
        className="search-input"
        placeholder="Enter the address for the property report"
        autoComplete="off"
      ></input>
      <svg
        width="20"
        height="24"
        viewBox="0 0 20 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="9" cy="9" r="8.25" stroke="black" stroke-width="1.5" />
        <line
          x1="18.9481"
          y1="22.5555"
          x2="13.4071"
          y2="15.4634"
          stroke="black"
          stroke-width="1.5"
        />
      </svg>
    </div>
  );
}
