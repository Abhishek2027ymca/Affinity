import React from "react";

// pixel glyphs for the caption buttons
const Glyph = ({ width, height, d }) => (
  <svg width={width} height={height} shapeRendering="crispEdges" aria-hidden="true">
    <path d={d} fillRule="evenodd" />
  </svg>
);
const MINIMIZE = "M0 6h6v2H0z";
const MAXIMIZE = "M0 0h9v9H0zM1 2v6h7V2z";
const CLOSE =
  "M0 0h2v1H0zM6 0h2v1H6zM1 1h2v1H1zM5 1h2v1H5zM2 2h4v1H2zM3 3h2v1H3zM2 4h4v1H2zM1 5h2v1H1zM5 5h2v1H5zM0 6h2v1H0zM6 6h2v1H6z";

// Win98 caption: bold title on the navy gradient, then _ □ × on the right.
// Without onClose the × is just for looks; dialogs pass controls={false} to drop _ and □.
const TitleBar = ({ title, id, onClose, closeLabel = "Close", controls = true }) => (
  <div className="win-titlebar">
    <span id={id} className="truncate">
      {title}
    </span>
    <div className="flex shrink-0">
      {controls && (
        <>
          <button type="button" aria-label="Minimize" className="win-caption-btn">
            <Glyph width={6} height={8} d={MINIMIZE} />
          </button>
          <button type="button" aria-label="Maximize" className="win-caption-btn">
            <Glyph width={9} height={9} d={MAXIMIZE} />
          </button>
        </>
      )}
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        title={closeLabel}
        className="win-caption-btn ml-[2px]"
      >
        <Glyph width={8} height={7} d={CLOSE} />
      </button>
    </div>
  </div>
);

export default TitleBar;
