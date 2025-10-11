import React, { useContext, useState } from 'react';
import { Store } from '../../Store';
import $api from '../http';

function Oblik2() {
  const [data, setData] = useState([]);
  const { state, oblik } = useContext(Store);
  const { userInfo } = state;
  const { jwtToken } = userInfo;
  // const token = jwtToken;
  console.log(jwtToken);
  const { lastDocumentsFromList } = state;
  const token = '';
  console.log(state);
  console.log(state.oblik);
  state.userInfo.jwtToken = token;
  console.log(state.userInfo);
  console.log(jwtToken);

  const getData = async () => {
    try {
      const res = await $api.post(
        `https://rhino-api-dyq7j.ondigitalocean.app/Reports/get-report-by-month`,
        {
          mounth: 8,
          managerName: state.oblik,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log(res.data);
      setData(res.data);
    } catch (error) {}
  };
  console.log(data);

  return (
    <div>
      <button onClick={getData}>sd</button>
      <div>Oblik2</div>
    </div>
  );
}

export default Oblik2;
