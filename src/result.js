import React from "react";
import countriesInfo from "world-countries";
import differenceInCalendarDays from "date-fns/difference_in_calendar_days";

const countries = countriesInfo
  .filter(c => c.status === "officially-assigned")
  .sort((c1, c2) => (c1.name.common > c2.name.common ? 1 : -1));

const Result = ({ sortedEntries }) => {
  if (sortedEntries.length === 1) {
    return "Add more";
  }

  const nats = [];

  sortedEntries.forEach((entry, entryIdx) => {
    const natIdx = nats.findIndex(nat => nat.countryCode === entry.countryCode);
    const nextStartDate = sortedEntries[entryIdx + 1]
      ? sortedEntries[entryIdx + 1].startDate
      : new Date();
    const days = differenceInCalendarDays(nextStartDate, entry.startDate);
    if (natIdx !== -1) {
      nats[natIdx].days += days;
    } else {
      nats.push({
        countryCode: entry.countryCode,
        days
      });
    }
  });

  console.log(nats);

  const totalDays = differenceInCalendarDays(
    new Date(),
    sortedEntries[0].startDate
  );
  return (
    <div>
      <div>Total days: {totalDays}</div>
      <ul>
        {nats.map(nat => (
          <li key={nat.countryCode}>
            {nat.countryCode} {nat.days * 100 / totalDays}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Result;
