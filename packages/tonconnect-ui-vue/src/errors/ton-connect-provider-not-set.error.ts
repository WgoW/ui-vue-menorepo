import { TonConnectUIVueError } from './ton-connect-ui-vue.error.ts'

/**
 * 在vue的根组件中未使用useProvide注入TonConnectUI时抛出异常,
 * 尝试使用 TonConnect UI hooks或 <TonConnectButton>
 */
export class TonConnectProviderNotSetError extends TonConnectUIVueError {
  constructor(...args: ConstructorParameters<typeof Error>) {
    super(...args)

    Object.setPrototypeOf(this, TonConnectProviderNotSetError.prototype)
  }
}
