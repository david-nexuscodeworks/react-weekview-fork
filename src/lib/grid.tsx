import { ReactNode } from "react";
import { getMinutes, getUnixTime } from "date-fns";

import { Cell, Days } from "./use-weekview";

export default function Grid({
  days,
  rowHeight,
  CellContent,
  onCellClick,
}: {
  days: Days;
  rowHeight: number;
  onCellClick?: (cell: Cell) => void;
  CellContent?: (cell: Cell) => ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `auto repeat(${days.length}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${days[0].cells.length}, minmax(${rowHeight}px, 1fr))`,
      }}
    >
      {/* Time column */}
      {days[0].cells.map((cell, cellIndex) =>
        getMinutes(cell.date) === 0 ? (
          <div
            key={getUnixTime(cell.date)}
            className="flex items-start justify-center p-1 text-xs text-neutral-400 border-b border-t border-gray-100"
            style={{
              gridColumnStart: 1,
              gridColumnEnd: 2,
              gridRowStart: cellIndex + 1,
              gridRowEnd: cellIndex + 2,
            }}
          >
            {cell.hourAndMinute}
          </div>
        ) : (
          <div
            key={getUnixTime(cell.date)}
            style={{
              gridColumnStart: 1,
              gridColumnEnd: 2,
              gridRowStart: cellIndex + 1,
              gridRowEnd: cellIndex + 2,
            }}
          />
        )
      )}

      {/* Main grid cells */}
      {days.map((day, dayIndex) =>
        day.cells.map((cell, cellIndex) => (
          <button
            key={getUnixTime(cell.date)}
            className="relative border-b border-l border-gray-100 transition-colors cursor-pointer hover:bg-neutral-100 disabled:bg-neutral-50"
            style={{
              gridRowStart: cellIndex + 1,
              gridRowEnd: cellIndex + 2,
              gridColumnStart: dayIndex + 2,
              gridColumnEnd: dayIndex + 3,
            }}
            disabled={cell.disabled}
            onClick={() => onCellClick?.(cell)}
          >
            {CellContent && CellContent(cell)}
          </button>
        ))
      )}
    </div>
  );
}
