export function msToTime(ms: number) {
  let seconds = (ms / 1000).toFixed(1);
  let minutes = (ms / (1000 * 60)).toFixed(1);
  let hours = (ms / (1000 * 60 * 60)).toFixed(1);
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
  if (~~seconds < 60) return seconds + " Sec";
  else if (~~minutes < 60) return minutes + " Min";
  else if (~~hours < 24) return hours + " Hrs";
  else return days + " Days";
}

export function shortMsFormat(ms: number) {
  let seconds = (ms / 1000).toFixed(1);
  let minutes = (ms / (1000 * 60)).toFixed(1);
  let hours = (ms / (1000 * 60 * 60)).toFixed(1);
  if (~~seconds < 60) return seconds + " sec" + (~~seconds > 1 ? "s" : "");
  else if (~~minutes < 60) return minutes + " min" + (~~minutes > 1 ? "s" : "");
  else if (~~hours) return hours + " hr" + (Number(hours) > 1 ? "s" : "");
}

export function msToHHMMSS(ms: number) {
  let seconds = Math.floor((ms / 1000) % 60)
    .toString()
    .padStart(2, "0");
  let minutes = Math.floor((ms / (1000 * 60)) % 60)
    .toString()
    .padStart(2, "0");
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
    .toString()
    .padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}
