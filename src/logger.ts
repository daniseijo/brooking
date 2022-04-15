import { createLogger, format, transports } from 'winston'
const { combine, colorize, timestamp, label, printf } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} - [${label}] - ${level}: ${message}`
})

export const getLoggerInstance = (userEmail: string) =>
  createLogger({
    level: 'debug',
    format: combine(colorize(), label({ label: userEmail }), timestamp(), myFormat),
    transports: [new transports.Console()],
  })
