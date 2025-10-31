export const motivationalQuotes = [
  "Small steps every day.",
  "Progress, not perfection.",
  "Your only limit is you.",
  "Believe in yourself.",
  "Make it happen.",
  "Push yourself, because no one else will.",
  "Great things never come from comfort zones.",
  "Success starts with self-discipline.",
  "Train like a beast, look like a beauty.",
  "The only bad workout is the one that didn't happen.",
  "Stronger every day.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "Don't wish for it, work for it.",
  "Sweat is magic. Cover yourself in it daily.",
  "The pain you feel today will be the strength you feel tomorrow."
];

export const getRandomQuote = () => {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
};
