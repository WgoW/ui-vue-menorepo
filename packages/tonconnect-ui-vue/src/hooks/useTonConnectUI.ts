import type { TonConnectUI } from '@tonconnect/ui'
import type { Ref } from 'vue'
import { watchEffect } from 'vue'
import { useInject } from '../components'
import { isServerSide } from '../utils/web.ts'
import { checkProvider } from '../utils/errors.ts'

/**
 * 使用它可访问 `TonConnectUI` 实例和用户界面选项更新功能。
 */
export function useTonConnectUI(buttonRootId: string): Ref<TonConnectUI> {
  const tonConnectUI = useInject()
  checkProvider(tonConnectUI)
  watchEffect(() => {
    if (tonConnectUI.value) {
      !isServerSide() && (tonConnectUI.value.uiOptions = { buttonRootId })
    }
    return () => {
      !isServerSide() && (tonConnectUI.value.uiOptions = { buttonRootId: null })
    }
  })
  return tonConnectUI
}
