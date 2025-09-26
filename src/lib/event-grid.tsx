import {
  Locale,
  format,
  getDay,
  getHours,
  getMinutes,
  isSameWeek,
  startOfMinute,
  isEqual,
  isBefore,
  isAfter,
} from "date-fns";

import { Days } from "./use-weekview";
import { Event } from "./weekview";

function eventsOverlap(a: Event, b: Event) {
  return isBefore(a.startDate, b.endDate) && isAfter(a.endDate, b.startDate);
}

export default function EventGrid({
  days,
  events,
  weekStartsOn,
  locale,
  minuteStep,
  rowHeight,
  onEventClick,
}: {
  days: Days;
  events?: Event[];
  weekStartsOn: Day;
  locale?: Locale;
  minuteStep: number;
  rowHeight: number;
  onEventClick?: (event: Event) => void;
}) {
  const sameWeekEvents = (events || []).filter((event) =>
    isSameWeek(days[0].date, event.startDate)
  );

  const groupedEvents: { events: Event[]; start: Date }[] = [];

  for (const event of sameWeekEvents) {
    let placed = false;

    for (const group of groupedEvents) {
      if (
        isEqual(startOfMinute(group.start), startOfMinute(event.startDate)) ||
        group.events.some((e) => eventsOverlap(e, event))
      ) {
        group.events.push(event);
        placed = true;
        break;
      }
    }

    if (!placed) {
      groupedEvents.push({ start: event.startDate, events: [event] });
    }
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${days[0].cells.length}, minmax(${rowHeight}px, 1fr))`,
        paddingLeft: 43,
      }}
    >
      {groupedEvents.map((group, groupIndex) => {
        const earliestStart = group.events.reduce(
          (earliest, e) =>
            isBefore(e.startDate, earliest) ? e.startDate : earliest,
          group.events[0].startDate
        );

        const latestEnd = group.events.reduce(
          (latest, e) => (isAfter(e.endDate, latest) ? e.endDate : latest),
          group.events[0].endDate
        );

        const start =
          getHours(earliestStart) * 2 +
          1 +
          Math.floor(getMinutes(earliestStart) / minuteStep);

        const end =
          getHours(latestEnd) * 2 +
          1 +
          Math.ceil(getMinutes(latestEnd) / minuteStep);

        const marginTop =
          ((getMinutes(earliestStart) % minuteStep) / minuteStep) * rowHeight;

        const marginBottom =
          (rowHeight -
            ((getMinutes(latestEnd) % minuteStep) / minuteStep) * rowHeight) %
          rowHeight;

        const columnIndex = getDay(earliestStart) - weekStartsOn + 1;

        return (
          <div
            key={groupIndex}
            className="relative flex flex-col transition-all bg-cw-primary-lightest border-cw-primary-lighter border-dashed border rounded-md shadow-sm"
            style={{
              gridRowStart: start,
              gridRowEnd: end + 1,
              gridColumnStart: columnIndex,
              gridColumnEnd: "span 1",
              marginTop: marginTop + 4,
              marginBottom: marginBottom + 4,
              marginInline: 4,
            }}
          >
            {group.events
              .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
              .map((event, i) => (
                <div
                  key={event.id}
                  className={`px-2 py-1  text-xs leading-4 bg-cw-primary-lightest border-cw-primary-lighter hover:bg-cw-primary-lighter transition cursor-pointer ${
                    i < group.events.length - 1 ? "border-b border-dashed" : ""
                  }`}
                  onClick={() => onEventClick?.(event)}
                  title={event.title}
                >
                  <p className="text-cw-primary text-opacity-70 leading-4">
                    {format(new Date(event.startDate), "H:mm", {
                      weekStartsOn,
                      locale,
                    })}
                    -
                    {format(new Date(event.endDate), "H:mm", {
                      weekStartsOn,
                      locale,
                    })}
                  </p>
                  <p className="font-semibold text-cw-primary">
                    {event.bannerProductName} | {event.channelName}
                  </p>
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
}
