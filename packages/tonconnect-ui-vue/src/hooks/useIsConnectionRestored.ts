import type { Ref } from 'vue'
import { ref, watchEffect } from 'vue'
import { useInject } from '../components'

/**
 * 指示连接恢复过程的当前状态
 */
export function useIsConnectionRestored(): Ref<boolean> {
  const tonConnectUI = useInject()
  const restored = ref(false)

  watchEffect(() => {
    if (tonConnectUI.value) {
      tonConnectUI.value.connectionRestored.then(() =>
        restored.value = true,
      )
    }
  })
  return restored
}
