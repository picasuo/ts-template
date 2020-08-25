/* 事件总线 */
function Bus(Vue) {
  const version = Number(Vue.version.split('.')[0])
  if (version < 2) return

  const bus = new Vue()

  Object.defineProperty(Vue.prototype, '$bus', {
    get: () => bus,
    set: evt => {
      if (typeof evt === 'string') evt = [evt]
      bus.$emit.call(bus, ...evt)
    },
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Bus) // auto-activation
}

export default Bus
