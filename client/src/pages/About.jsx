import "../styles/about.css";
import LandyPhoto from "../assets/images/ariel/landy.jpg";
import CommonSection from "../shared/CommonSection";

const About = () => {
  return (
    <>
      <CommonSection title={"Who are we"} />
      <div className="about-container">
        <div className="section__div who_are_we">
          <p>
            Ariel Travel & Tours is a premier travel agency and tour operator
            based in Madagascar, specializing in bespoke luxury and high-end
            travel experiences. We meticulously design journeys across the
            island, offering exclusive access to Madagascar s most exquisite
            destinations. Committed to providing an unparalleled experience for
            our discerning VIP clients, we attend to every detail with precision
            and care, ensuring that expectations are not only met but
            consistently exceeded.
          </p>
          <p>
            Whether you seek a pre-arranged itinerary or a fully tailored
            experience, we offer both ready-made trips and fully customized
            travel, each designed to fulfill your unique desires. From family
            retreats and group getaways to solo explorations, corporate travel,
            or romantic honeymoons, our services are synonymous with the highest
            quality and exceptional flexibility.
          </p>
          <p>
            Available 24/7, our dedicated team stands ready to assist, advise,
            and turn your travel aspirations into reality.
          </p>
        </div>
        <div className="parallax" id="section1">
          <div className="content">
            <h2 className="about__title">Why Us</h2>
          </div>
        </div>
        <div className="section__div ">
          <div className="row">
            <div className="col-lg-4">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="96"
                  height="96"
                  fill="rgba(233,198,117,1)"
                >
                  <path d="M10.007 2.10377C8.60544 1.65006 7.08181 2.28116 6.41156 3.59306L5.60578 5.17023C5.51004 5.35763 5.35763 5.51004 5.17023 5.60578L3.59306 6.41156C2.28116 7.08181 1.65006 8.60544 2.10377 10.007L2.64923 11.692C2.71404 11.8922 2.71404 12.1078 2.64923 12.308L2.10377 13.993C1.65006 15.3946 2.28116 16.9182 3.59306 17.5885L5.17023 18.3942C5.35763 18.49 5.51004 18.6424 5.60578 18.8298L6.41156 20.407C7.08181 21.7189 8.60544 22.35 10.007 21.8963L11.692 21.3508C11.8922 21.286 12.1078 21.286 12.308 21.3508L13.993 21.8963C15.3946 22.35 16.9182 21.7189 17.5885 20.407L18.3942 18.8298C18.49 18.6424 18.6424 18.49 18.8298 18.3942L20.407 17.5885C21.7189 16.9182 22.35 15.3946 21.8963 13.993L21.3508 12.308C21.286 12.1078 21.286 11.8922 21.3508 11.692L21.8963 10.007C22.35 8.60544 21.7189 7.08181 20.407 6.41156L18.8298 5.60578C18.6424 5.51004 18.49 5.35763 18.3942 5.17023L17.5885 3.59306C16.9182 2.28116 15.3946 1.65006 13.993 2.10377L12.308 2.64923C12.1078 2.71403 11.8922 2.71404 11.692 2.64923L10.007 2.10377ZM6.75977 11.7573L8.17399 10.343L11.0024 13.1715L16.6593 7.51465L18.0735 8.92886L11.0024 15.9999L6.75977 11.7573Z"></path>
                </svg>
              </div>
              <div>
                <p>
                  We only offer what we know best: At Ariel Travel & Tours, we
                  don’t just offer travel experiences, we craft extraordinary
                  journeys that transcend the ordinary. Every product we present
                  has been meticulously tested and validated, ensuring it
                  delivers unparalleled excellence, because we believe you
                  deserve nothing less.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="96"
                  height="96"
                  fill="rgba(233,198,117,1)"
                >
                  <path d="M12 10C14.2091 10 16 8.20914 16 6 16 3.79086 14.2091 2 12 2 9.79086 2 8 3.79086 8 6 8 8.20914 9.79086 10 12 10ZM5.5 13C6.88071 13 8 11.8807 8 10.5 8 9.11929 6.88071 8 5.5 8 4.11929 8 3 9.11929 3 10.5 3 11.8807 4.11929 13 5.5 13ZM21 10.5C21 11.8807 19.8807 13 18.5 13 17.1193 13 16 11.8807 16 10.5 16 9.11929 17.1193 8 18.5 8 19.8807 8 21 9.11929 21 10.5ZM12 11C14.7614 11 17 13.2386 17 16V22H7V16C7 13.2386 9.23858 11 12 11ZM5 15.9999C5 15.307 5.10067 14.6376 5.28818 14.0056L5.11864 14.0204C3.36503 14.2104 2 15.6958 2 17.4999V21.9999H5V15.9999ZM22 21.9999V17.4999C22 15.6378 20.5459 14.1153 18.7118 14.0056 18.8993 14.6376 19 15.307 19 15.9999V21.9999H22Z"></path>
                </svg>
              </div>
              <div>
                <p>
                  Our team is a collective of experts who share a deep passion
                  for exploration and discovery. From our office staff to our
                  on-the-ground professionals, each individual is highly trained
                  with an intimate knowledge of the destinations we offer. We
                  collaborate with the finest luxury travel partners, both local
                  and international, to guarantee that every facet of your
                  journey, be it accommodations, transportation, or exclusive
                  activities…, reflects the highest standards of quality and
                  refinement.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="96"
                  height="96"
                  fill="rgba(233,198,117,1)"
                >
                  <path d="M12.0049 13.0028C13.6617 13.0028 15.0049 14.346 15.0049 16.0028C15.0049 16.8519 14.6521 17.6187 14.0851 18.1645L12.175 20.0024L15.0049 20.0028V22.0028H9.00488L9.00398 20.2784L12.6983 16.7234C12.8874 16.5411 13.0049 16.2857 13.0049 16.0028C13.0049 15.4505 12.5572 15.0028 12.0049 15.0028C11.4526 15.0028 11.0049 15.4505 11.0049 16.0028H9.00488C9.00488 14.346 10.348 13.0028 12.0049 13.0028ZM18.0049 13.0028V17.0028H20.0049V13.0028H22.0049V22.0028H20.0049V19.0028H16.0049V13.0028H18.0049ZM4.00488 12.0028C4.00488 14.5294 5.17612 16.7824 7.00527 18.2485L7.0049 20.665C4.01588 18.9359 2.00488 15.7042 2.00488 12.0028H4.00488ZM12.0049 2.00281C17.1902 2.00281 21.4537 5.94943 21.9555 11.0027L19.943 11.0029C19.4509 7.05652 16.0845 4.00281 12.0049 4.00281C9.54102 4.00281 7.33731 5.11664 5.8698 6.86824L8.00488 9.00281H2.00488V3.00281L4.45144 5.44929C6.28491 3.3379 8.98898 2.00281 12.0049 2.00281Z"></path>
                </svg>
              </div>
              <div>
                <p>
                  We are committed to providing tailored travel experiences that
                  align with your specific needs. With flexibility at our core,
                  we are available 24/7 to offer the support and guidance you
                  require before, during, and after your trip, ensuring a
                  seamless experience from start to finish.
                </p>
              </div>
            </div>
          </div>
          <div>
            <p>What sets us apart:</p>
            <ul>
              <li>
                <p>
                  <b>Tailor-Made Experiences:</b> Each journey is carefully
                  designed to ensure it meets your individual preferences and
                  expectations.
                </p>
              </li>
              <li>
                <p>
                  <b>Uncompromising Quality:</b> We deliver high-quality
                  services and top-tier amenities, with a focus on precision and
                  attention to detail at every step.
                </p>
              </li>
              <li>
                <p>
                  <b>Continuous Availability:</b> Our team is always ready to
                  provide assistance, whether for advice or unforeseen requests.
                </p>
              </li>
              <li>
                <p>
                  <b>Strategic Partnerships:</b> We partner with the best local
                  and international providers to ensure that every part of your
                  trip reflects excellence
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="parallax" id="section2">
          <div className="content">
            <h2 className="about__title">The Founder</h2>
          </div>
        </div>
        <div className="section__div row">
          <div className="landy__photo col-lg-4">
            <img
              src={LandyPhoto}
              alt=""
              height={"500px"}
              className="landyPhoto"
            />
          </div>
          <div className="landy__presentation col-lg-8">
            <h1 className="founder__title">Landy Ariel</h1>
            <p>
              I am Landy Ariel, founder of Ariel Travel & Tours, a travel agency
              dedicated to the art of exceptional journeys and luxury tourism in
              Madagascar. Driven by a deep passion for travel and a profound
              pride in the unique treasures of our island, I established Ariel
              Travel & Tours to offer VIP clients exclusive access to a refined
              and extraordinary Madagascar.
            </p>
            <p>
              At Ariel Travel & Tours, every journey is crafted to meet the
              expectations of our most discerning clients, who seek rare and
              authentic destinations where they can truly unwind and savor
              precious moments. Aware that our clients time is their greatest
              asset, my team and I meticulously orchestrate each detail with
              unmatched precision and care, ensuring a complete immersion into
              sites of unparalleled distinction.
            </p>
            <p>
              Our mission is to redefine luxury travel in Madagascar by
              delivering bespoke services that are exquisitely tailored to
              individual tastes and preferences. Through exclusive partnerships
              and a commitment to excellence, we reveal a Madagascar that
              remains largely undiscovered, where exotic beauty meets prestige,
              for a rare and unforgettable experience that embodies elegance and
              authenticity.
            </p>
          </div>
        </div>
        <div className="parallax" id="section3">
          <div className="content">{/* <h2>Section 3</h2> */}</div>
        </div>
      </div>
    </>
  );
};

export default About;
