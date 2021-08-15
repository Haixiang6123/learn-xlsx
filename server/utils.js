const xlsx = require('xlsx')

/**
 * 读取 excel
 * @param fileBuffer
 * @returns {unknown[]}
 */
function importExcelFromBuffer(fileBuffer) {
  // 获取 workbook
  const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
  // 获取第一张表名
  const firstSheetName = workbook.SheetNames[0];
  // 获取第一张表
  const firstSheet = workbook.Sheets[firstSheetName]
  // 获取数据
  return xlsx.utils.sheet_to_json(firstSheet);
}

/**
 * 将数据转成 excel
 * @param array
 * @param sheetName
 * @returns {any}
 */
function exportExcelFromData(array, sheetName = '表1') {
  const jsonWorkSheet = xlsx.utils.json_to_sheet(array);
  const workBook = {
    SheetNames: [sheetName],
    Sheets: {
      [sheetName]: jsonWorkSheet,
    }
  };
  return xlsx.write(workBook, {type: 'binary'});
}

/**
 * 转换 key
 * @param excelData
 * @param keysMap
 */
function convertKeys(excelData, keysMap) {
  return excelData.map(excelItem => {
    return Object.entries(excelItem).reduce((prev, curt) => {
      const [curtKey, curtValue] = curt;

      // 更新 key
      const mappedKey = keysMap[curtKey];
      if (mappedKey) {
        prev[mappedKey] = curtValue;
      }

      return prev;
    }, {});
  })
}

module.exports = {
  importExcelFromBuffer,
  exportExcelFromData,
  convertKeys,
}
