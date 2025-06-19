
import { Lifecycle } from '@well-known-components/interfaces'
import { AppComponents, TestComponents } from './types'
import { injectDependencies } from 'jeringa'
import { Application } from './domain/Application'

// this function wires the lifecycle of the node program to the lifecycle of the Application class
export async function main(program: Lifecycle.EntryPointParameters<AppComponents | TestComponents>) {
  const application = await injectDependencies(Application, {
    components: program.components,
    program
  })
  await application.start()
  program.beforeStopComponents(() => application.beforeStopComponents())
}
