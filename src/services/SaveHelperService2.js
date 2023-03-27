export default class SaveHelperService2 {
  static save(category, sheetData2) {
    const correctData2 = category.filter(function (part) {
      return part.localizedName.includes('Engine');
    });
    console.log(correctData2);

    const newData = sheetData2.map((row, index) => {
      //return { ...row, catalogParts: { id2: cityId, Name: searchCategory } };

      return {
        // ...row,
        id: sheetData2[index].id,
        vehicle: sheetData2[index].vehicle,
        name: sheetData2[index].name,
        rhinoID: sheetData2[index].rhinoID,
        originalID: `${sheetData2[index].originalID}`,
        stockPrice: sheetData2[index].stockPrice,
        incomePrice: sheetData2[index].incomePrice,
        priceWithDepreciation: sheetData2[index].priceWithDepreciation,
        deliveryInfo: sheetData2[index].deliveryInfo,
        defect: sheetData2[index].defect,
        catalogPart: {
          id: correctData2[0].id,
          Name: correctData2[0].name,
          Parents: correctData2[0].parents,
          LocalizedName: correctData2[0].localizedName,
        },
      };
    });
    console.log(newData);
    return newData;
    //setSheetData2(newData);
  }
}
