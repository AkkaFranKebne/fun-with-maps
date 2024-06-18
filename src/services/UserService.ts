import {
  ApplicationError,
  GET_USER_FAILED,
} from '../components/ApplicationError'
import { Position } from '../utils/dataForMap'
import { UserClient, userClient } from './UserClient'

type UserService = {
  getUser: () => Promise<Position>
}

export const createUserService = (
  client: UserClient
): UserService => ({
  getUser: async () => {
    try {
      const response = await client.getUser()
      return response.data;
    } catch (error) {
      console.log(error)
      throw new ApplicationError(GET_USER_FAILED)
    }
  },
})

export const userService = createUserService(userClient)
