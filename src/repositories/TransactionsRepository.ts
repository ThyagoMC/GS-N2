import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // const balance: Balance = { income: 0, outcome: 0, total: 0 };
    // this.transactions.forEach(transaction => {
    //   balance.income += transaction.type === 'income' ? transaction.value : 0;
    //   balance.outcome += transaction.type === 'outcome' ? transaction.value : 0;
    // });
    // balance.total = balance.income - balance.outcome;

    const balance = this.transactions.reduce<Balance>(
      (acc: Balance, current: Transaction): Balance => {
        acc.income += current.type === 'income' ? current.value : 0;
        acc.outcome += current.type === 'outcome' ? current.value : 0;
        return acc;
      },
      { income: 0, outcome: 0, total: 0 },
    );
    balance.total = balance.income - balance.outcome;
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
