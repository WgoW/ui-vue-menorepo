import type { ConnectedWallet, Wallet, WalletInfoWithOpenMethod } from '@tonconnect/ui'
import type { Ref } from 'vue'
import { ref, watchEffect } from 'vue'
import { useInject } from '../components'

/**
 * 用它来获取用户当前的ton钱包。如果钱包未连接，hook将返回 null
 */
export function useTonWallet(): Ref<Wallet | (Wallet & WalletInfoWithOpenMethod) | null> {
  const tonConnectUI = useInject()
  const wallet = ref<Wallet | (Wallet & WalletInfoWithOpenMethod) | null>(
    tonConnectUI.value?.wallet || null,
  )
  watchEffect(() => {
    if (tonConnectUI.value) {
      wallet.value = tonConnectUI.value.wallet
      const unsubscribe = tonConnectUI.value.onStatusChange((value: ConnectedWallet | null) => {
        wallet.value = value
      })
      return () => unsubscribe()
    }
  })
  return wallet
}
