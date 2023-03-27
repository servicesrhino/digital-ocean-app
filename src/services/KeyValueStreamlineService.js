export default class KeyValueStreamlineService {
  static stremline(jsonData2) {
    const result = JSON.parse(
      JSON.stringify(jsonData2)
        .replaceAll('"Авто"', '"vehicle"')
        .replaceAll('"Наименование"', '"name"')
        .replaceAll('"цена входящая"', '"incomePrice"')
        .replaceAll('"цена со склада"', '"stockPrice"')
        .replaceAll('"цена с амотизацией"', '"priceWithDepreciation"')
        .replaceAll('"номер Rhino"', '"rhinoID"')
        .replaceAll('"оригинальный номер"', '"originalID"')
        .replaceAll('"Дата завоза"', '"deliveryInfo"')
    );

    return result;
  }
}
