export const overLappingDates = (experiences: { startDate: Date; endDate: Date }[]) => {
   if (!experiences || !experiences.length) return 0;

  // Convert string dates to Date objects and handle null end dates
  const ranges = experiences.map(exp => ({
    start: typeof exp.startDate === 'string' ? new Date(exp.startDate) : exp.startDate,
    end: exp.endDate ? (typeof exp.endDate === 'string' ? new Date(exp.endDate) : exp.endDate) : new Date()
  }));

  // Sort by start date
  ranges.sort((a, b) => a.start.getTime() - b.start.getTime());

  const merged = [ranges[0]];

  for (let i = 1; i < ranges.length; i++) {
    const last = merged[merged.length - 1];
    const current = ranges[i];

    if (current.start <= last.end) {
      // There's overlap, merge the ranges
      last.end = new Date(Math.max(last.end.getTime(), current.end.getTime()));
    } else {
      // No overlap, add new range
      merged.push(current);
    }
  }

  // Calculate total years from merged ranges
  const totalMilliseconds = merged.reduce((total, range) => {
    return total + (range.end.getTime() - range.start.getTime());
  }, 0);

  // Convert milliseconds to years (approximate)
  const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25; // Account for leap years
  const totalYears = totalMilliseconds / millisecondsPerYear;

  return Math.round(totalYears * 100) / 100; // Round to 2 decimal places
};


