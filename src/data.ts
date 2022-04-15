export function getLoginCredentials(userEmail: string) {
  const CREDENTIALS = [
    {
      email: process.env.USER_EMAIL_1,
      password: process.env.USER_PASSWORD_1,
      lang: 'es-es',
    },
    {
      email: process.env.USER_EMAIL_2,
      password: process.env.USER_PASSWORD_2,
      lang: 'es-es',
    },
  ]

  const userCredentials = CREDENTIALS.find((credential) => credential.email === userEmail)

  if (!userCredentials) throw Error(`Credentials for use ${userEmail} not found!`)

  return userCredentials
}
