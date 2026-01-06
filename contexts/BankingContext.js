"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const BankingContext = createContext({});

const initialBankAccounts = [
  {
    id: 1,
    bankName: "GTBank",
    accountNumber: "0123456789",
    accountType: "Savings",
  },
  {
    id: 2,
    bankName: "Zenith Bank",
    accountNumber: "9876543210",
    accountType: "Checking",
  },
];

export function BankingProvider({ children }) {
  const [balances, setBalances] = useState({
    NGN: 0.00,
    USDT: 0.00,
    BTC: 0.000000,
    ETH: 0.000000,
    SOL: 0.0000,
  });

  const [bankAccounts, setBankAccounts] = useState(initialBankAccounts);
  const [transactions, setTransactions] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const savedBalances = localStorage.getItem("kambit_balances");
      const savedAccounts = localStorage.getItem("kambit_accounts");
      const savedTransactions = localStorage.getItem("kambit_txs");

      if (savedBalances) setBalances(JSON.parse(savedBalances));
      if (savedAccounts) setBankAccounts(JSON.parse(savedAccounts));
      if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    } catch (error) {
      console.error("Failed to load banking state:", error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("kambit_balances", JSON.stringify(balances));
      localStorage.setItem("kambit_accounts", JSON.stringify(bankAccounts));
      localStorage.setItem("kambit_txs", JSON.stringify(transactions));
    }
  }, [balances, bankAccounts, transactions, isInitialized]);

  const handleFunding = (amount, asset) => {
    const numAmount = parseFloat(amount);
    setBalances((prev) => ({
      ...prev,
      [asset]: Number((prev[asset] + numAmount).toFixed(8)),
    }));

  };

  const handleWithdrawal = (amount, asset) => {
    const withdrawalAmount = parseFloat(amount);
    if (balances[asset] >= withdrawalAmount) {
      setBalances((prev) => ({
        ...prev,
        [asset]: Number((prev[asset] - withdrawalAmount).toFixed(8)),
      }));
      return true;
    }
    return false;
  };

  const addBankAccount = (bankAccount) => {
    setBankAccounts((prev) => [...prev, { id: Date.now(), ...bankAccount }]);
  };

  // --- Function to remove a bank account ---
  const removeBankAccount = (id) => {
    setBankAccounts((prev) => prev.filter((bank) => bank.id !== id));
  };

  return (
    <BankingContext.Provider
      value={{
        balances,
        bankAccounts,
        transactions,
        handleFunding,
        handleWithdrawal,
        addBankAccount,
        removeBankAccount,
        isInitialized,
      }}
    >
      {children}
    </BankingContext.Provider>
  );
}

export const useBanking = () => {
  const context = useContext(BankingContext);
  if (context === undefined) {
    throw new Error("useBanking must be used within a BankingProvider");
  }
  return context;
};