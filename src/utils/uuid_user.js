import { v4 as uuidv4 } from 'uuid'
//对外暴露uuid生成函数
export const getUUid = () => {
    //判断浏览器缓存中是否有UUID
    let uuid_token = localStorage.getItem('UUID')
    if (uuid_token == null) {
        uuid_token = uuidv4()
            //将顾客的唯一id存储与浏览器中
        localStorage.setItem('uerId', uuid_token)
    }
    return uuid_token
}