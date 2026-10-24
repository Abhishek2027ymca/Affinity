// "9:41 PM"
export const formatTime = (date) =>
  date
    ? new Date(date).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    : "";

// "Today" | "Yesterday" | "12 Oct 2026"
export const formatDay = (date) => {
  const d = new Date(date);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" });
};

export const errorMessage = (error, fallback = "Something went wrong") =>
  error?.response?.data?.message || fallback;
