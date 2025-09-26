import { format, setHours, setMinutes } from "date-fns";
import { WeekView } from "./lib";

function App() {
  return (
    <div className="h-screen">
      <WeekView
        initialDate={new Date()}
        weekStartsOn={1}
        events={[
          {
            id: "1",
            title:
              "Asia Gaming Live video source studio 菲律賓真人視訊遊戲拍攝場地 Live Dealer Casino 探秘",
            startDate: setMinutes(setHours(new Date(), 0), 0),
            endDate: setMinutes(setHours(new Date(), 1), 0),
            bannerProductName: "Asia Gaming",
            channelName: "Live Studio",
          },
          {
            id: "2",
            title: "Guns N' Roses Video Slots™ by NetEnt",
            startDate: setMinutes(setHours(new Date(), 0), 0),
            endDate: setMinutes(setHours(new Date(), 1), 0),
            bannerProductName: "NetEnt",
            channelName: "Slots Channel",
          },
          {
            id: "3",
            title: "Guns N' Roses Video Slots™ by NetEnt Extended",
            startDate: setMinutes(setHours(new Date(), 1), 0),
            endDate: setMinutes(setHours(new Date(), 6), 0),
            bannerProductName: "NetEnt",
            channelName: "Extended Slots",
          },
          {
            id: "4",
            title: "Regular Meeting",
            startDate: setMinutes(setHours(new Date(), 15), 15),
            endDate: setMinutes(setHours(new Date(), 16), 20),
            bannerProductName: "Office",
            channelName: "Meeting Room",
          },
          {
            id: "6",
            title: "Guns N' Roses Video Slots™ by NetEnt Extended",
            startDate: setMinutes(setHours(new Date(), 1), 0),
            endDate: setMinutes(setHours(new Date(), 2), 30),
            bannerProductName: "NetEnt",
            channelName: "Extended Slots",
          },
        ]}
        onCellClick={(cell) => alert(`Clicked ${format(cell.date, "Pp")}`)}
        onEventClick={(event) =>
          alert(
            `${event.title} ${format(event.startDate, "Pp")} - ${format(
              event.endDate,
              "Pp"
            )}`
          )
        }
      />
    </div>
  );
}

export default App;
