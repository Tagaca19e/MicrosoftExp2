import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import CodeIcon from "@material-ui/icons/Code";
import StarIcon from "@material-ui/icons/Star";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import CopyrightIcon from "@material-ui/icons/Copyright";
const propTypes = {
  topOuterDivider: PropTypes.bool,
  topDivider: PropTypes.bool,
};

const defaultProps = {
  topOuterDivider: false,
  topDivider: false,
};

const Footer = ({ className, topOuterDivider, topDivider, ...props }) => {
  const classes = classNames(
    "site-footer center-content-mobile",
    topOuterDivider && "has-top-divider",
    className
  );

  return (
    <footer {...props} className={classes}>
      <div className="container">
        <div
          className={classNames(
            "site-footer-inner",
            topDivider && "has-top-divider"
          )}
        >
          <div className="footer-top space-between text-xxs">
            {/* <CodeIcon style={{ color: "white" }} fontSize="large" /> */}

            {/* <FooterSocial /> */}
            <CodeIcon />
          </div>
          <div className="footer-bottom space-between text-xxs invert-order-desktop">
            <div className="footer-copyright">
              Code by{" "}
              <a href="https://www.linkedin.com/in/eidmone-tagaca-6ab45717b/">
                Eidmone 2021 <CopyrightIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;
