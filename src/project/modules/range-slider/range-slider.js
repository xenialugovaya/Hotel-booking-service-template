class RangeSlider {
  constructor(element) {
    this.init(element);
  }

  init(element) {
    this.$element = element;
    this.render();
    this.setValuesToInput();
  }

  render() {
    this.$element.find('.range-slider__body').slider({
      range: true,
      min: 0,
      max: 16000,
      values: [5000, 10000],
      slide: (event, ui) => {
        this.$element.find('.range-slider__selected-amount').val(`${ui.values[0].toLocaleString()}\u20BD - ${ui.values[1].toLocaleString()}\u20BD`);
      },
    });
  }

  setValuesToInput() {
    this.$element.find('.range-slider__selected-amount').val(`${this.$element.find('.range-slider__body').slider('values', 0).toLocaleString()}\u20BD - ${
      this.$element.find('.range-slider__body').slider('values', 1).toLocaleString()}\u20BD`);
  }
}

function renderComponent() {
  $(() => {
    $('.js-range-slider').each((index, node) => {
      const rangeSlider = new RangeSlider($(node));
      return rangeSlider;
    });
  });
}

renderComponent();