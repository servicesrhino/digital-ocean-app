import { read, utils, writeFileXLSX } from 'xlsx';

export default class ParseService {
  static async parse(myFile, number) {
    const data = await myFile.arrayBuffer();
    const workbook = read(data);
    //setOther(workbook.Sheet);
    console.log(workbook);

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    let jsonData = [];
    if (number === 1 || number === 1.1) {
      // здесь нужно вернуть назад чтобы зарботал последний вариант на ===
      jsonData = utils.sheet_to_json(worksheet, {
        blankrows: '',
        header: 1,
      });
      return jsonData;
    }

    const jsonData2 = utils.sheet_to_json(worksheet);

    return jsonData2;
  }
}
