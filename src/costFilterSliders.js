export const createCostFilterSliders = maxCost => {
  // let rangeMin = 0;
  // let rangeMax = maxCost;

  const minCostTextInput = document.getElementById('min-cost-filter');
  const maxCostTextInput = document.getElementById('max-cost-filter');
  const rangeInputTrack = document.getElementById('cost-range-track');
  const rangeInputSliders = document.querySelectorAll(
    '.cost-range-slider-box .double-range-slider input'
  );

  const minRangeFill = () => {
    rangeInputTrack.style.left =
      (rangeInputSliders[0].value / rangeInputSliders[0].max) * 100 + '%';
  };

  const maxRangeFill = () => {
    rangeInputTrack.style.right =
      100 - (rangeInputSliders[1].value / rangeInputSliders[1].max) * 100 + '%';
  };

  const setMinCostOutput = () => {
    minCostTextInput.value = rangeInputSliders[0].value;
    return parseInt(rangeInputSliders[0].value);
  };
  const setMaxCostOutput = () => {
    maxCostTextInput.value = rangeInputSliders[1].value;
    return parseInt(rangeInputSliders[1].value);
  };

  const setMinFromText = min => {
    //rangeInputSliders[0].style.left = (min / rangeInputSliders[0].max) * 100 + '%';
    rangeInputSliders[0].value = min;
    rangeInputTrack.style.left = (min / rangeInputSliders[0].max) * 100 + '%';
  };

  const setMaxFromText = max => {
    //rangeInputSliders[1] = 100 - (max / rangeInputSliders[1].max) * 100 + '%';
    rangeInputSliders[1].value = max;
    rangeInputTrack.style.right =
      100 - (max / rangeInputSliders[1].max) * 100 + '%';
  };
  // initiate sliders
  rangeInputSliders.forEach(input => {
    input.setAttribute('max', maxCost);
  });

  rangeInputSliders[1].value = maxCost;
  setMinCostOutput();
  setMaxCostOutput();
  minRangeFill();
  maxRangeFill();
  // slider event listener callback

  return {
    minRangeFill,
    maxRangeFill,
    setMinCostOutput,
    setMaxCostOutput,
    setMinFromText,
    setMaxFromText,
  };
};
