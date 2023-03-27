import { read, utils, writeFileXLSX } from 'xlsx';

export default class ParseService {
  static async parse(myFile) {
    const data = await myFile.arrayBuffer();
    const workbook = read(data);
    //setOther(workbook.Sheet);
    console.log(workbook);

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json(worksheet, {
      blankrows: '',
      header: 1,
    });

    const jsonData2 = utils.sheet_to_json(worksheet);

    return jsonData2;
  }
}
