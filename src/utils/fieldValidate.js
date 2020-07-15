/**
  * @Author：李国烨
  * @Create： 2020/7/1
  * @Desc：实验室验证规则
  * @version: v1.0
 */

/**
 * 中文+空格验证规则
 * @param {string} str
 * @returns {Boolean}
 */
export function isChinese(str) {
  return /^[\u4e00-\u9fa5 ]+$/.test(str)
}

/**
 * 英文+空格 验证规则
 * @param {string} str
 * @returns {Boolean}
 */
export function isEnglish(str) {
  return /^[a-zA-Z- ]+$/.test(str)
}
