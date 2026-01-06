const staticRates = {
  USDT: {
    USDT: 1.0,
    BTC: 0.000015,
    ETH: 0.00038,
    SOL: 0.0068,
    NGN: 1710.50, // 1 USDT = ₦1,710.50
  },
  BTC: {
    USDT: 64500.0,
    BTC: 1.0,
    ETH: 21.5,
    SOL: 425.0,
    NGN: 110450200.0, // 1 BTC = ₦110,450,200
  },
  ETH: {
    USDT: 2650.0,
    BTC: 0.046,
    ETH: 1.0,
    SOL: 18.2,
    NGN: 4520300.0, // 1 ETH = ₦4,520,300
  },
  SOL: {
    USDT: 145.0,
    BTC: 0.0022,
    ETH: 0.054,
    SOL: 1.0,
    NGN: 245150.0, // 1 SOL = ₦245,150
  },
  NGN: {
    USDT: 0.00058,
    BTC: 0.000000009,
    ETH: 0.00000022,
    SOL: 0.0000041,
    NGN: 1.0,
  },
};

export default staticRates;