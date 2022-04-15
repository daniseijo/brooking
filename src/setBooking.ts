import { gql, GraphQLClient } from 'graphql-request'
import { IClass } from './types'

export function setBooking(client: GraphQLClient, fitboxingClass: IClass): Promise<SetBookingData> {
  if (fitboxingClass.dsp === 0) {
    throw Error(`No space available for date ${fitboxingClass.tim}`)
  }

  const mutation = gql`
    mutation setBooking($classId: Int!) {
      setBooking(classId: $classId)
    }
  `

  const variables = {
    classId: fitboxingClass.id,
  }

  return client.request<SetBookingData>(mutation, variables)
}

export interface SetBookingData {
  setBooking: string
}
