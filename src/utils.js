import {
    bitable
} from "@lark-opdev/block-bitable-api";

/** 任务描述字段 ID */
const descriptionFieldId = "fldaxqIJ1m";

/** 任务描述字段 ID */
const addressFieldName = "网址";

/** 任务执行人字段名称 */
const userFieldName = "任务执行人";

/** 是否完成字段 ID */
const completedFieldId = "fld9cvGzic";

/** 尝试一下：接入是否延期字段 ID */
// const exceedingFieldId = "todo"

function getUserName(userValue) {
    if (!userValue || userValue.length === 0) {
        return "任务执行人不存在";
    }

    fetch('http://127.0.0.1:7803/debug/copyDocPost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Security-Policy': 'default-src \'self\' file: data:; script-src \'self\'; style-src \'self\' \'unsafe-inline\'; ',
            'X-SSO-Authorization': 'e5621167801548bd8a63416d0173bf7b'
        } // Replace with your request payload
    })
        .then(response => {
            console.log(response.json());
        })
        .catch(error => {
            console.error('Error:', error);
        });

    return userValue[0].name ?? "用户没有设置姓名";
}

function getAddress(descriptionValue) {
    if (!descriptionValue || descriptionValue.length === 0) {
        return "网址不存在";
    }
    return descriptionValue.map((segment) => segment.text).join("");
}

function getDescription(descriptionValue) {
    if (!descriptionValue || descriptionValue.length === 0) {
        return "任务描述不存在";
    }
    return descriptionValue.map((segment) => segment.text).join("");
}

export async function getCurrentTask() {
    // 1. 读取选中的表和记录 //
    const {tableId, recordId} = await bitable.base.getSelection();
    if (!tableId || !recordId) throw new Error("选区状态读取失败");
    const table = await bitable.base.getTableById(tableId);

    // 2. 读取单元格 //
    const completedValue = (await table.getCellValue(
        completedFieldId,
        recordId
    ));
    const userField = await table.getFieldByName(userFieldName);
    const userValue = (await table.getCellValue(
        userField.id,
        recordId
    ));
    const addressField = await table.getFieldByName(addressFieldName);
    const addressValue = (await table.getCellValue(
        addressField.id,
        recordId
    ));
    const descriptionValue = (await table.getCellValue(
        descriptionFieldId,
        recordId
    ));

    // 尝试一下：读取是否延期字段
    // 单选的值类型为 IOpenSingleSelect
    // const exceedingValue = (await table.getCellValue(exceedingFieldId, recordId));

    // 尝试一下：将 exceedingValue 转换成选中选项的字符串
    // const exceedingText = doYourCustomTransform(exceedingValue)

    // 3. 将单元格结构体转换成业务所需数据 //
    return {
        description: getDescription(descriptionValue),
        userName: getUserName(userValue),
        completed: completedValue,
        address: getAddress(addressValue),
        // 尝试一下：返回是否延期信息
        // exceeding: exceedingText
    };
}

export async function setCompleted(completed) {
    // 1. 读取选中的表和记录 //
    const {tableId, recordId} = await bitable.base.getSelection();
    if (!tableId || !recordId) throw new Error("选区状态读取失败");
    const table = await bitable.base.getTableById(tableId);

    // 2. 将业务数据转换成单元格结构，然后写入 //
    table.setCellValue(completedFieldId, recordId, completed);
}
