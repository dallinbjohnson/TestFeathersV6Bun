// For more information about this file see https://dove.feathersjs.com/guides/cli/logging.html
import { createLogger, format, transports } from 'winston'
import { consoleFormat } from 'winston-console-format';

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
export const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  format: format.combine(
    // format.label({ label: 'CUSTOM', message: true }),
    format.timestamp(),
    format.ms(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize({ all: true }),
        format.padLevels(),
        consoleFormat({
          showMeta: true,
          metaStrip: ['service'],
          inspectOptions: {
            depth: 5,
            colors: true,
            maxArrayLength: Infinity,
            breakLength: 120,
            compact: false
          }
        })
      )
    })
  ]
})
