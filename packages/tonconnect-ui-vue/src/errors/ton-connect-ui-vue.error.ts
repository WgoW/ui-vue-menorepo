import { TonConnectUIError } from '@tonconnect/ui'

/**
 * TonConnectUIVue 错误的基类。您可以使用 `err instanceof TonConnectUIVueError`
 * 检查错误是否是由 tonconnect-ui-vue 触发的。
 */
export class TonConnectUIVueError extends TonConnectUIError {
  constructor(...args: ConstructorParameters<typeof Error>) {
    super(...args)

    Object.setPrototypeOf(this, TonConnectUIVueError.prototype)
  }
}
