import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AqiTable from "../components/aqiTable/AqiTable";
import ComparisonChart from "../components/comparisonChart/ComparisonChart";
import ChooseCity from "../components/chooseCity/ChooseCity";
import GuageChart from "../components/guageChart/GuageChart";
import NoInternet from "../components/noInterNet/NoInternet";
import { Typography, Row, Col } from "antd";
import { Offline, Online } from "react-detect-offline";
import "./layout.css";
import { fetchAqiData } from "../redux/aqiData/actions";
import { convertData, createLineChartData } from "../helpers/utils";
import LineChart from "../components/lineChart/LineChart";


const { Title } = Typography;

function HomePage() {
  const { data } = useSelector((state) => state.aqiData);
  const [city, setCity] = useState('');
  const [colSize, setSizeCol] = useState(() => {
    return window.innerWidth < 780 ? 24 : 12;
  });
  let dispatch = useDispatch();
  const handleCity = (city) => {
    setCity(city);
  };
  // eslint-disable-next-line
  useEffect(() => {
    // eslint-disable-next-line
    fetchAqiData(dispatch, data);
    // eslint-disable-next-line
  }, []);

  let chart_data = convertData(data);

  let selected = chart_data.filter((el) => el.city === city);
  const selectedCity = createLineChartData(data, city)
  let cityData = !selected.length
    ? [{ value: 0 }]
    : [
        {
          value: selected[0].aqi,
        },
      ];

  const handleResize = (e) => {
    const windowSize = window.innerWidth;
    if (windowSize < 780) {
      setSizeCol(24);
    } else {
      setSizeCol(12);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Online>
        <Row className="selectCity">
          <ChooseCity
            className="SelectCity"
            data={chart_data}
            handleCity={handleCity}
          />
        </Row>
        {city && <Row>
          <Col span={24} className="text-center pb-4">
            <Title level={2}>Line chart of last 20 AQI values with respect to updated time</Title>
            <LineChart data={selectedCity} city={city} />
          </Col>
        </Row>}
        <Row>
          <Col span={colSize} className="chart">
            <Title level={2}>Real-Time AQI</Title>
            <GuageChart cityData={cityData} city={city} />
          </Col>
          <Col span={colSize} className="chart">
            <Title level={2}>Comparison Chart</Title>
            <ComparisonChart data={data} />
          </Col>
        </Row>
        <Row className="table">
          <Title level={2}>Real-Time AQI Table</Title>
          <AqiTable data={data} className="aqiTable" />
        </Row>
      </Online>
      <Offline>
        <NoInternet />
      </Offline>
    </>
  );
}

export default HomePage;
