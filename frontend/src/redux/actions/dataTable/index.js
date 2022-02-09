import axios from 'axios'
import { getUserData } from '@utils'
import { setData } from '@store/reducers/dataTable'
const token = getUserData().token

export const getData =  (params) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios({
        url: params.url,
        method: 'GET',
        headers: {Authorization : `Bearer ${token}`},
        params
      })
      return response
    }
    const response = await fetchData() 
    dispatch(
      setData({
        allData: response.data.data.rows,
        totalPages: response.data.data.count,
        params
      })
    )
  }
}
