export interface IClass {
  id: number
  rsv_val: number
  tim: string
  dsp: number
}

export interface IUser {
  token: string
  email: string
  name: string
  avatar: string
  currentRole: string
  permissions: IPermission[]
}

interface IPermission {
  id: string
  role: 'FITBOXER' | 'ADMIN'
  district: {
    server: {
      fitzoneUri: string
    }
    v7_user: number
    alias: string
    id: string
    v7_id: number
    accessByRole: 'FTC'
  }
}
