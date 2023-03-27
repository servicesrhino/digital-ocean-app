export default class SaveHelperService {
  static save(category, sheetData2) {
    const correctData2 = category.filter(function (part) {
      return part.localizedName.includes('Engine');
    });
    console.log(correctData2);

    const newData = sheetData2.map((row) => {
      //return { ...row, catalogParts: { id2: cityId, Name: searchCategory } };
      return {
        ...row,
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
