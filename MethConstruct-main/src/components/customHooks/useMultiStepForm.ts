import React, { useState, ReactElement } from "react";

export function useMultiStepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((step) => {
      if (step >= steps.length - 1) return step; //Переход на следующий этап формы
      return step + 1;
    });
  }

  function back() {
    setCurrentStepIndex((step) => { 
      if (step < 0) return step; //Переход на предыдущий этап формы
      return step - 1;
    });
  }

  function goToStep(index: number) {
    setCurrentStepIndex(index); //Переход на нужный этап формы
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    goToStep,
    next,
    back,
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
  };
}
