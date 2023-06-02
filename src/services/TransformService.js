export default class TransformService {
  static transform(jsonData2) {
    // раскоментировать здесь для разборки
    let marks = [];
    for (let i = 0; i < jsonData2.length; i++) {
      //const element = array[i];
      if (jsonData2[i][0].length === 1) {
        marks.push(jsonData2[i][0]);
      }

      if (jsonData2[i][1] && jsonData2[i][1].length >= 18) {
        marks.push(jsonData2[i][1]);
      }
      if (
        jsonData2[i][1] &&
        jsonData2[i][1].includes('BMW') &&
        jsonData2[i][1].length >= 5
      ) {
        marks.push(jsonData2[i][1]);
      }
      if (marks) {
        marks.flat();
      }

      if (
        jsonData2[i][0] !== marks[0] &&
        jsonData2[i][0] !== 0
        // jsonData2[i][0] !== mark2.filter((item) => item === jsonData2[i][0])
        //!jsonData2[i][0]
      ) {
        jsonData2[i].unshift(
          [...marks.flat().filter((item, i) => item[i] !== jsonData2[i][0])]
          // .find((item, i) => item[i][-1] !== jsonData2[i][0])
          //.find((item, i) => item.pop())
        );

        // abc = jsonData2[i][0];
        //jsonData3.push([mark2[i - 1], ...jsonData2[i]]);
      }
    }
    console.log(marks.flat());
    console.log(jsonData2);
    jsonData2.shift();
    console.log(jsonData2);

    let marks2 = marks.filter((item) => {
      return item.length > 10;
    });
    console.log(marks2);
    //раскоментировать здесь для разборки

    //раскоментировать здесь

    let lastItems = jsonData2.map((item) => ({
      rhinoID: item[2],
      stelaj: item[3],
      name: item[4],
      Pl: item[5],
      originalIDs: item[6],
      incomePrice: item[8],
      stockPrice: 0,
      priceWithDepreciation: 0,
      quantity: item[7],
      deliveryInfo: 'some',
      vehicle: Array.isArray(item[0])
        ? item.map((item) => item[item.length - 1]).find((item) => item[0])
        : item[0],
      // vehicle: Array.isArray(item[0])
      //   ? item.findLast((element) => element[element.length] > 8)
      //   : item[0],
    }));
    console.log(lastItems);

    let lastItemsTest = [];
    let lastItemsTest2 = [];
    let lastItemsTest3 = [];

    lastItemsTest = lastItems.filter((item) => item.name !== undefined);
    console.log(lastItemsTest);
    lastItemsTest2 = lastItemsTest.filter(
      (item) => item.name !== 'Наименование'
    );
    console.log(lastItemsTest2);

    lastItemsTest3 = lastItemsTest2.filter((item) => item.name !== 'Деталь');
    console.log(lastItemsTest3);

    console.log(lastItems);

    return lastItemsTest3;

    //раскоментировать здесь
  }
}
