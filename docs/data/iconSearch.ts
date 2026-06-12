export function formatIconName(name: string) {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
}

export function getIconAnchor(name: string) {
  return `icon-${formatIconName(name).replace(/\s+/g, '-').toLowerCase()}`;
}

export function getIconSearchText(name: string) {
  const label = formatIconName(name);
  return `${name} ${label} ${label.replace(/\s+/g, '-')} icon svg asset`.toLowerCase();
}
