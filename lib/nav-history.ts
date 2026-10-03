// Remembers the previous in-app path across client-side navigations, so a
// "Back" button can return to where the visitor actually came from.
let current: string | null = null;
let previous: string | null = null;

export function recordPath(path: string) {
  if (path === current) return;
  previous = current;
  current = path;
}

export function previousPath() {
  return previous;
}
