import "./Stats.css";

const stats = [
  {
    number: "10M+",
    title: "Links Shortened",
  },
  {
    number: "99.9%",
    title: "Uptime",
  },
  {
    number: "120+",
    title: "Countries",
  },
  {
    number: "24/7",
    title: "Support",
  },
];

const Stats = () => {
  return (
    <section className="stats">

      <div className="stats-container">

        {stats.map((item, index) => (
          <div className="stat-card" key={index}>

            <h2>{item.number}</h2>

            <p>{item.title}</p>

          </div>
        ))}

      </div>

    </section>
  );
};

export default Stats;