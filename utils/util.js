/**
 * sort
 */
export function sort(arr, func) {
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      let flag = false
      if (typeof func === 'function') {
        if (!func(arr[j], arr[j + 1])) {
          flag = true
        }
      } else {
        if (arr[j] > arr[j + 1]) {
          flag = true
        }
      }
      if (flag) {
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
}