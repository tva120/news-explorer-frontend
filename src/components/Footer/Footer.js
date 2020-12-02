import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import githubIcon from "../../images/github-icon.svg";
import FacebookIcon from "../../images/facebook-icon.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copy">&copy; 2020 Supersite, Powered by News API</p>
      <nav className="footer__nav">
        <div className="footer__block">
          <Link className="footer__link" to="/">
            Главная
          </Link>
          <a
            className="footer__link"
            href="https://praktikum.yandex.ru"
            rel="noreferrer"
            target="_blank"
          >
            Яндекс Практикум
          </a>
        </div>
        <div className="footer__block">
          <a
            className="footer__socials"
            href="https://github.com/tva120"
            rel="noreferrer"
            target="_blank"
          >
            <img
              className="footer__socials-img"
              src={githubIcon}
              alt="GitHub"
            />
          </a>
          <a
            className="footer__socials"
            href="https://www.facebook.com"
            rel="noreferrer"
            target="_blank"
          >
            <img
              className="footer__socials-img"
              src={FacebookIcon}
              alt="Facebook"
            />
          </a>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
