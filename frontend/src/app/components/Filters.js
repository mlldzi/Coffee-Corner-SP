import React, {useState} from 'react';

const Filters = ({handleSearch}) => {
    const [searchMode, setSearchMode] = useState('id');
    const [searchTerm, setSearchTerm] = useState('');

    const handleChangeMode = (e) => {
        setSearchMode(e.target.value);
        setSearchTerm('');
        handleSearch(e.target.value, '');
    };

    const handleChangeTerm = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        handleSearch(searchMode, value); 
    };

    return (
        <div>
            <label htmlFor="searchMode">Выберите режим поиска:</label>
            <select id="searchMode" value={searchMode} onChange={handleChangeMode}>
                <option value="id">По ID заказа</option>
                <option value="phone_number">По номеру телефона</option>
                <option value="cart">По содержимому корзины</option>
            </select>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChangeTerm}
                placeholder={`Введите ${searchMode === 'id' ? 'ID' : searchMode === 'phone_number' ? 'номер телефона' : 'содержимое корзины'}`}
            />
        </div>
    );
};

export default Filters;
