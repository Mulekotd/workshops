import { Link } from "react-router-dom";

const dockerIcon = `${import.meta.env.BASE_URL}docker/assets/docker-icon.png`;

export default function Home() {
  return (
    <main className="home-page">
      <section className="home-content" aria-labelledby="page-title">
        <p className="home-eyebrow">MULEKOTD • WORKSHOPS</p>
        <h1 id="page-title">Aprenda na <em>prática.</em></h1>
        <p className="home-intro">
          Selecione um workshop para acessar o material e os exercícios.
        </p>

        <nav className="workshop-list" aria-label="Workshops disponíveis">
          <Link className="workshop-card" to="/docker">
            <img className="workshop-icon" src={dockerIcon} alt="" />
            <span>
              <small>WORKSHOP 01</small>
              <strong>Docker</strong>
            </span>
            <span className="workshop-arrow" aria-hidden="true">→</span>
          </Link>
        </nav>
      </section>
    </main>
  );
}
