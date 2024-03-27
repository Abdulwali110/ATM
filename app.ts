import inquirer from 'inquirer';

interface Account {
  balance: number;
  pin: number;
}

const account: Account = {
  balance: 10000, // Initial balance
  pin: 1234, // Simple PIN for demonstration
};

async function startATM() {
  const pinAnswer = await inquirer.prompt({
    name: 'pin',
    type: 'password',
    message: 'Please enter your PIN:',
    mask: '*',
  });

  if (parseInt(pinAnswer.pin) === account.pin) {
    let exit = false;
    do {
      const actionAnswer = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'Choose an action:',
        choices: ['Check Balance', 'Withdraw', 'Deposit', 'Exit'],
      });

      switch (actionAnswer.action) {
        case 'Check Balance':
          console.log(`Your current balance is $${account.balance}.`);
          break;
        case 'Withdraw':
          const withdrawAnswer = await inquirer.prompt({
            name: 'amount',
            type: 'number',
            message: 'How much would you like to withdraw?',
          });
          if (withdrawAnswer.amount <= account.balance) {
            account.balance -= withdrawAnswer.amount;
            console.log(`Withdrawal successful. Your new balance is $${account.balance}.`);
          } else {
            console.log('Insufficient funds.');
          }
          break;
        case 'Deposit':
          const depositAnswer = await inquirer.prompt({
            name: 'amount',
            type: 'number',
            message: 'How much would you like to deposit?',
          });
          account.balance += depositAnswer.amount;
          console.log(`Deposit successful. Your new balance is $${account.balance}.`);
          break;
        case 'Exit':
          exit = true;
          console.log('Thank you for using our ATM. Goodbye!');
          break;
      }
    } while (!exit);
  } else {
    console.log('Incorrect PIN.');
  }
}

startATM().catch((error) => {
  console.error('An error occurred:', error);
});
