
export function createInteractiveTimeline(steps, onSelect) {
  const stepGap = 200;
  const radius = 10;
  const totalWidth = stepGap * (steps.length - 1) + radius * 2;
  const height = 80;
  const svgNS = "http://www.w3.org/2000/svg";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", `-30 0 ${totalWidth} ${height}`);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svg.setAttribute("width", totalWidth);
  svg.setAttribute("height", 80);
  // svg.classList.add("w-auto", "h-auto");

  // Line
  const line = document.createElementNS(svgNS, "line");
  line.setAttribute("x1", radius);
  line.setAttribute("y1", height / 2);
  line.setAttribute("x2", (steps.length-1) * 100);
  line.setAttribute("y2", height / 2);
  line.setAttribute("stroke", "#d74894");
  line.setAttribute("stroke-width", "2");
  svg.appendChild(line);

  // Gradient + Glow Ring
  const defs = document.createElementNS(svgNS, "defs");
  defs.innerHTML = `
    <linearGradient id="dotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#d74894"/>
      <stop offset="100%" stop-color="#efb6d4"/>
    </linearGradient>
  `;
  svg.appendChild(defs);

  // Active Ring (behind)
  const activeRing = document.createElementNS(svgNS, "circle");
  activeRing.setAttribute("cy", height / 2);
  activeRing.setAttribute("cx", radius);
  activeRing.setAttribute("r", radius + 8);
  activeRing.setAttribute("fill", "none");
  activeRing.setAttribute("stroke", "#efb6d4");
  activeRing.setAttribute("stroke-width", "3");
  activeRing.setAttribute("class", "transition-ring pulse-ring");
  svg.appendChild(activeRing);

  // Active Dot (on top)
  const activeDot = document.createElementNS(svgNS, "circle");
  activeDot.setAttribute("cy", height / 2);
  activeDot.setAttribute("cx", radius);
  activeDot.setAttribute("r", radius + 4);
  activeDot.setAttribute("stroke", "#d74894");
  activeDot.setAttribute("stroke-width", "1.5");
  activeDot.setAttribute("fill", "url(#dotGradient)");
  activeDot.setAttribute("class", "transition-dot drop-glow");
  svg.appendChild(activeDot);

  const nodeRefs = [];

  // Nodes + Labels
  steps.forEach((step, i) => {
    const cx = radius + i * 100;
    const cy = height / 2;

    const dot = document.createElementNS(svgNS, "circle");
    dot.setAttribute("cx", cx);
    dot.setAttribute("cy", cy);
    dot.setAttribute("r", radius);
    dot.setAttribute("fill", "white");
    dot.setAttribute("stroke", "#d74894");
    dot.setAttribute("stroke-width", "2");
    dot.setAttribute("class", "timeline-node");
    dot.style.cursor = "pointer";

    dot.addEventListener("click", () => {
      activeRing.setAttribute("stroke", "transparent");
      activeDot.setAttribute("r", radius);

      setTimeout(() => {
        activeRing.setAttribute("stroke", "#efb6d4");
        activeDot.setAttribute("r", radius + 4);
      }, 300);

      activeDot.setAttribute("cx", cx);
      activeRing.setAttribute("cx", cx);

      highlightNode(i);
      onSelect(i, step); // 🔁 Use this to trigger actions (more on this below)
    });

    dot.addEventListener("mouseenter", () => {
      dot.classList.add("pulse");
    });

    dot.addEventListener("mouseleave", () => {
      dot.classList.remove("pulse");
    });

    svg.appendChild(dot);

    const label = document.createElementNS(svgNS, "text");
    label.setAttribute("x", cx);
    label.setAttribute("y", cy + radius + 25);
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("font-size", "16");
    label.setAttribute("fill", "#fff");
    label.setAttribute("class", "timeline-label");
    label.textContent = step;
    svg.appendChild(label);

    nodeRefs.push({ dot, label });
  });

  // Style selected node
  function highlightNode(index) {
    nodeRefs.forEach(({dot, label}, i) => {
      setTimeout(() => {
        dot.setAttribute("fill", i === index ? "transparent" : "white");
        dot.setAttribute("stroke", i === index ? "transparent" : "#d74894");
      }, 50);
      // node.setAttribute("fill", i === index ? "#efb6d4" : "white");
      // node.setAttribute("stroke", i === index ? "#efb6d4" : "#d74894");
      dot.setAttribute("r", i === index ? radius + 2 : radius);

      label.setAttribute("font-size", i === index ? "18" : "16");
      label.setAttribute("fill", i === index ? "#efb6d4" : "white");
      label.setAttribute("font-weight", i === index ? "bold" : "normal");
    });
  }

  highlightNode(0);
  return svg;
}
