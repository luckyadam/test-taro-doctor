import * as path from 'path'

import { IPluginContext } from '@tarojs/service'

import doctor from '@tarojs/doctor'

export default (ctx: IPluginContext) => {
  ctx.registerCommand({
    name: 'dd',
    fn() {
      console.time('doctor')
      const configStr = JSON.stringify(ctx.initialConfig, (_, v) => {
        if (typeof v === 'function') {
          return '__function__'
        }
        return v
      })
      doctor.validateEnv()
      console.log(doctor.validateConfig(configStr))

      console.log(
        doctor.validatePackage(
          ctx.paths.appPath,
          ctx.paths.nodeModulesPath,
          '3.6.6'
        )
      )

      doctor.validateRecommend(ctx.appPath)

      doctor.validateEslint()
      console.timeEnd('doctor')
    },
  })
}
