import { Console } from '@woowacourse/mission-utils';
import InputView from './view/InputView.js';
import MenuManager from './domain/MenuManager.js';
import OrderManager from './domain/OrderManager.js';
import EventManager from './domain/EventManager.js';
import Bill from './domain/Bill.js';
import OutputView from './view/OutputView.js';

class App {
  constructor() {
    this.menuManager = new MenuManager();
    this.orderManager;
    this.eventManager;
    this.date;
  }

  async run() {
    await this.receiveDateInput();
    await this.receiveOrderInput();
    this.eventManager.calculateDiscount(this.orderManager, this.menuManager);
    const bill = new Bill(this.orderManager, this.eventManager, this.menuManager);
    this.eventManager.canGetChampagne(bill.getTotalPrice());
    this.eventManager.canGetBadge(bill.getTotalBenefit());
    OutputView.printMenu(this.orderManager, this.eventManager, bill);
  }

  async receiveDateInput() {
    try {
      this.date = await InputView.readDate();
      this.eventManager = new EventManager(this.date);
    } catch (err) {
      Console.print(err.message);
      await this.receiveDateInput();
    }
  }

  async receiveOrderInput() {
    try {
      const order = await InputView.readOrder(this.date);
      this.orderManager = new OrderManager(order, this.menuManager);
    } catch (err) {
      Console.print(err.message);
      await this.receiveOrderInput();
    }
  }
}

export default App;
