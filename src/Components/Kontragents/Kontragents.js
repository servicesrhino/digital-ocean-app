// import React, { useEffect, useState } from 'react';
// import './Kontragents.css';
// import Sidebar from '../Sidebar/Sidebar';
// import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
// import $api from '../http';

// function Kontragents() {
//   const [data, setData] = useState('');
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [details, setDetails] = useState('');

//   const addKontragents = async (e) => {
//     try {
//       const res = $api
//         .post(`https://rhino-api-dyq7j.ondigitalocean.app/Сounterparty/add`, {
//           name: name,
//           phone: phone,
//           email: email,
//           details: details,
//         })
//         .then((response) => {
//           console.log(response);
//         });
//     } catch (error) {}
//   };

//   useEffect(() => {
//     getKontragents();
//   }, []);

//   const getKontragents = async (e) => {
//     try {
//       const res = $api
//         .post(
//           `https://rhino-api-dyq7j.ondigitalocean.app/Сounterparty/get-all`,
//           {
//             page: 0,
//             pageSize: 0,
//           }
//         )
//         .then((response) => {
//           console.log(response);
//           setData(response.data);
//         });
//     } catch (error) {}
//   };
//   console.log(data);

//   return (
//     <div className="app4">
//       <div className="app__body4">
//         <Sidebar />
//         <div className="form">
//           <Container className="small-conteiner mx-4">
//             <h1 className="my-4 test2">Koнтрагенти</h1>
//             <div className="small-container">
//               <Form onSubmit={addKontragents} className="test2">
//                 <Form.Group className="mb-3" controlId="name">
//                   <Form.Label>Ім'я</Form.Label>
//                   <Form.Control
//                     required
//                     onChange={(e) => setName(e.target.value)}
//                   ></Form.Control>
//                   <Form.Label>Телефон</Form.Label>
//                   <Form.Control
//                     required
//                     onChange={(e) => setPhone(e.target.value)}
//                   ></Form.Control>
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     required
//                     onChange={(e) => setEmail(e.target.value)}
//                   ></Form.Control>
//                   <Form.Label>Деталі</Form.Label>
//                   <Form.Control
//                     required
//                     onChange={(e) => setDetails(e.target.value)}
//                   ></Form.Control>
//                 </Form.Group>
//                 <div className="mb-3">
//                   <Button type="submit">Відправити</Button>
//                 </div>
//               </Form>
//             </div>
//           </Container>
//           <div>{/* <button onClick={getKontragents}>dfd</button> */}</div>
//           <div>
//             <Row>
//               <Col>
//                 <Table>
//                   <thead>
//                     <tr>
//                       <th>Ім'я</th>
//                       <th>Телефон</th>
//                       <th>Email</th>
//                       <th>Деталі</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {data &&
//                       data.map((item, index) => (
//                         <tr key={index}>
//                           <td>{item.name}</td>
//                           <td>{item.phone}</td>
//                           <td>{item.email}</td>
//                           <td>{item.details}</td>
//                         </tr>
//                       ))}
//                   </tbody>
//                 </Table>
//               </Col>
//             </Row>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Kontragents;
import React, { useEffect, useState, useCallback } from 'react';
import './Kontragents.css';
import Sidebar from '../Sidebar/Sidebar';
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Table,
  Spinner,
  Alert,
} from 'react-bootstrap';
import $api from '../http';

function Kontragents() {
  const [data, setData] = useState([]); // array, not ''

  // const [name, setName] = useState('');
  // const [phone, setPhone] = useState('');
  // const [email, setEmail] = useState('');
  // const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  // const [submitting, setSubmitting] = useState(false);
  // const [error, setError] = useState(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const getKontragents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // If $api has baseURL configured, prefer relative path:
      // const res = await $api.post('/Counterparty/get-all', { page: 1, pageSize: 50 });
      const res = await $api.post(
        'https://rhino-api-dyq7j.ondigitalocean.app/Сounterparty/get-all',
        {
          page: 1,
          pageSize: 50,
        }
      );
      // Ensure the API returns an array. If it wraps, adjust accordingly (e.g., res.data.items)
      setData(Array.isArray(res.data) ? res.data : res.data?.items ?? []);
    } catch (err) {
      console.error(err);
      setError('Не вдалося завантажити контрагентів. Спробуйте ще раз.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getKontragents();
  }, [getKontragents]);

  // const addKontragents = async (e) => {
  //   e.preventDefault(); // prevent page reload
  //   setSubmitting(true);
  //   setError(null);
  //   try {
  //     // Basic email/phone sanity checks (optional)
  //     if (!/\S+@\S+\.\S+/.test(email)) {
  //       throw new Error('Некоректний email');
  //     }
  //     // const res = await $api.post('/Counterparty/add', { name, phone, email, details });
  //     await $api.post(
  //       'https://rhino-api-dyq7j.ondigitalocean.app/Сounterparty/add',
  //       {
  //         name,
  //         phone,
  //         email,
  //         details,
  //       }
  //     );

  //     // Optimistic: add to list without re-fetch, or re-fetch:
  //     // setData((prev) => [{ id: crypto.randomUUID(), name, phone, email, details }, ...prev]);
  //     await getKontragents();

  //     // Clear form
  //     setName('');
  //     setPhone('');
  //     setEmail('');
  //     setDetails('');
  //   } catch (err) {
  //     console.error(err);
  //     setError(err.message || 'Не вдалося додати контрагента.');
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const addKontragents = async (e) => {
    e.preventDefault(); // 1) stop reload
    setError(null);
    if (submitting) return; // guard against double-clicks
    setSubmitting(true);
    try {
      // 3) await the call
      await $api.post(
        'https://rhino-api-dyq7j.ondigitalocean.app/Сounterparty/add',
        { name, phone, email, details }
      );

      // refresh list (await so errors surface)
      await getKontragents();

      // 4) clear the form so you don’t accidentally re-send the same person
      setName('');
      setPhone('');
      setEmail('');
      setDetails('');
    } catch (err) {
      // 2) show backend message (409 duplicate, 400 validation, etc.)
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Не вдалося додати контрагента.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app4">
      <div className="app__body4">
        <Sidebar />
        <div className="form">
          <Container className="small-container mx-4">
            <h1 className="my-4 test2">Контрагенти</h1>

            {error && (
              <Alert variant="danger" className="mb-3">
                {error}
              </Alert>
            )}

            <div className="small-container">
              <Form onSubmit={addKontragents} className="test2">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Ім&apos;я</Form.Label>
                  <Form.Control
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Телефон</Form.Label>
                  <Form.Control
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="details">
                  <Form.Label>Деталі</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    required
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  />
                </Form.Group>

                <div className="mb-3 d-flex gap-2">
                  <Button type="submit" disabled={submitting}>
                    {submitting ? (
                      <Spinner size="sm" animation="border" />
                    ) : (
                      'Відправити'
                    )}
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={getKontragents}
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner size="sm" animation="border" />
                    ) : (
                      'Оновити список'
                    )}
                  </Button>
                </div>
              </Form>
            </div>

            <Row>
              <Col>
                <Table striped bordered hover responsive size="sm">
                  <thead>
                    <tr>
                      <th>Ім&apos;я</th>
                      <th>Телефон</th>
                      <th>Email</th>
                      <th>Деталі</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && (
                      <tr>
                        <td colSpan={4} className="text-center">
                          <Spinner animation="border" /> Завантаження...
                        </td>
                      </tr>
                    )}
                    {!loading && data.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center">
                          Немає записів
                        </td>
                      </tr>
                    )}
                    {!loading &&
                      data.map((item) => (
                        <tr key={item.id ?? `${item.name}-${item.email}`}>
                          <td>{item.name}</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>{item.details}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Kontragents;
