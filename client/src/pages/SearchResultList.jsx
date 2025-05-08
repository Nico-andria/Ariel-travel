import { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "./../shared/CommonSection";

import { useLocation } from "react-router-dom";
import TourCard from "../shared/TourCard";
import SearchBar from "../shared/SearchBar";

const SearchResultList = () => {
  const location = useLocation();

  const [data] = useState(location.state);
  return (
    <>
      <CommonSection title={"Tour Search Result"} />

      <section className="searchbar__container">
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            {data.length === 0 ? (
              <h4>No tour found</h4>
            ) : (
              data?.map((tour) => (
                <Col lg="3" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SearchResultList;
