const getCurrency = async () => {
  try {
    const response = await fetch('https://www.nbrb.by/api/exrates/rates?periodicity=0');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const currencyTable = (line) => {
  return `
    <tr>
        <td>${line.Cur_Abbreviation}</td>
        <td>${line.Cur_Name}</td>
        <td>${line.Cur_Scale}</td>
        <td>${line.Cur_OfficialRate}</td>
    </tr>
    `;
};

const content = document.querySelector('#content');

const renderCurrencyTable = (data) => {
  for (let i = 0; i < data.length; i++) {
    content.insertAdjacentHTML('beforeend', currencyTable(data[i]));
  }
};

const getExchangeRates = async () => {
  renderCurrencyTable(await getCurrency());
};

getExchangeRates();

