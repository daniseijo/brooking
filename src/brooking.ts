import { differenceInSeconds } from 'date-fns'
import { GraphQLClient } from 'graphql-request'
import { getUserToken } from './login'
import { getBookingUTCDate, getClassForUTCDate } from './timetable'
import { IClass } from './types'
import { sleep } from './utils'
import { setBooking, SetBookingData } from './setBooking'
import { getLoggerInstance } from './logger'

const MAIN_URL = 'https://myh4c.brooklynfitzone.com/fs1'
const MAX_ATTEMPT_WINDOW = 120

export async function brooking(userEmail: string) {
  const logger = getLoggerInstance(userEmail)

  const userToken = await getUserToken(userEmail)
  const graphQLClient = new GraphQLClient(MAIN_URL, {
    headers: {
      authorization: `Bearer ${userToken}`,
    },
  })
  const nextWeekClassDate = getBookingUTCDate()

  let nextWeekClass: IClass | undefined

  const startingTime = new Date()

  while (!nextWeekClass && differenceInSeconds(new Date(), startingTime) < MAX_ATTEMPT_WINDOW) {
    nextWeekClass = await getClassForUTCDate(graphQLClient, nextWeekClassDate)

    if (!nextWeekClass) {
      await sleep(1000)
      logger.debug('No class found yet')
    }
  }

  if (!nextWeekClass) throw Error('Max attempt window reached')

  let booking: SetBookingData | undefined
  let polling = 500
  let retries = 5

  while (retries) {
    try {
      booking = await setBooking(graphQLClient, nextWeekClass)
      if (booking) break
    } catch (error) {
      logger.error(`Error booking. Retries left: ${retries}.`)
    }
    await sleep(polling)
    polling *= 2
    retries--
  }

  if (!retries) throw Error('Not able to book. Max retries reached.')

  if (booking && booking.setBooking) {
    logger.info(`Booked class correctly for: ${nextWeekClassDate.toLocaleString()}`)
  }
}
