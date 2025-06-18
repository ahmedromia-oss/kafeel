export const createLocationString = (experiences: { city?: string | null; country?: string | null }[]) => {
  if (!experiences || !experiences.length) return '';

  // Extract unique locations
  const locationSet = new Set<string>();
  
  experiences.forEach(exp => {
    if (exp.country) {
      if (exp.city) {
        locationSet.add(`${exp.country}(${exp.city})`);
      } else {
        locationSet.add(exp.country);
      }
    }
  });

  return Array.from(locationSet).join(', ');
};

