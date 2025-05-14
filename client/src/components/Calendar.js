import React, { useState, useEffect } from "react";
import "./Calendar.css";

const weekdays = ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai", "Sunnuntai"];
const defaultHours = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
const extraHours = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

const Calendar = () => {
  const loadStoredData = (key, defaultValue) => {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : defaultValue;
  };

  const [events, setEvents] = useState(() => loadStoredData("calendarEvents", {}));
  const [visibleHoursByDay, setVisibleHoursByDay] = useState(() =>
    loadStoredData("visibleHoursByDay", weekdays.reduce((acc, day) => ({ ...acc, [day]: [...defaultHours] }), {}))
  );


  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem("visibleHoursByDay", JSON.stringify(visibleHoursByDay));
  }, [visibleHoursByDay]);

  const handleInputChange = (day, hour) => (event) => {
    setEvents({
      ...events,
      [`${day}-${hour}`]: event.target.value,
    });
  };

  const toggleHour = (hour) => {
    setVisibleHoursByDay((prev) => {
      const updatedHours = { ...prev };
      weekdays.forEach((day) => {
        if (updatedHours[day].includes(hour)) {
          updatedHours[day] = updatedHours[day].filter((h) => h !== hour);
        } else {
          updatedHours[day] = [...updatedHours[day], hour].sort();
        }
      });
      return updatedHours;
    });
  };

  return (
    <div className="calendar-container">
      <div className="extra-hours-dropdown">
        <h4>Lisää tai poista kellonaikoja:</h4>
        <div className="extra-hours-buttons">
          {extraHours.map((hour) => (
            <button key={hour} className="add-hour-button" onClick={() => toggleHour(hour)}>
              {hour} {visibleHoursByDay["Maanantai"].includes(hour) ? "−" : "+"}
            </button>
          ))}
        </div>
      </div>

      <table className="calendar-table">
        <thead>
          <tr>
            <th>Kellonaika</th>
            {weekdays.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.values(visibleHoursByDay)[0].map((hour) => (
            <tr key={hour}>
              <td className="hour-cell">{hour}</td>
              {weekdays.map((day) => (
                <td key={day} className="event-slot">
                  {visibleHoursByDay[day].includes(hour) ? (
                    <input
                      type="text"
                      value={events[`${day}-${hour}`] || ""}
                      onChange={handleInputChange(day, hour)}
                      placeholder="Lisää tapahtuma"
                    />
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;