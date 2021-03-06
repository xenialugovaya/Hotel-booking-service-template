import Dropdown from './Dropdown';

export default class DropdownSingle extends Dropdown {
  constructor(element) {
    super(element);
    this.init();
  }

  init() {
    this.wordForms = [
      ['гость', 'гостя', 'гостей'],
      ['младенец', 'младенца', 'младенцев'],
    ];
    this.handleClearButtonClick = () => {
      const $controls = this.$element.find('.iqdropdown-item-controls');
      $controls.each((index, node) => {
        const $counter = $(node).find('.counter');
        const $decrement = $(node).find('.button-decrement');
        while (parseInt($counter.html(), 10) > 0) {
          $decrement.click();
        }
      });
      this.addDefaultClass();
    };
    this.handleApplyButtonClick = () => {
      this.$element.removeClass('menu-open');
    };
    this.render({
      onChange: (id, itemCount, totalItems) => {
        this.updateText();
        if (totalItems > 0) {
          this.addClearButton();
        } else {
          this.removeClearButton();
        }
        if (itemCount === 0) {
          this.addDefaultClass(id);
        } else {
          this.removeDefaultClass(id);
        }
      },
    });
    this.setInputText('Сколько гостей');
    this.addButtonsBlock();
    this.addApplyButton();
    this.addDefaultClass();
  }

  addButtonsBlock() {
    const menu = this.$element.find('.iqdropdown-menu');
    const buttonsBlock = document.createElement('div');
    buttonsBlock.classList.add('buttons-block');
    menu.append(buttonsBlock);
    $(buttonsBlock).click((event) => event.stopPropagation());
  }

  addClearButton() {
    let clearButton = this.$element.find('.clear-button');
    if (clearButton.length === 0) {
      clearButton = document.createElement('button');
      clearButton.classList.add('clear-button', 'button-transparent', 'button-transparent_disabled');
      clearButton.setAttribute('type', 'button');
      clearButton.innerText = 'Очистить';
      this.$element.find('.buttons-block').append(clearButton);
      $(clearButton).on('click', this.handleClearButtonClick);
    }
  }

  removeClearButton() {
    const clearButton = this.$element.find('.clear-button');
    clearButton.remove();
  }

  addApplyButton() {
    const applyButton = document.createElement('button');
    applyButton.classList.add('apply-button', 'button-transparent');
    applyButton.setAttribute('type', 'button');
    applyButton.innerText = 'Применить';
    this.$element.find('.buttons-block').append(applyButton);
    $(applyButton).on('click', this.handleApplyButtonClick);
  }

  updateText() {
    const $items = this.getMenuItems();
    let text = '';
    let guestsCount = 0;
    let babiesCount = 0;
    $items.each((index, item) => {
      const $counter = $(item).find('.counter');
      const itemCount = parseInt($counter.text(), 10);
      if (index < 2) {
        guestsCount += itemCount;
        const wordForm = Dropdown.getWordForm(guestsCount, this.wordForms[0]);
        text = `${guestsCount} ${wordForm}`;
      } else {
        babiesCount = itemCount;
        const wordForm = Dropdown.getWordForm(babiesCount, this.wordForms[1]);
        text += babiesCount ? `, ${babiesCount} ${wordForm}` : '';
      }
    });
    this.setInputText(text);
  }
}