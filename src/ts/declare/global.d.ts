import { LoDashStatic } from 'lodash'

declare global {
  const _: LoDashStatic
  const moment: typeof import('moment')
}
