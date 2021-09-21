import { Select } from "antd";
const { Option } = Select;

function ChooseCity({ data, handleCity }) {
  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select a City"
      optionFilterProp="children"
      onChange={handleCity}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {data.map(({ city }) => (
        <Option key={city} value={city}>
          {city}
        </Option>
      ))}
    </Select>
  );
}

export default ChooseCity;
