import InputView from './view/InputView.js';
import MenuManager from './domain/MenuManager.js';
import OrderManager from './domain/OrderManager.js';
import EventManager from './domain/EventManager.js';
import OutputView from './view/OutputView.js';

class App {
  constructor() {
    this.menuManager = new MenuManager();
    this.orderManager;
    this.eventManager;
  }

  async run() {
    await this.receiveGuestAnswer();
    this.eventManager.calculateGuestBenefit(this.orderManager, this.menuManager);
    OutputView.printMenu(this.orderManager, this.eventManager, this.menuManager);
  }

  async receiveGuestAnswer() {
    const date = await InputView.readDate();
    this.eventManager = new EventManager(date);

    const order = await InputView.readOrder(date);
    this.orderManager = new OrderManager(order);
  }
}

export default App;
