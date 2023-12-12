import Decimal from 'decimal.js';

const etherToOthers = {
  wei: 18,
  kwei: 15,
  mwei: 12,
  gwei: 9,
  szabo: 6,
  finney: 3,
  ether: 0,
  kether: -3,
  mether: -6,
  gether: -9,
  tether: -12,
};

/**
 * Converts a value from a specified unit to Ether.
 * @param value - The value to be converted.
 * @param from - The unit to convert from.
 * @returns The converted value in Ether as a Decimal.
 */
const getInEther = (value: string, from: string): Decimal => {
  const conversionFactor = etherToOthers[`${from}` as keyof typeof etherToOthers];
  if (conversionFactor === undefined) {
    throw new Error(`Conversion factor for unit '${from}' is undefined.`);
  }
  const numericValue = new Decimal(value);
  if (numericValue.isNaN()) {
    throw new Error('Invalid value. Must be a valid number.');
  }
  const divisor = new Decimal(10).pow(conversionFactor);
  return numericValue.dividedBy(divisor);
};

const conversions = (value: string, from: string) => {
  if (!value || !from) throw new Error('Invalid value or from');

  const inEther = getInEther(value, from);
  const result = {};
  return Object.entries(etherToOthers).map(([key, value]) => {
    const conversion = inEther.mul(new Decimal(10).pow(value));
    return {
      [`${key}`]: conversion.toFixed(),
    };
  });
};
const conversion = (value: string, from: string) => {
  if (!value || !from) throw new Error('Invalid value or from');

  const inEther = getInEther(value, from);
  const result: any = {};
  Object.entries(etherToOthers).forEach(([key, value]) => {
    const conversion = inEther.mul(new Decimal(10).pow(value));
    result[`${key}`] = conversion.toFixed();
  });

  return result;
};

const web3 = {
  conversions,
  conversion,
};
export default web3;
