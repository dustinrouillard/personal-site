export function FormatTimeSince(date: Date): string {
  let seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;

  if (Math.floor(interval) == 1) return "Last year";
  if (interval > 1) return `${Math.floor(interval)} years ago`;
  interval = seconds / 2592000;
  if (Math.floor(interval) == 1) return "Last month";
  if (interval > 1) return `${Math.floor(interval)} months ago`;
  interval = seconds / 86400 / 7;
  if (Math.floor(interval) == 1) return "Last week";
  if (interval > 1) return `${Math.floor(interval)} weeks ago`;
  interval = seconds / 86400;
  if (Math.floor(interval) == 1) return "Yesterday";
  if (interval > 1) return `${Math.floor(interval)} days ago`;
  return "Today";
}
