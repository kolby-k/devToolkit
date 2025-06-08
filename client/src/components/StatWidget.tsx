export interface Stat {
  value: number | string;
  label: string;
}
function StatWidget({ value, label }: Stat) {
  return (
    <div id="stat-widget">
      <h3>{value}</h3>
      <h4>{label}</h4>
    </div>
  );
}

export default StatWidget;
