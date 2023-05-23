const currencyJPY = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' });

const formatCurrencyJPY = (value: number | bigint): string => currencyJPY.format(value);

export default formatCurrencyJPY;
