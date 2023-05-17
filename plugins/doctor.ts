import * as path from 'path'

import { IPluginContext } from '@tarojs/service'

import doctor from '@tarojs/doctor'

export default (ctx: IPluginContext) => {
  ctx.registerCommand({
    name: 'dd',
    fn() {
      const configStr = JSON.stringify(ctx.initialConfig, (_, v) => {
        if (typeof v === 'function') {
          return '__function__'
        }
        return v
      })
      console.log(doctor.validateConfig(configStr))
    },
  })
}
