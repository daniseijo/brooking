import { addWeeks, subHours } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'
import { gql, GraphQLClient } from 'graphql-request'
import { IClass } from './types'
import { roundToNearestHour } from './utils'

export function getBookingUTCDate() {
  const todayRounded = roundToNearestHour(new Date())

  const nextWeekClass = addWeeks(subHours(todayRounded, 2), 1)

  return zonedTimeToUtc(nextWeekClass, 'Europe/Madrid')
}

export async function getClassForUTCDate(client: GraphQLClient, classInUTC: Date): Promise<IClass | undefined> {
  const query = gql`
    {
      timetable {
        id
        rsv_val
        tim
        dsp
      }
    }
  `

  const timetableData = await client.request<ITimetableData>(query)

  return timetableData.timetable.find((fitboxingClass) => fitboxingClass.tim === classInUTC.toISOString())
}

interface ITimetableData {
  timetable: IClass[]
}
