/* eslint-disable react/button-has-type */
/* eslint-disable no-restricted-globals */
import { useState, useEffect } from 'react';
import PopulateForm from '../components/PopulateForm';

const defaultForm = {
  region: '',
  tradingNetwork: '',
  returnPoint: null,
};

function Home() {
  const [form, setForm] = useState(defaultForm);
 

  const handleFormChange = (type, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [type]: value,
    }));
  };

  return (
    <main className="main">
      <div className="main__title">
        <h1 className="title">Возврат паллет</h1>
        <h2 className='subtitle'>Калькулятор поможет рассчитать стоимость возврата паллет с учетом параметров точек отправки и возврата.</h2>
      </div>
      <form className="pallet-return-form">
          <PopulateForm onChange={handleFormChange} />
      </form>
    </main>
  );
}

export default Home;
