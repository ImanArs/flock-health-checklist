export function getChickens() {
  if (typeof window === "undefined") return [];

  const chickens = localStorage.getItem("chickens");
  if (chickens) {
    return JSON.parse(chickens);
  }

  // Default chickens if none exist
  const defaultChickens: never[] = [];

  localStorage.setItem("chickens", JSON.stringify(defaultChickens));
  return defaultChickens;
}

export function saveChickens(chickens) {
  if (typeof window === "undefined") return;
  localStorage.setItem("chickens", JSON.stringify(chickens));
}
