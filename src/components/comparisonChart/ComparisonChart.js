import { useEffect, useRef, useState } from "react";
import { Chart } from "@antv/g2";
import { convertData, getColorCode } from "../../helpers/utils";

function ComparisonChart({ data }) {
  const [aqi_chart, setAqiChart] = useState();
  const elementRef = useRef();

  useEffect(() => {
    const chart = new Chart({
      container: elementRef.current,
      autoFit: true,
      height: 500,
    });

    chart.data([]);
    chart.tooltip({
      showMarkers: true,
    });

    chart
      .interval()
      .position("city*aqi")
      .color("aqi")
      .animate({
        appear: {
          animation: "delayScaleInY",
          easing: "easeElasticOut",
          delay(index) {
            return index * 10;
          },
        },
      })
      .style("aqi", (aqi) => {
        return { fill: getColorCode(aqi) };
      });

    chart.interaction("element-highlight");
    chart.interaction("legend-highlight");
    chart.interaction("axis-label-highlight");

    setAqiChart(chart);
    chart.render();
  }, []);

  let chart_data = convertData(data);

  if (aqi_chart && chart_data) {
    aqi_chart.data(chart_data);
    aqi_chart.render();
  }

  return <div ref={elementRef}></div>;
}

export default ComparisonChart;
