/* 逻辑路由数据生成器 */
export const routeBuilder = menu =>
  menu
    .flatMap(
      ({ sides, url }) =>
        sides &&
        sides.flatMap(item =>
          Array.isArray(item.children)
            ? item.children.map(c => ({
                ...shallowCopy(c, ['icon', 'url']),
                name: _.upperFirst(c.url),
                path: url ? `${url}/${c.url}` : c.url,
              }))
            : [
                {
                  ...shallowCopy(item, ['icon', 'url']),
                  name: _.upperFirst(item.url),
                  path: url ? `${url}/${item.url}` : item.url,
                },
              ]
        )
    )
    .filter(v => v)

/* 侧边栏菜单项数据生成器 */
export const sideBuilder = menu => {
  const temp = {}
  menu
    .flatMap(
      ({ sides, url = '' }) =>
        sides &&
        sides.map(item =>
          Array.isArray(item.children)
            ? {
                name: item.name,
                url: `/${url}`,
                children: item.children.map(c => ({
                  name: c.name,
                  url: `/${c.url}`,
                  icon: c.icon,
                })),
              }
            : {
                url: `/${url}`,
                children: [
                  {
                    name: item.name,
                    url: `/${item.url}`,
                    icon: item.icon,
                  },
                ],
              }
        )
    )
    .filter(v => v)
    .forEach(v => {
      if (!temp[`${v.name}-${v.url}`]) temp[`${v.name}-${v.url}`] = v
      else temp[`${v.name}-${v.url}`].children.push(...v.children)
    })
  return Object.keys(temp).map(key => temp[key])
}

/* 顶部菜单项数据生成器 */
export const tabBuilder = menu =>
  menu
    .filter(v => v.title && !v.hide)
    .map(({ title, url }) => ({ title, url: `${url}` }))

/**
 * 浅拷贝 (可去除不必要的值/键)
 * @param {*} origin - 元数据
 * @param {Array} without - 元数据为数组则去除包含的值 元数据为对象则去除包含的键
 */
export const shallowCopy = (origin, without) => {
  if (typeof origin !== 'object') return origin
  if (!without) without = []
  const output = new (Object.getPrototypeOf(origin).constructor)()
  if (Array.isArray(origin)) {
    origin.forEach(v => {
      if (without.indexOf(v) === -1) {
        output.push(v)
      }
    })
  } else if (typeof origin === 'object') {
    Object.keys(origin).forEach(key => {
      if (without.indexOf(key) === -1) {
        output[key] = origin[key]
      }
    })
  }
  return output
}
