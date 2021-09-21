import { Chart } from '@antv/g2';
import { useEffect, useRef, useState } from 'react';

function LineChart({ data, city })  {
  const [lineChart, setAqiChart] = useState();
  const elementRef = useRef();

  useEffect(() => {
    const chart = new Chart({
      container: elementRef.current,
      autoFit: true,
      height: 500,
    });
    chart.data([]);
    chart.scale({
      year: {
        range: [0, 1],
      },
      value: {
        min: 0,
        nice: true,
      },
    });
    
    chart.tooltip({
      showCrosshairs: true, // 展示 Tooltip 辅助线
      shared: true,
    });
    
    chart.line().position('time*aqi').label('aqi');
    chart.point().position('time*aqi');
    setAqiChart(chart);
    chart.render();
  }, []);

    if (lineChart && data.length) {
      lineChart.annotation().clear(true);
      lineChart.data(data);
      lineChart.annotation().text({
        position: ["50%", "95%"],
        content: `AQI of ${city}`,
        style: {
          fontSize: 20,
          fill: "#545454",
          textAlign: "center",
        },
      });
      lineChart.render(); 
    }

  return <div ref={elementRef}></div>;
}

export default LineChart;