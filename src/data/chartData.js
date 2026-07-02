const peakData = [
    { hour: "8AM", tokens: 45, crowd: 65 }, { hour: "9AM", tokens: 78, crowd: 85 },
    { hour: "10AM", tokens: 92, crowd: 95 }, { hour: "11AM", tokens: 88, crowd: 90 },
    { hour: "12PM", tokens: 65, crowd: 72 }, { hour: "1PM", tokens: 55, crowd: 60 },
    { hour: "2PM", tokens: 70, crowd: 75 }, { hour: "3PM", tokens: 85, crowd: 88 },
    { hour: "4PM", tokens: 76, crowd: 80 }, { hour: "5PM", tokens: 50, crowd: 55 },
];
const waitData = [
    { day: "Mon", actual: 24, predicted: 22 }, { day: "Tue", actual: 18, predicted: 20 },
    { day: "Wed", actual: 31, predicted: 28 }, { day: "Thu", actual: 27, predicted: 25 },
    { day: "Fri", actual: 35, predicted: 32 }, { day: "Sat", actual: 42, predicted: 40 },
    { day: "Sun", actual: 15, predicted: 18 },
];
const deptPie = [
    { name: "General OPD", value: 35, color: "#1D4ED8" },
    { name: "Cardiology", value: 20, color: "#06B6D4" },
    { name: "Orthopedics", value: 15, color: "#10B981" },
    { name: "Pediatrics", value: 18, color: "#8B5CF6" },
    { name: "Emergency", value: 12, color: "#F59E0B" },
];
const dailyTokens = [
    { date: "Jun 18", tokens: 312 }, { date: "Jun 19", tokens: 287 },
    { date: "Jun 20", tokens: 345 }, { date: "Jun 21", tokens: 298 },
    { date: "Jun 22", tokens: 421 }, { date: "Jun 23", tokens: 389 },
    { date: "Jun 24", tokens: 356 },
];
const forecastData = [
    { time: "Now", crowd: 85 }, { time: "+1h", crowd: 78 },
    { time: "+2h", crowd: 65 }, { time: "+3h", crowd: 52 },
    { time: "+4h", crowd: 48 }, { time: "+5h", crowd: 62 },
];

export { peakData, waitData, deptPie, dailyTokens, forecastData };
