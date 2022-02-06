import axios from 'axios'

const useHttp = () => {

    const sendRequest = async (requestConfig) => {
        try {
            const response = await axios({
                url: requestConfig.url,
                method: requestConfig.method ? requestConfig.method : 'GET',
                data: requestConfig.body ? requestConfig.body : null
            })
            return {data: response.data, status: true}
        } catch (err) {
            return {data: (err.response.data.message || 'Something went wrong!'), status: false}
        }
    }

    return {
        sendRequest
    }
}

export default useHttp