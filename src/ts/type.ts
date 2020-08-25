/* ts 类型声明 */

export interface RequestResult<T, V> {
  code: number
  error_msg: string
  data?: T
  extra_data?: V
}
