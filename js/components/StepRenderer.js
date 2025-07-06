import { renderOverviewStep } from "./steps/OverviewStep.js";
import { renderDeliveredStep } from "./steps/DeliveredStep.js";
import { renderWireframeStep } from "./steps/WireframeStep.js";

const stepRenderers = {
  overview: renderOverviewStep,
  delivered: renderDeliveredStep,
  wireframe: renderWireframeStep,
};

export function renderStep(step) {
  const renderer = stepRenderers[step.label.toLowerCase()] || stepRenderers.overview;
  return renderer(step);
}
