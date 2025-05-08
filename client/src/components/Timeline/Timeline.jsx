import "./timeline.css";

const Timeline = ({ timelines }) => {
  return (
    <>
      <div className="timeline">
        {timelines?.map((timeline, index) => (
          <div className="container left-container" key={index}>
            <span className="nombre">{index + 1}</span>{" "}
            {/* Affiche le numéro du jour */}
            <div className="text-box">
              <h3>
                {Object.keys(timeline)[0]} - {Object.values(timeline)[0]}
              </h3>{" "}
              {/* Affiche le jour, par exemple "Day 1" */}
              <p>{Object.values(timeline)[1]}</p> {/* Affiche les activités */}
              <span className="arrow"></span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Timeline;
