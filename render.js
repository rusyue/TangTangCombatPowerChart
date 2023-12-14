const puppeteer = require('puppeteer')
const path = require('path')

const browserOptions = {
    // debug: false,
    debug: true,
    viewport: {
        width: 1000,
        height: 2800
    },
    clipRegion: {
        x: 0,
        y: 0,
        width: 1000,
        height: 2800
    }
}

const defaultUserData = [
    {
        avatar: 'assets/img/avatar.png',
        username: '猫能养我就好了',
        updateTime: 1720473600000,
        rankGroup: 24,
        rankAll: 291,
        CPValue: 1768,
        gearLv90Count: 830,
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
        avgLevel65: 64,
        avgLevel70: 29,
        ml5: 36,
        gs70Lv90: 168,
        gs70Lv88: 72,
        gs70Lv85: 247,
        gs75: 79,
    },
    {
        avatar: 'avatar.png',
        username: '天然纯洁的夏师傅',
        updateTime: 1692062263000,
        rankGroup: 2,
        rankAll: 1274,
        CPValue: 1024,
        gearLv90Count: 1530,
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
        avgLevel70: 24,
        ml5: 34,
        gs70Lv90: 148,
        gs70Lv88: 63,
        gs70Lv85: 240,
        gs75: 70,
    }
]

// 获取命令行传递的 JSON 字符串参数，解析为 js 对象
const jsonStr = process.argv[2]

let userData

try {
    userData = JSON.parse(jsonStr)
} catch (error) {
    userData = defaultUserData

    console.warn(`\n警告：传入参数非标准JSON字符串，将使用预设数据生成图片 => ${error.message}\n`)
    console.log(`JSON:${jsonStr}`)
}

const renderWebScreenshot = () => {
    return new Promise(async (resolve, rejects) => {
        const browser = await puppeteer.launch({ headless: browserOptions.debug ? false : 'new' })
        const page = await browser.newPage()

        await page.setViewport({ ...browserOptions.viewport })

        const url = `file://${path.join(__dirname, 'src/index.html')}`

        await page.goto(url, {
            waitUntil: 'domcontentloaded'
        })

        // 将获取的数据传递给页面上的脚本渲染图表
        await page.addScriptTag({ content: `const USER_DATA = ${JSON.stringify(userData)}` })
        await page.addScriptTag({ path: 'src/script.js' })

        // 生成网页截图
        const screenshotFilename = `TANGTANG_CP_CHART_${Date.now()}`
        const screenshotSavePath = path.join(__dirname, `dist/${screenshotFilename}.png`)

        await page.screenshot({
            path: screenshotSavePath,
            clip: { ...browserOptions.clipRegion }
        })

        console.log('网页截图已保存:', screenshotSavePath)


        // 关闭浏览器
        if (browserOptions.debug === false) {
            await browser.close()
            console.log('浏览器已关闭')
            // resolve('网页截图渲染完成')
            resolve(screenshotFilename)
        }
    })
}

renderWebScreenshot()