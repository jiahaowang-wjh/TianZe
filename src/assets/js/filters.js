import Vue from 'vue'
/**
 * 金额数据处理
 * @param letue 调用过滤器时，调用的文本
 */
Vue.filter('priceletue', function (letue) {
    // 如果文本不存在，返回空字符
    // letue === 0  !0 === true.
    if (!letue) {
        return '0.00'
    }
    // 文本转化为 float
    const result = parseFloat(letue)
    // 如果文本为 integer 类型的文本，表示当前文本没有小数
    if (Number.isInteger(result)) {
        return result
    }
    // 文本包含小数，result.toFixed(2)
    return result.toFixed(2)
})

/**
 * 时间过滤器
 */
Vue.filter('filterTime', function (letue) {
    if (!letue) {
        return ''
    }
    // letue 不是时间格式 时:分:秒
    if (letue.indexOf(':') === -1) {
        return letue
    }
    let result = ''
    // arr[0] 小时
    // arr[1] 分钟
    // arr[3] 秒数
    const arr = letue.split(':')
    // 对 小时、分钟、秒数 补0
    // 时
    if (parseInt(arr[0]) < 10) {
        result = '0' + arr[0]
    } else {
        result = arr[0]
    }
    // 分
    if (parseInt(arr[1]) < 10) {
        result = result + ':0' + arr[1]
    } else {
        result = result + ':' + arr[1]
    }
    // 秒
    if (parseInt(arr[2]) < 10) {
        result = result + ':0' + arr[2]
    } else {
        result = result + ':' + arr[2]
    }
    return result
})
Vue.filter('Uppercase', function (money) {
    // 汉字的数字
    const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
    const cnIntRadice = ['', '拾', '佰', '仟'] // 基本单位
    // 对应整数部分扩展单位
    const cnIntUnits = ['', '万', '亿', '兆']
    // 对应小数部分单位
    const cnDecUnits = ['角', '分', '毫', '厘']
    const cnInteger = '整' // 整数金额时后面跟的字符
    const cnIntLast = '元' // 整数完以后的单位
    // 最大处理的数字
    const maxNum = 999999999999999.9999
    let integerNum = '' // 金额整数部分
    let decimalNum = '' // 金额小数部分
    // 输出的中文金额字符串
    let chineseStr = ''
    if (money === '') {
        return ''
    }
    money = parseFloat(money)
    if (money >= maxNum) {
        // 超出最大处理数字
        return '超出最大处理数字'
    }
    if (money === 0) {
        chineseStr = cnNums[0] + cnIntLast + cnInteger
        return chineseStr
    }
    // 四舍五入保留两位小数,转换为字符串
    money = Math.round(money * 100).toString()
    integerNum = money.substr(0, money.length - 2)
    decimalNum = money.substr(money.length - 2)
    // 获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
        let zeroCount = 0
        const IntLen = integerNum.length
        for (let i = 0; i < IntLen; i++) {
            const n = integerNum.substr(i, 1)
            const p = IntLen - i - 1
            const q = p / 4
            const m = p % 4
            if (n === '0') {
                zeroCount++
            } else {
                if (zeroCount > 0) {
                    chineseStr += cnNums[0]
                }
                // 归零
                zeroCount = 0
                chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
            }
            if (m === 0 && zeroCount < 4) {
                chineseStr += cnIntUnits[q]
            }
        }
        chineseStr += cnIntLast
    }
    // 小数部分
    if (decimalNum !== '') {
        const decLen = decimalNum.length
        for (let i = 0; i < decLen; i++) {
            const n = decimalNum.substr(i, 1)
            if (n !== '0') {
                chineseStr += cnNums[Number(n)] + cnDecUnits[i]
            }
        }
    }
    if (chineseStr === '') {
        chineseStr += cnNums[0] + cnIntLast + cnInteger
    } else if (decimalNum === '' || /^0*$/.test(decimalNum)) {
        chineseStr += cnInteger
    }
    return chineseStr
})

// 自定义指令数字限制
Vue.directive('input-num-2', {
    inserted: function (el) {
        const trigger = (el, type) => {
            const e = document.createEvent('HTMLEvents')
            e.initEvent(type, true, true)
            el.dispatchEvent(e)
        }

        el.addEventListener('keyup', function (e) {
            const input = e.target
            const reg = new RegExp('^((?:(?:[1-9]{1}\\d*)|(?:[0]{1}))(?:\\.(?:\\d){0,2})?)(?:\\d*)?$') // 正则验证是否是数字(小数整数均可)
            const matchRes = input.value.match(reg)
            if (matchRes === null) {
                input.value = ''
            } else {
                // matchRes[0]是匹配的无限位的小数
                // matchRes[1]是小数点后两位前面符合的数值
                // 如输入12.223 matchRes[0]是12.223 matchRes[1]12.22 此时input值改为matchRes[1]的值即可
                if (matchRes[1] !== matchRes[0]) {
                    input.value = matchRes[1]
                }
            }
            trigger(input, 'input')
        })
    }
})

Vue.directive('input-num', {
    inserted: function (el) {
        const trigger = (el, type) => {
            const e = document.createEvent('HTMLEvents')
            e.initEvent(type, true, true)
            el.dispatchEvent(e)
        }
        el.addEventListener('keyup', function (e) {
            const input = e.target
            const reg = new RegExp('^\\d{1}\\d*$') // 正则验证是否是数字
            const correctReg = new RegExp('\\d{1}\\d*') // 正则获取是数字的部分
            const matchRes = input.value.match(reg)
            if (matchRes === null) {
            // 若不是纯数字 把纯数字部分用正则获取出来替换掉
                const correctMatchRes = input.value.match(correctReg)
                if (correctMatchRes) {
                    input.value = correctMatchRes[0]
                } else {
                    input.value = ''
                }
            }
            trigger(input, 'input')
        })
    }
})
Vue.directive('input-nolimit', {
    inserted: function (el) {
        const trigger = (el, type) => {
            const e = document.createEvent('HTMLEvents')
            e.initEvent(type, true, true)
            el.dispatchEvent(e)
        }
        el.addEventListener('keyup', function (e) {
            const input = e.target
            trigger(input, 'input')
        })
    }
})
