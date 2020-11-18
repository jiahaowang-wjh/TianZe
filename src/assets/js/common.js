import axios from './axios.config'
// 获取省份信息
export function GetProvince(data = {}) {
    return axios({
        method: 'post',
        url: '/api/api/pubAreaController/queryParent',
        data
    })
}
// 获取城市信息

export function GetCity(data = '') {
    const formData = new FormData()
    formData.append('parentId', data)
    return axios({
        method: 'post',
        url: '/api/api/pubAreaController/querySubset',
        data: formData
    })
}

