/**
 * 将时间戳（单位：秒）转换为指定格式的日期字符串（如 "2024年3月24日13:25:00"）
 *
 * @param {number} timestamp - 时间戳（秒）
 * @returns {string} - 格式化后的日期时间字符串
 */
export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2); // 月份加1并补零
    const day = `0${date.getDate()}`.slice(-2); // 日份补零
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);

    return `${year}年${month}月${day}日${hours}:${minutes}:${seconds}`;
}
