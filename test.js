const fs = require('fs');

function objectToCommandLineJSON(obj) {
    const jsonStr = JSON.stringify(obj)
                       .replace(/"/g, '\\"');
    return `"${jsonStr}"`;
}

// 示例对象
const defaultUserData = [
    {
        avatar: 'assets/img/avatar.png',
        username: '猫能养我就好了',
        updateTime: 1720473600000,
        rankGroup: 24,
        rankAll: 281,
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

// 转换为命令行参数
const commandLineJSON = objectToCommandLineJSON(defaultUserData);

// 保存到文件
fs.writeFileSync('jsonstr.txt', commandLineJSON, 'utf8', (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('JSON string saved to jsonstr.txt');
    }
});
