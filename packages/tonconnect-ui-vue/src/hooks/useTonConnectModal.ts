import type { WalletsModal, WalletsModalState } from '@tonconnect/ui'
import type { Ref } from 'vue'
import { ref, watchEffect } from 'vue'
import { useInject } from '../components'

/**
 * Use it to get access to the open/close modal functions.
 * 使用它来获取打开/关闭模态函数的访问权。
 */
export function useTonConnectModal(): Omit<WalletsModal, 'onStateChange' | 'state'> & {
  state: Ref<WalletsModalState>
} {
  const tonConnectUI = useInject()
  const state = ref<WalletsModalState>(tonConnectUI.value?.modal.state || null)

  watchEffect(() => {
    if (tonConnectUI.value) {
      state.value = tonConnectUI.value.modal.state
      const unsubscribe = tonConnectUI.value.onModalStateChange((value: WalletsModalState) => {
        state.value = value
      })
      return () => unsubscribe()
    }
  })

  return {
    state,
    open: () => tonConnectUI.value?.modal.open(),
    close: () => tonConnectUI.value?.modal.close(),
  }
}
