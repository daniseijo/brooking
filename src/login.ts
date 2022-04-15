import axios from 'axios'
import { getLoginCredentials } from './data'
import { IUser } from './types'

const LOGIN_URL = 'https://myh4c.brooklynfitzone.com/auth/user/login'

export async function getUserToken(userEmail: string): Promise<string> {
  try {
    const userData = await axios.post<IUser>(LOGIN_URL, getLoginCredentials(userEmail))

    const user = userData.data

    return user.token
  } catch (err) {
    throw Error(`Error retreiving token: ${err}`)
  }
}
