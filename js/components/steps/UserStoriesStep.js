import { fetchFormResponses } from "../../utils/fetchFeedback.js";

export function renderUserStoriesStep(step) {
  const container = document.createElement('div');

  const introParagraph = document.createElement('p');
  introParagraph.className = 'text-lg mb-4';
  introParagraph.textContent = 'Based on the data I gathered, I created the following user stories to guide the development of the project:';
  container.appendChild(introParagraph);

  if (step.graphs && Array.isArray(step.graphs)) {
    const chartsContainer = document.createElement('div');
    chartsContainer.className = 'mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4';

    const renderChart = (graph, chartEl, container, feedbacks) => {
      const data = feedbacks.reduce((acc, current) => {
        const answer = current[graph.question];
        if (graph.multipleChoice && answer) {
          const choices = answer.split(',').map(choice => choice.trim());
          choices.forEach(choice => {
            acc[choice] = (acc[choice] || 0) + 1;
          });
        } else if (answer) {
          acc[answer] = (acc[answer] || 0) + 1;
        }
        return acc;
      }, {});

      new Chart(chartEl, {
        type: graph.type,
        data: {
          labels: graph.labels,
          datasets: [{
            label: graph.title,
            data: graph.dataKeys.map(key => data[key] || 0),
            borderWidth: 1,
            backgroundColor: graph.colors || '#efb6d4'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: graph.type === 'pie',
          plugins: {
            legend: {
              display: graph.type !== 'bar',
              labels: {
                color: '#fff' // White text for legend
              }
            },
            title: {
              display: true,
              text: graph.title,
              color: '#fff' // White text for title
            }
          },
          scales: {
            y: {
              ticks: {
                color: '#fff' // White text for y-axis labels
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)' // Lighter grid lines
              }
            },
            x: {
              ticks: {
                color: '#fff' // White text for x-axis labels
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)' // Lighter grid lines
              }
            }
          },
          animation: {
            onComplete: () => {
              const event = new CustomEvent('chartRendered', { bubbles: true });
              container.dispatchEvent(event);
            }
          }
        }
      });
    };

    const renderCharts = async () => {
      const feedbacks = await fetchFormResponses();
      step.graphs.forEach(graph => {
        const chartContainer = document.createElement('div');
        chartContainer.className = 'w-full';
        const chartEl = document.createElement('canvas');
        chartContainer.appendChild(chartEl);

        renderChart(graph, chartEl, container, feedbacks);

        chartsContainer.appendChild(chartContainer);
      });
    };

    renderCharts();

    container.appendChild(chartsContainer);
  }

  if (step.stories && Array.isArray(step.stories)) {
    const list = document.createElement('ul');
    list.className = 'list-disc pl-5 space-y-1 text-base leading-snug md:columns-2';

    step.stories.forEach(storyText => {
      const item = document.createElement('li');
      item.textContent = storyText;
      list.appendChild(item);
    });

    container.appendChild(list);
  }

  if (!container.hasChildNodes()) {
    const comingSoon = document.createElement('p');
    comingSoon.textContent = 'Working on implementation currently!';
    container.appendChild(comingSoon);
  }

  return container;
}