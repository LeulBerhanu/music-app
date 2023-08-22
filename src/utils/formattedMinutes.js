import moment from "moment";

export default function formattedMinutes(durationInSeconds) {
  let duration = moment.duration(durationInSeconds, "seconds");
  let minutes = duration.minutes();
  let seconds = duration.seconds().toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
}
