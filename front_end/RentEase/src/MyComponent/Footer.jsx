import React from "react";
import logo from "../assets/images/logo.png";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaPinterest, FaTumblr } from "react-icons/fa";

const icons = [FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaPinterest, FaTumblr];
const Footer = () => {
  return (
    <footer className="py-5 bg-light ">
      <div className="container-fluid ">
        <div className="row">


          <div className="container">
            <div className="row">


              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="footer-menu">
                  <img src={logo} alt="logo" style={{ marginLeft: "40px", height: "150px", width: "200px" }} />


                  <div className="socialMedia" style={{ marginTop: "0px" }}>
                    <ul className="d-flex list-unstyled gap-2">
                      {icons.map((Icon, idx) => (
                        <li key={idx}>
                          <a href="#" className="btn btn-outline-dark">
                            <Icon size={16} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>



              {/* Footer Column: Ultras */}
              <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                <div className="footer-menu">
                  <h5 className="widget-title">RentEase</h5>
                  <ul className="menu-list list-unstyled">
                    {["About us", "Careers", "Blog", "Patner with us ", "Contact "].map(
                      (item, index) => (
                        <li className="menu-item" key={`ultras-${index}`}>
                          <a href="#" className="nav-link p-0 text-muted"
                          >{item}</a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              {/* Footer Column: Customer Service */}
              <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                <div className="footer-menu">
                  <h5 className="widget-title">Customer Service</h5>
                  <ul className="menu-list list-unstyled">
                    {["Help Center","Terms & Conditions","Privacy Policy","Rent Agreement Info","Police Verification"].map(
                        (item, index) => (
                    <li className="menu-item" key={`service-${index}`}>
                      <a href="#" className="nav-link p-0 text-muted">{item}</a>
                    </li>
                    )
                                        )}
                  </ul>
                </div>
              </div>

              {/* Footer Column: Information */}
              <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                <div className="footer-menu">
                  <h5 className="widget-title">Useful links</h5>
                  <ul className="menu-list list-unstyled">
                    {["Dashboard","Owner Login","Tenant Login","FaQa" ,"Contact Us"].map(
                      (item, index) => (
                        <li className="menu-item" key={`info-${index}`}>
                          <a href="#" className="nav-link p-0 text-muted">{item}</a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              {/* Footer Column: Social / Branding (Optional) */}

            </div>
          </div>


          {/* Add other column sections as needed in a similar structure */}

        </div>
      </div>
    </footer>
  );
};

export default Footer;
