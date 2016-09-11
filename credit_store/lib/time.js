function getTimePartString(hour){
    if(hour < 0 || hour > 24)
    {
        return "未知时间段";
    }
    var timeString = new Array();
    timeString[0] = "凌晨";
    timeString[1] = "凌晨";
    timeString[2] = "凌晨";
    timeString[3] = "凌晨";
    timeString[4] = "凌晨";
    timeString[5] = "凌晨";

    timeString[6] = "清晨";
    timeString[7] = "清晨";

    timeString[8] = "早上";
    timeString[9] = "早上";

    timeString[10] = "上午";
    timeString[11] = "上午";

    timeString[12] = "中午";
    timeString[13] = "中午";

    timeString[14] = "下午";
    timeString[15] = "下午";
    timeString[16] = "下午";
    timeString[17] = "下午";

    timeString[18] = "傍晚";
    timeString[19] = "傍晚";

    timeString[20] = "晚上";
    timeString[21] = "晚上";
    timeString[22] = "晚上";
    timeString[23] = "晚上";
    timeString[24] = "晚上";
    return timeString[hour];
}

module.exports.getTimePartString = getTimePartString;
