import { Link } from "react-router-dom";

import { dockerIcon, gitIcon, reactIcon } from "/src/utils/icons";
import "./Git/git.css";
import "./React/react.css";

export default function Home() {
  return (
    <main className="home-page">
      <section className="home-content" aria-labelledby="page-title">
        <p className="home-eyebrow">WORKSHOPS</p>
        <h1 id="page-title">Aprenda na <em>prática.</em></h1>
        <p className="home-intro">
          Selecione uma capacitação para acessar o material e os exercícios.
        </p>

        <nav className="workshop-list" aria-label="Workshops disponíveis">
          <Link className="workshop-card" to="/docker">
            <img className="workshop-icon" src={dockerIcon} alt="" />
            <span>
              <small>WORKSHOP 01</small>
              <strong>Docker</strong>
            </span>
            <span className="workshop-arrow" aria-hidden="true">&rarr;</span>
          </Link>
          <Link className="workshop-card git-card" to="/git">
            <img className="workshop-icon" src={gitIcon} alt="" />
            <span>
              <small>WORKSHOP 02</small>
              <strong>Git</strong>
            </span>
            <span className="workshop-arrow" aria-hidden="true">&rarr;</span>
          </Link>
          <Link className="workshop-card react-card" to="/react">
            <img className="workshop-icon" src={reactIcon} alt="" />
            <span>
              <small>WORKSHOP 03</small>
              <strong>React.js</strong>
            </span>
            <span className="workshop-arrow" aria-hidden="true">&rarr;</span>
          </Link>
        </nav>
      </section>
    </main>
  );
}
