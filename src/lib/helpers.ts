export function getInitials(...names: Array<string>) {
  return names
    .map((item) => item.at(0))
    .join('')
    .slice(0, 2)
}
