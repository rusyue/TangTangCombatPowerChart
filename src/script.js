// 获取用户数据
// USER_DATA 是 render.js 传来的全局变量

let userData

try {
    userData = USER_DATA
    console.warn('成功获取到全局变量……')
    console.log(userData)
} catch (error) {
    console.warn(`typeof USER_DATA === 'undefined' ? =>`, (typeof USER_DATA === 'undefined'))
    console.warn(`全局变量 USER_DATA 不存在，将使用预设数据生成图片 => ${error.message}`)

    // 预设数据用于在 index.html 中直接引入脚本时调试
    userData = [
        {
            avatar: 'assets/img/avatar.png',
            username: '天然纯洁的夏师傅',
            updateTime: 1692062263000,
            rankGroup: 2,
            rankAll: 1274,
            CPValue: 1024,
            CPValue: 104,
            gearLv90Count: 543,
            highSpeed: 300.70,
            nuclearBlast: 372.08,
            dualEffect: 56.00,
            speedTank: 100.68,
            semiTank: 279.00,
            tank: 115.50,
            damage: 381.10,
            speed15: 149,
            speed18: 52,
            speed20: 27,
            speed22: 20,
            speed25: 0,
            speedSet15: 58,
            speedSet18: 19,
            speedSet20: 19,
            speedSet22: 12,

            avgLevel65: 50,
            avgLevel68: 30,
            avgLevel70: 24,
            avgLevel72: 12,

            speed260: 30,
            speed280: 24,
            speed300: 4,
            ml5: 34,

            gs70Lv90: 148,
            gs70Lv88: 63,
            gs70Lv85: 240,
            gs75: 70,
        },
        {
            avatar: 'assets/img/avatar.png',
            username: '猫能养我就好了',
            updateTime: 1699062263000,
            rankGroup: 3,
            rankAll: 2274,
            CPValue: 1768,
            gearLv90Count: 796,
            CPValue: 4793,
            gearLv90Count: 3267,
            highSpeed: 320.70,
            nuclearBlast: 392.08,
            dualEffect: 66.00,
            speedTank: 120.68,
            semiTank: 299.00,
            tank: 135.50,
            damage: 421.10,
            speed15: 159,
            speed18: 63,
            speed20: 32,
            speed22: 23,
            speed25: 0,
            speedSet15: 68,
            speedSet18: 27,
            speedSet20: 21,
            speedSet22: 15,

            avgLevel65: 72,
            avgLevel68: 43,
            avgLevel70: 51,
            avgLevel72: 23,

            speed260: 52,
            speed280: 43,
            speed300: 12,
            ml5: 44,
            gs70Lv90: 168,
            gs70Lv88: 72,
            gs70Lv85: 247,
            gs75: 79,
        },
    ]
}

// 排下序，更新时间更晚的放前面，保证 userData[0] 即是最新数据
userData = userData.sort((a, b) => b.updateTime - a.updateTime)

// 创建雷达图配置数据预设，categories 排序影响渲染后的图形形状
const radarData = {
    categories: [
        'highSpeed',
        'nuclearBlast',
        'dualEffect',
        'speedTank',
        'semiTank',
        'tank',
        'damage',
    ],
    indicatorMax: 100,
    indicators: [],
    values: [],
    series: [],
    legend: [],
    colorStyles: [
        { // 橙红配色
            itemStyle: {
                color: '#F9713C33',
                borderColor: '#F90',
            },
            lineStyle: {
                color: '#f90'
            },
            areaStyle: {
                normal: {
                    opacity: 0.5,
                    color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [{
                        offset: 0,
                        color: 'rgba(255, 153, 0, 0.533)'
                    }, {
                        offset: 1,
                        color: 'rgba(255, 78, 0, 0.2)'
                    }]),
                }
            }
        },
        { // 青绿配色
            itemStyle: {
                color: '#99cc0033',
                borderColor: '#9c0',
            },
            lineStyle: {
                color: '#9a0'
            },
            areaStyle: {
                normal: {
                    opacity: 0.5,
                    color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [{
                        offset: 0,
                        color: 'rgba(102, 204, 0, 0.323)'
                    }, {
                        offset: 1,
                        color: 'rgba(0, 204, 204, 0.158)'
                    }]),
                }
            }
        },
    ]
}

// const color = '#ff6fd8'
// const color = '#ff512f'
// const color = '#e2b0ff'
// const color = '#ff96f9'

// 创建柱状图配置数据预设，categories 排序和渲染图视觉上一致，不需要渲染的项直接删除
const barData = {
    categories: [
        'speed15',
        'speed18',
        'speed20',
        'speed22',
        'speed25',
        'speedSet15',
        'speedSet18',
        'speedSet20',
        'speedSet22',

        'avgLevel65',
        'avgLevel68',
        'avgLevel70',
        'avgLevel72',

        'speed260',
        'speed280',
        'speed300',
        'ml5',

        'gs70Lv90',
        'gs70Lv88',
        'gs70Lv85',
        'gs75',
    ].reverse().filter((key) => { // 总数为0的项删掉
        const sum = userData.reduce((acc, data) => { return acc + data[key] }, 0)
        return sum > 0
    }),
    xAxisMaxValue: 50,
    values: [],
    series: [],
    legend: [],
    colorStyles: { // 颜色配置，和上面的 categories 对应，如果增加更多 categories 预设，这里也需要增加更多配色数据
        speed15: ['#aacf53', '#ffa647'],
        speed18: ['#aacf53', '#ffa647'],
        speed20: ['#aacf53', '#ffa647'],
        speed22: ['#aacf53', '#ffa647'],
        speed25: ['#aacf53', '#ffa647'],

        speedSet15: ['#a6ffcb', '#e94829'],
        speedSet18: ['#a6ffcb', '#e94829'],
        speedSet20: ['#a6ffcb', '#e94829'],
        speedSet22: ['#a6ffcb', '#e94829'],

        avgLevel65: ['#ffdb4f', '#ff7676'],
        avgLevel68: ['#ffdb4f', '#ff7676'],
        avgLevel70: ['#ffdb4f', '#ff7676'],
        avgLevel72: ['#ffdb4f', '#ff7676'],

        speed260: ['#ff96f9', '#ff512f'],
        speed280: ['#ff96f9', '#ff512f'],
        speed300: ['#ff96f9', '#ff512f'],
        ml5: ['#ff96f9', '#ff512f'],

        gs70Lv90: ['#ed6d3d', '#b7d332'],
        gs70Lv88: ['#ed6d3d', '#b7d332'],
        gs70Lv85: ['#ed6d3d', '#b7d332'],
        gs75: ['#ed6d3d', '#b7d332'],
    }
}

// Echarts通用的阴影样式
const shadowStyles = {
    text: {
        textShadowColor: 'rgba(0, 0, 0, 0.58)',
        textShadowBlur: 3,
        textShadowOffsetX: 1,
        textShadowOffsetY: 1,
    },
    text2: {
        textShadowColor: 'rgba(255, 93, 4, 1)',
        textShadowBlur: 3,
        textShadowOffsetX: 0,
        textShadowOffsetY: 0,
    },
    item: {
        shadowColor: 'rgba(0, 0, 0, 0.38)',
        shadowBlur: 3,
        shadowOffsetX: 1,
        shadowOffsetY: 1,
    }
}

// 中文字典（柱图 Y 轴上各分类显示的文本、雷达图的各个轴的显示名称）
const localization = {
    zhs: (key) => {
        return {
            avatar: '头像',
            username: '用户名',
            updateTime: '更新时间',
            rankGroup: '本群天梯',
            rankAll: '宇宙天梯',
            CPValue: '战斗力',
            gearLv90Count: 'Lv.90装备总数量',
            highSpeed: '高速',
            nuclearBlast: '核爆',
            dualEffect: '双效',
            speedTank: '速坦',
            semiTank: '半肉',
            tank: '坦克',
            damage: '输出',
            speed15: '15+速（任意套装）',
            speed18: '18+速（任意套装）',
            speed20: '20+速（任意套装）',
            speed22: '22+速（任意套装）',
            speed25: '25+速（任意套装）',
            speedSet15: '15+速（仅速度套）',
            speedSet18: '18+速（仅速度套）',
            speedSet20: '20+速（仅速度套）',
            speedSet22: '22+速（仅速度套）',
            avgLevel65: '65+均分角色数量  ',
            avgLevel68: '68+均分角色数量  ',
            avgLevel70: '70+均分角色数量  ',
            avgLevel72: '72+均分角色数量  ',
            speed260: '260+速角色数量  ',
            speed280: '280+速角色数量  ',
            speed300: '300+速角色数量  ',
            ml5: '月光5星角色数量  ',
            gs70Lv90: '70+分装备（Lv.90）',
            gs70Lv88: '70+分装备（Lv.88）',
            gs70Lv85: '70+分装备（Lv.85 待重铸）',
            gs75: '75+分装备（Lv.90 & Lv.88）',
        }[key] || key
    }
}

// 日期格式化函数
const formatDate = (timestamp, type = 0) => {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return [
        `${year}年${month}月${day}日`,
        `${year} 年 ${month} 月 ${day} 日`,
    ][type]
}

// 等待DOM加载完后修改页面上的元素、渲染图表
const domReadyHandler = (ev) => {

    // 把最新一次的用户数据更新到页面元素上
    const latestUserData = userData[0]

    const updateUserDataUI = (userData) => {
        $('#username').text(userData.username)
        $('#username').css('font-size', (userData.username.length < 10 ? '20px' : '18px'))
        // $('#username').css('font-size', (userData.username.length < 10 ? '18px' : '16px'))
        $('#avatar').attr('src', userData.avatar)
        $('#combat-power, #combat-power-shadow').text(userData.CPValue)
        // $('#combat-power, #combat-power-shadow').html(userData.CPValue + ` <span id="combat-power-increment">23</span>`)
        $('#update-time').text(formatDate(userData.updateTime))
        $('#rank-all').text(`${userData.rankAll}`)
        $('#rank-group').text(`${userData.rankGroup}`)
        $('#gear-lv90-count').text(`${userData.gearLv90Count}`)
    }

    updateUserDataUI(latestUserData)


    // 根据预设和用户数据动态生成雷达图需要的配置数据
    userData.map((data, idx) => {

        // 拼个字符串做系列名、图例名
        const name = `- ${formatDate(data.updateTime, 1)} -`

        // 生成每个系列的配置
        const curValues = radarData.categories.map(key => data[key])

        radarData.series.push({
            name,
            type: 'radar',
            data: [
                {
                    value: curValues
                }
            ],
            ...radarData.colorStyles[(idx % radarData.colorStyles.length)] // 现有的颜色配置中循环轮换
        })

        // 保存雷达图的 data.value 原始数据值到一个二维数组
        radarData.values.push(curValues)

        // 生成图例配置数据
        radarData.legend.push({
            name,
            icon: 'diamond', //图例样式：circle、pin、diamond、rect
        })
    })

    // 雷达图最外围的轴刻度值设置为：所有 radarData.values 中最大的数值向上取整到最近的50倍数
    radarData.indicatorMax = Math.ceil(Math.max(...([].concat(...radarData.values))) / 50) * 50

    // 生成 radar.indicators 所需配置数据
    radarData.indicators = radarData.categories.map(name => ({ name: name, max: radarData.indicatorMax }))

    // 创建完整的雷达图配置项
    const radarOptions = {
        series: radarData.series,
        animation: false,
        // symbol: 'none',
        tooltip: { show: false },
        legend: {
            bottom: 36,
            data: radarData.legend,
            itemGap: 30,
            itemWidth: 28,
            itemHeight: 22,
            textStyle: {
                fontSize: 18,
                // color: 'rgba(238, 197, 102, 0.88)',
                color: 'rgba(211,174,92, 1)',
                ...shadowStyles.text,
                // color: 'rgba(234, 231, 232, 0.88)',
                // ...shadowStyles.text2,
            },
            itemStyle: {
                borderCap: 'square',
                borderWidth: 2,
                borderJoin: 'miter',
                ...shadowStyles.item
            },
            formatter: (name) => { return '   ' + name }, // 图例文本和标志小图标之间留些空白填充
        },
        radar: {
            shape: 'circle',
            splitNumber: 5,
            scale: true,
            indicator: radarData.indicators,
            splitLine: {
                lineStyle: {
                    color: [
                        'rgba(238, 197, 102, 0.3)',
                        'rgba(238, 197, 102, 0.4)',
                        'rgba(238, 197, 102, 0.5)',
                        'rgba(238, 197, 102, 0.6)',
                        'rgba(238, 197, 102, 0.8)',
                        'rgba(238, 197, 102, 1)'
                    ].reverse(),
                    width: 1,
                    opacity: 0.5
                }
            },
            splitArea: {
                show: false,
            },
            nameGap: 38,
            // 轴的名字（核爆、一速之类……）
            axisName: {
                fontSize: 22,
                // lineHeight: 24,
                color: 'rgba(238, 197, 102, 0.80)',
                ...shadowStyles.text,
                color: 'rgba(234, 231, 232, 0.88)',
                ...shadowStyles.text2,
                formatter: (name) => localization.zhs(name)
            },
            // 轴线
            axisLine: {
                lineStyle: {
                    color: 'rgba(238, 197, 102, 0.5)',
                    width: 1,
                    opacity: 0.5
                }
            },
            // 轴上的刻度短线
            axisTick: {
                show: false,
            },
            // 轴上的刻度标签（数字、值）
            axisLabel: {
                show: true,
                showMinLabel: false,
                fontSize: 18,
                ...shadowStyles.text,
            }
        }
    }










    // 根据预设和用户数据动态生成柱状图需要的配置数据（用户数据排序是从新到旧，这里为了方便需要转成从旧到新）
    userData.reverse().map((data, idx, arr) => {

        const name = `${formatDate(data.updateTime, 1)}`

        // 生成 values 配置数据，图形堆叠效果需要把新数值减去旧数值处理
        const curValues = barData.categories.map((key) => {
            if (idx < 1) {
                return arr[idx][key]
            } else {
                return arr[idx][key] - arr[idx - 1][key]
            }
        })

        // 保存柱状图的 data.value 原始数据值到一个二维数组
        barData.values.push(curValues)

        // 配色数据
        const curColors = barData.categories.map(key => {
            return barData.colorStyles[key][idx]
        });

        // 为每个 series.data 生成数据，为了视觉效果对 values 原始数据进行增大、调整配色样式
        // （因此图表中使用 value 时需要使用原始数据 barData.values 中的值，不能直接用）
        const generateBarDataWithStyles = (data, colors) => {
            return data.map((val, idx) => {
                return {
                    value: val >= 50
                        ? val + 6
                        : val >= 40
                            ? val + 7
                            : val >= 30
                                ? val + 8
                                : val >= 20
                                    ? val + 9
                                    : val !== 0
                                        ? val + 10
                                        : null, // val 为 null 则不显示图形
                    itemStyle: {
                        color: colors[idx] + '50', // 给 bar 的填充颜色加上透明度
                        borderColor: colors[idx],
                        borderWidth: 2
                    },
                }
            })
        }

        // 生成柱状图每个 series 需要的配置数据
        barData.series.push({
            name: name,
            type: 'bar',
            stack: 'gearScore',
            label: {
                formatter: (params) => {
                    return curValues[params.dataIndex] // 文本显示使用原始真实的 value 值
                }
            },
            showBackground: idx < 1 ? true : false,
            backgroundStyle: {
                color: 'rgba(200,200,200,0.028)'
            },
            data: generateBarDataWithStyles(curValues, curColors),
        })

    })

    // 计算X轴最大刻度值，barData.values 每个子数组同索引累加后再取其中最大值并向上取整到 axisStep
    const axisStep = 50

    const calculateMaxAxisValue = (data, step) => {
        const sumValues = data[0].map((val, idx) => {
            return data.reduce((acc, subArr) => { return acc + subArr[idx] }, 8) // 累加初始为8是因为values都在原始数据和增加了6~10来保持视觉可见
        })
        return Math.ceil(Math.max(...sumValues) / step) * step
    }

    // 设置坐标系 X 轴的最大刻度值
    barData.xAxisMaxValue = calculateMaxAxisValue(barData.values, axisStep)

    // 创建完整的柱状图配置项
    const barOptions = {
        series: barData.series,
        animation: false,
        silent: true,
        tooltip: { show: false, trigger: 'axis' },
        barWidth: barData.categories.length >= 15
            ? 35 : 38,
        grid: {
            left: '3%',
            // right: '118px',
            right: "11%",
            bottom: '10px',
            containLabel: true,
        },
        xAxis: {
            type: 'value',
            max: barData.xAxisMaxValue,
            splitLine: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(238, 197, 102, 0.68)',
                }
            },
            axisLabel: {
                fontSize: 14,
                // color: 'rgba(238, 197, 102, 0.98)',
                // ...shadowStyles.text,
                color: 'rgba(234, 231, 232, 0.88)',
                ...shadowStyles.text2,
            },
        },
        yAxis: {
            type: 'category',
            data: barData.categories.map(category => localization.zhs(category)),
            axisLine: {
                lineStyle: {
                    color: 'rgba(238, 197, 102, 0.68)',
                }
            },
            axisLabel: {
                interval: 0,
                rotate: 0,
                // fontSize: 12,
                // color: 'rgba(238, 197, 102, 0.98)',
                // ...shadowStyles.text,
                color: 'rgba(234, 231, 232, 0.88)',
                ...shadowStyles.text2,
            }
        },
        label: {
            show: true,
            distance: 5,
            color: '#f3f8f1',
            offset: [-0.58, 1],
            fontSize: 15,
            fontWeight: 600,
            fontStyle: 'italic',
            ...shadowStyles.text,
        }
    }

    // 初始化 echarts 实例
    const radarChart = echarts.init(document.getElementById('radar-chart-container'))
    const barChart = echarts.init(document.getElementById('bar-chart-container'))

    // 渲染图表
    radarChart.setOption(radarOptions)
    barChart.setOption(barOptions)
}


// 开始……
$(document).ready(domReadyHandler)