import axios from 'axios'
import faker from 'faker'

export const makeHttpResponse = {
  data: faker.random.objectElement(),
  status: faker.datatype.number()
}

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockClear().mockResolvedValue(makeHttpResponse)
  mockedAxios.get.mockClear().mockResolvedValue(makeHttpResponse)
  return mockedAxios
}
