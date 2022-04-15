export function roundToNearestHour(date: Date): Date {
  date.setMinutes(date.getMinutes() + 30)
  date.setMinutes(0, 0, 0)

  return date
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
