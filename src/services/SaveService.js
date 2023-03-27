import $api from '../Components/http';

export default class SaveService {
  static mainSave(newData) {
    for (let index = 0; index < newData.length; index++) {
      const element = [];
      element.push(newData[index]);
      console.log(element);

      console.log(newData[index]);

      let items = [];

      const response = $api
        .post(
          `https://rhino-api-alquo.ondigitalocean.app/Parts/add-to-warehouse`,
          {
            items: [
              {
                id: newData[index].id,
                vehicle: newData[index].vehicle,
                name: newData[index].name,
                rhinoID: newData[index].rhinoID,
                originalID: `${newData[index].originalID}`,
                stockPrice: newData[index].stockPrice,
                incomePrice: newData[index].incomePrice,
                priceWithDepreciation: newData[index].priceWithDepreciation,
                deliveryInfo: newData[index].deliveryInfo,
                defect: newData[index].defect,
                catalogPart: {
                  id: newData[index].catalogPart.id,
                  Name: newData[index].catalogPart.Name,
                  Parents: newData[index].catalogPart.Parents,
                  LocalizedName: newData[index].catalogPart.LocalizedName,
                },
              },
            ],
          }
        )
        .then((res) => {
          const response = res.data;
          //console.log(res);
          items.push(res.data.success);
          //console.log(items);
        });
    }
  }
}
