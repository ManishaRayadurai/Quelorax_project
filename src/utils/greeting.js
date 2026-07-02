// Returns a real-time greeting based on the visitor's current local hour.
export function getGreeting(date = new Date()) {
    const hour = date.getHours();
    if (hour < 5)  return "Good Night";
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 21) return "Good Evening";
    return "Good Night";
}

// Returns today's date formatted like "Tuesday, 30 June 2026".
export function getTodayLabel(date = new Date()) {
    return date.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}
