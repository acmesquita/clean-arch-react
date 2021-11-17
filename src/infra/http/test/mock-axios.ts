import axios from 'axios'
import faker from 'faker'

const makeHttpResponse = {
  data: faker.random.objectElement(),
  status: faker.datatype.number()
}

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue(makeHttpResponse)
  mockedAxios.get.mockResolvedValue(makeHttpResponse)
  return mockedAxios
}
