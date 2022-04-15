import 'dotenv/config'

import { brooking } from './brooking'
import { getLoggerInstance } from './logger'

brooking('daniseijo12@gmail.com').catch((error) => getLoggerInstance('daniseijo12@gmail.com').error(error.message))
brooking('barbarad91@gmail.com').catch((error) => getLoggerInstance('barbarad91@gmail.com').error(error.message))
