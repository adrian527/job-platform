import {
  ResponsiveContainer,
  AreaChart as AreaChartComponent,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const AreaChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChartComponent data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type="montone" dataKey="count" stroke="#2cb1bc" fill="#bef8fd" />
      </AreaChartComponent>
    </ResponsiveContainer>
  );
};
export default AreaChart;
