export function hashString(str: string) {
  let hash = 2166136261;

  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

export function getStableImageAssignments(
  coffees: { _id: string }[],
  imageCount: number,
) {
  if (imageCount === 0) return [];

  const assignments: number[] = [];

  coffees.forEach((coffee, index) => {
    const hash = hashString(`${coffee._id}-${index}`);

    let imageIndex = hash % imageCount;

    const previous = assignments[index - 1];
    const previousTwo = assignments[index - 2];

    if (imageCount > 1 && imageIndex === previous) {
      imageIndex = (imageIndex + 1 + (hash % (imageCount - 1))) % imageCount;
    }

    if (imageCount > 2 && imageIndex === previousTwo) {
      imageIndex = (imageIndex + 1) % imageCount;
    }

    assignments.push(imageIndex);
  });

  return assignments;
}