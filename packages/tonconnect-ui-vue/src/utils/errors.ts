import type { TonConnectUI } from '@tonconnect/ui'
import type { Ref } from 'vue'
import { TonConnectProviderNotSetError } from '../errors'

export function checkProvider(provider: Ref<TonConnectUI> | TonConnectUI | null): provider is TonConnectUI {
  if (!provider) {
    throw new TonConnectProviderNotSetError(
      'You should add <TonConnectUIProvider> on the top of the app to use TonConnect',
    )
  }
  return true
}
