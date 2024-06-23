/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import { useState, useMemo, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import Select from '../Select';
import useFetchData from '../../hooks/UseFetchData';

function PopulateForm({ onChange }) {
  const { loading, formData } = useFetchData();
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedTradingNetwork, setSelectedTradingNetwork] = useState('');
  const [selectedReturnPointKey, setSelectedReturnPointKey] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  const {
    regions,
    tradingNetworks,
    returnPoints,
    returnPoint,
  } = useMemo(() => ({
    regions: Object.keys(formData),
    tradingNetworks: selectedRegion ? Object.keys(formData[selectedRegion]) : [],
    returnPoints: selectedTradingNetwork ? Object.keys(formData[selectedRegion][selectedTradingNetwork]) : [],
    returnPoint: formData[selectedRegion]?.[selectedTradingNetwork]?.[selectedReturnPointKey],
  }), [formData, selectedRegion, selectedTradingNetwork, selectedReturnPointKey]);

  const handleInputChange = (type, value) => {
    switch (type) {
      case 'region':
        setSelectedRegion(value);
        onChange(type, value);
        setSelectedTradingNetwork('');
        setSelectedReturnPointKey('');
        break;
      case 'tradingNetwork':
        setSelectedTradingNetwork(value);
        onChange(type, value);
        setSelectedReturnPointKey('');
        break;
      case 'returnPoint':
        setSelectedReturnPointKey(value);
        break;
      default:
        break;
    }
  };

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleCalculate = (e) => {
    e.preventDefault();


    const selectedTariff = parseFloat(returnPoint.tariff);
    const inputNumber = parseFloat(inputValue);

    if (!isNaN(selectedTariff) && !isNaN(inputNumber)) {
      const calculatedResult = selectedTariff * inputNumber;

      setResult(
        new Intl.NumberFormat('ru-RU').format(
          calculatedResult,
        ),
      );
    } else {
      console.error('Ошибка: одно из значений не является числом');
      setResult('');
    }
  };

  useEffect(() => {
    setResult('');
    setInputValue('');
  }, [regions, tradingNetworks, returnPoints]);

  useEffect(() => {
    if (returnPoint) {
      onChange('returnPoint', returnPoint);
    }
  }, [returnPoint]);

  return (
    <div className='pallet-return-form__wrapper'>
      {loading ? (
        <div className="loader-container">
          <ClipLoader color="#123abc" size={150} />
        </div>
      ) : (
        <>
          <div className="pallet-return-form__group">
            <div className="pallet-return-form__select-wrapp">
              <span className='pallet-return-form__select-wrapp__title'>Регион</span>
              <Select
                id="region"
                value={selectedRegion}
                onChange={(e) => handleInputChange('region', e.target.value)}
                options={regions}
                placeholder="Выберите регион"
              />
            </div>

            <div className="pallet-return-form__select-wrapp">
              <span className='pallet-return-form__select-wrapp__title'>Торговая сеть</span>
              <Select
                id="trading-network"
                value={selectedTradingNetwork}
                onChange={(e) => handleInputChange('tradingNetwork', e.target.value)}
                options={tradingNetworks}
                placeholder="Выберите торговую сеть"
                disabled={!selectedRegion}
              />
            </div>

            <div className="pallet-return-form__select-wrapp">
              <span className='pallet-return-form__select-wrapp__title'>Точка возврата</span>
              <Select
                id="return-point"
                value={selectedReturnPointKey}
                onChange={(e) => handleInputChange('returnPoint', e.target.value)}
                options={returnPoints}
                placeholder="Выберите точку возврата"
                disabled={!selectedTradingNetwork}
              />
            </div>
          </div>

          <div className="pallet-return-form__sum">
            <div className="pallet-return-form__group__input-wrapper">
              <span className="pallet-return-form__group__input-desc">Введите кол-во паллет/месяц:</span>
              <input
                className="pallet-return-form__group__input"
                type="number"
                value={inputValue}
                onChange={handleInputValue}
              />
              <button
                className="pallet-return-form__group__btn btn"
                onClick={handleCalculate}
              >
                Обновить данные
              </button>
            </div>
          </div>

          <div className="pallet-return-form__group__desc">
            <div className="pallet-return-form__group__desc-ppt">
              <p className='pallet-return-form__group__desc-ppt__title'>PLN: 
                <span className='pallet-return-form__group__desc-ppt__title__subtitle'>{returnPoint?.pln}</span>
              </p>
              <p className='pallet-return-form__group__desc-ppt__title'>РЦ: 
                <span className='pallet-return-form__group__desc-ppt__title__subtitle'>{returnPoint?.rcs}</span>
              </p>
              <p className='pallet-return-form__group__desc-ppt__title'>Тариф: 
                <span className='pallet-return-form__group__desc-ppt__title__subtitle'>
                  <span className='pallet-return-form__group__desc-ppt__title__subtitle__num'>{returnPoint?.tariff}</span> 
                  руб./паллета
                </span>
              </p>
            </div>
            <div className="pallet-return-form__group__desc-result">
              <p className='pallet-return-form__group__desc-result__sum'>Стоимость возврата паллет:</p>
              <p className='pallet-return-form__group__desc-result__res'>{result} <span className='pallet-return-form__group__desc-result__res__subtitle'>₽</span></p>
              <p className='pallet-return-form__group__desc-result__desc'>Рассчет стоимости возврата паллет <br /> не является публичной оффертой.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PopulateForm;
