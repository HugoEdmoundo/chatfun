export function stringToHue(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

const TELEGRAM_GROUP_COLORS = [
  '#e17076', '#faa774', '#a2c86b', '#6fc9b7', '#7ba3ff',
  '#a591d3', '#ee6e99', '#f1b06d', '#6bc1d7', '#b3a1e8',
  '#54a0ba', '#d46b9a', '#8fc77b', '#e6a06c', '#c98ad8',
];

export function getGroupColor(userId: string): string {
  const hue = stringToHue(userId);
  return TELEGRAM_GROUP_COLORS[hue % TELEGRAM_GROUP_COLORS.length];
}

export function getGroupTextColor(userId: string, isDark: boolean): string {
  return getGroupColor(userId);
}
