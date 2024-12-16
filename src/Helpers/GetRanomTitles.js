function GetRandomTitles(arr, count) {
  const shuffled = [...arr].filter(m => m.poster);

  
  // Shuffle the array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  // Return the first `count` elements
  return shuffled.slice(0, count);
}

export default GetRandomTitles;
