import { CHAIN, toUserFriendlyAddress } from '@tonconnect/ui'
import type { Ref } from 'vue'
import { ref, watchEffect } from 'vue'
import { useTonWallet } from './useTonWallet'

/**
 * 用它来获取用户当前的ton钱包地址。如果钱包未连接，钩子将返回空字符串
 * @param [userFriendly] 允许选择地址的格式.
 */
export function useTonAddress(userFriendly = ref(true)): Ref<string> {
  const wallet = useTonWallet()
  const address = ref<string>('')
  watchEffect(() => {
    if (wallet.value) {
      const addressStr = wallet.value.account.address
      address.value = userFriendly.value
        ? toUserFriendlyAddress(
          addressStr,
          wallet.value.account.chain === CHAIN.TESTNET, // 是否是测试网
        )
        : addressStr
    }
  })
  return address
}
