import { useCallback, useEffect, useRef, useState } from "react";
import "./workshop.css";

const slideLabels = [
  "Início",
  "O que é Docker?",
  "Instalação",
  "Containers",
  "Images",
  "Volumes",
  "Networking",
  "Docker exec",
  "Docker Compose",
  "Up & Down",
  "Recap"
];

function CopyButton({ copyId, copiedCode, onCopy }) {
  return (
    <button
      className="copy"
      type="button"
      onClick={(event) => onCopy(event, copyId)}
    >
      {copiedCode === copyId ? "Copiado!" : "Copiar"}
    </button>
  );
}

function Slide({ active, className = "", children }) {
  return (
    <article className={`slide ${className} ${active ? "active" : ""}`.trim()}>
      {children}
    </article>
  );
}

export default function DockerWorkshop() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const copyTimeoutRef = useRef(null);

  const goToSlide = useCallback((slideIndex) => {
    setCurrentSlide(Math.max(0, Math.min(slideLabels.length - 1, slideIndex)));
    setIsMenuOpen(false);
  }, []);

  const copyCode = useCallback((event, copyId) => {
    const code = event.currentTarget.parentElement.innerText
      .replace("Copiar", "")
      .replace("Copiado!", "")
      .trim();

    navigator.clipboard?.writeText(code);
    setCopiedCode(copyId);
    window.clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = window.setTimeout(() => setCopiedCode(null), 1200);
  }, []);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        goToSlide(currentSlide + 1);
      }

      if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goToSlide(currentSlide - 1);
      }

      if (event.key === "Home") goToSlide(0);
      if (event.key === "End") goToSlide(slideLabels.length - 1);
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      window.clearTimeout(copyTimeoutRef.current);
    };
  }, [currentSlide, goToSlide]);

  return (
    <main className="deck">
      <header>
        <button className="brand" type="button" onClick={() => goToSlide(0)}>
          <img className="brand-icon" src={`${import.meta.env.BASE_URL}docker/assets/ieee-icon.png`} alt="IEEE" />
          <b>DOCKER<em>LAB</em></b>
        </button>
        <small>WORKSHOP • 01</small>
        <button
          id="menuButton"
          className="menu-button"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          ☰
        </button>
      </header>

      <aside id="menu" className={isMenuOpen ? "open" : ""}>
        <p>CONTEÚDO</p>
        {slideLabels.map((label, index) => (
          <button
            key={label}
            className={currentSlide === index ? "active" : ""}
            type="button"
            onClick={() => goToSlide(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {label}
          </button>
        ))}
      </aside>

      <section className="stage">
        <Slide active={currentSlide === 0} className="hero">
          <div>
            <span className="pill">⚡ DO ZERO AO COMPOSE</span>
            <h1>Docker sem<br /><em>mistério.</em></h1>
            <p className="lead">Entenda, execute e conecte containers.<br />Uma oficina prática para sair do “funciona na minha máquina”.</p>
            <button className="primary" type="button" onClick={() => goToSlide(1)}>Começar workshop →</button>
          </div>
          <div className="hero-art">
            <div className="whale"><img src={`${import.meta.env.BASE_URL}docker/assets/docker-icon.png`} alt="Docker" /></div>
            <span>image</span><span>container</span><span>volume</span>
          </div>
        </Slide>

        <Slide active={currentSlide === 1}>
          <div className="eyebrow">01 — CONCEITO</div>
          <h2>Empacote uma vez.<br /><em>Execute em qualquer lugar.</em></h2>
          <div className="split">
            <div>
              <p className="big">Docker é uma plataforma para criar, distribuir e executar aplicações em <strong>containers isolados</strong>.</p>
              <div className="callout">Ele leva o código + dependências + configuração. O ambiente deixa de ser uma surpresa.</div>
            </div>
            <div className="compare">
              <div><b>SEM DOCKER</b><code>App</code><code>“Instale Node 20...”</code><code>“Configure o banco...”</code><small>💥 depende da máquina</small></div>
              <i>→</i>
              <div className="good"><b>COM DOCKER</b><code>App</code><code>Runtime</code><code>Dependências</code><small>✓ ambiente reproduzível</small></div>
            </div>
          </div>
        </Slide>

        <Slide active={currentSlide === 2}>
          <div className="eyebrow">02 — INSTALAÇÃO</div>
          <h2>Prepare sua <em>máquina.</em></h2>
          <div className="grid">
            <div className="card">
              <strong className="os"><img src={`${import.meta.env.BASE_URL}docker/assets/windows-icon.png`} alt="Windows" /></strong>
              <h3>Windows</h3>
              <ol><li>Ative o <b>WSL 2</b></li><li>Instale o <b>Docker Desktop</b></li><li>Reinicie se solicitado</li></ol>
              <a href="https://docs.docker.com/desktop/setup/install/windows-install/" target="_blank" rel="noreferrer">Documentação oficial ↗</a>
            </div>
            <div className="card">
              <strong className="os dark"><img src={`${import.meta.env.BASE_URL}docker/assets/linux-icon.png`} alt="Linux" /></strong>
              <h3>Linux</h3><p>Exemplo em Ubuntu/Debian:</p>
              <pre><CopyButton copyId="linux-install" copiedCode={copiedCode} onCopy={copyCode} />sudo apt update{"\n"}sudo apt install docker.io{"\n"}sudo systemctl enable --now docker</pre>
            </div>
          </div>
          <div className="chips"><b>VERIFIQUE</b><code>docker --version</code><code>docker run hello-world</code></div>
        </Slide>

        <Slide active={currentSlide === 3}>
          <div className="eyebrow">03 — CONTAINERS</div>
          <h2>Um processo. <em>Isolado.</em><br />Rápido. Descartável.</h2>
          <div className="split">
            <div className="visual"><div>▣<b>web</b><small>:3000</small></div><div>▣<b>api</b><small>:8080</small></div><div>▣<b>db</b><small>:5432</small></div></div>
            <div>
              <p className="big">Um container é uma <strong>instância em execução</strong> de uma image.</p>
              <pre><CopyButton copyId="container-commands" copiedCode={copiedCode} onCopy={copyCode} />docker run -d --name web -p 8080:80 nginx{"\n"}docker ps{"\n"}docker stop web{"\n"}docker rm web</pre>
              <p className="hint"><code>-d</code> segundo plano · <code>-p</code> porta host:container</p>
            </div>
          </div>
        </Slide>

        <Slide active={currentSlide === 4}>
          <div className="eyebrow">04 — IMAGES</div>
          <h2>O <em>molde imutável</em><br />dos seus containers.</h2>
          <div className="flow"><span>Dockerfile<small>receita</small></span>→<span>Image<small>artefato</small></span>→<span>Container<small>execução</small></span></div>
          <div className="grid">
            <pre><CopyButton copyId="dockerfile" copiedCode={copiedCode} onCopy={copyCode} /><b>Dockerfile</b>{"\n"}FROM node:20-alpine{"\n"}WORKDIR /app{"\n"}COPY package*.json ./{"\n"}RUN npm ci{"\n"}COPY . .{"\n"}CMD ["npm", "start"]</pre>
            <pre><CopyButton copyId="image-commands" copiedCode={copiedCode} onCopy={copyCode} />docker build -t minha-api:1.0 .{"\n"}docker images{"\n"}docker run minha-api:1.0{"\n"}docker pull postgres:16</pre>
          </div>
        </Slide>

        <Slide active={currentSlide === 5}>
          <div className="eyebrow">05 — VOLUMES</div>
          <h2>Containers vão embora.<br /><em>Os dados ficam.</em></h2>
          <div className="split">
            <div className="volume">
              <div><img className="volume-icon" src={`${import.meta.env.BASE_URL}docker/assets/postgresql-icon.png`} alt="PostgreSQL" /><b>PostgreSQL</b><small>/var/lib/postgresql/data</small></div>
              <i />
              <div><img className="volume-icon" src={`${import.meta.env.BASE_URL}docker/assets/database-icon.png`} alt="Banco de dados" /><b>meus-dados</b><small>persistente no host</small></div>
            </div>
            <div>
              <p className="big">Volumes guardam dados <strong>fora do ciclo de vida</strong> do container.</p>
              <pre><CopyButton copyId="volume-commands" copiedCode={copiedCode} onCopy={copyCode} />docker volume create meus-dados{"\n\n"}docker run -d \\{"\n"}  -v meus-dados:/var/lib/postgresql/data \\{"\n"}  postgres:16{"\n\n"}docker volume ls</pre>
              <p className="callout">💡 Use bind mounts (<code>./src:/app/src</code>) durante o desenvolvimento.</p>
            </div>
          </div>
        </Slide>

        <Slide active={currentSlide === 6}>
          <div className="eyebrow">06 — NETWORKING</div>
          <h2>Containers conversam<br />pelo <em>nome.</em></h2>
          <div className="network"><span>▣ <b>frontend</b><small>:3000</small></span><i>minha-rede</i><span>▱ <b>database</b><small>:5432</small></span></div>
          <div className="grid">
            <p className="big"><strong>DNS interno:</strong> dentro da rede, use <code>database:5432</code> — não <code>localhost</code>.</p>
            <pre><CopyButton copyId="network-commands" copiedCode={copiedCode} onCopy={copyCode} />docker network create minha-rede{"\n"}docker run -d --name database \\{"\n"}  --network minha-rede postgres:16{"\n"}docker run -d --name frontend \\{"\n"}  --network minha-rede minha-app</pre>
          </div>
        </Slide>

        <Slide active={currentSlide === 7}>
          <div className="eyebrow">07 — DOCKER EXEC</div>
          <h2>Entre no container.<br /><em>Veja o que acontece.</em></h2>
          <pre className="wide"><CopyButton copyId="exec-commands" copiedCode={copiedCode} onCopy={copyCode} />$ docker exec -it meu-container sh{"\n\n"}root@container:/app# ls{"\n"}node_modules  package.json  src{"\n"}root@container:/app# env{"\n"}NODE_ENV=production</pre>
          <div className="mini"><span><b>exec</b><small>Executa um comando</small></span><span><b>-i</b><small>Mantém o STDIN aberto</small></span><span><b>-t</b><small>Cria um terminal</small></span></div>
          <p className="warning">Use para diagnóstico e inspeção — mudanças manuais no container não são uma estratégia de deploy.</p>
        </Slide>

        <Slide active={currentSlide === 8}>
          <div className="eyebrow">08 — DOCKER COMPOSE</div>
          <h2>Uma aplicação inteira.<br /><em>Um único arquivo.</em></h2>
          <div className="compose">
            <pre><CopyButton copyId="compose-file" copiedCode={copiedCode} onCopy={copyCode} /><b>compose.yaml</b>{"\n"}services:{"\n"}  app:{"\n"}    build: .{"\n"}    ports: ["3000:3000"]{"\n"}    environment:{"\n"}      DB_HOST: db{"\n"}    depends_on: [db]{"\n"}  db:{"\n"}    image: postgres:16{"\n"}    volumes:{"\n"}      - dados:/var/lib/postgresql/data{"\n"}    environment:{"\n"}      POSTGRES_PASSWORD: exemplo{"\n"}volumes:{"\n"}  dados:</pre>
            <ol><li><b>services</b> define os containers</li><li><b>image / build</b> escolhe a origem</li><li><b>ports</b> publica portas</li><li><b>volumes</b> persiste dados</li><li><b>environment</b> configura o serviço</li></ol>
          </div>
        </Slide>

        <Slide active={currentSlide === 9}>
          <div className="eyebrow">09 — UP & DOWN</div>
          <h2>Suba tudo.<br /><em>Desmonte sem drama.</em></h2>
          <div className="grid">
            <div className="card"><b className="blue">▶ SUBIR</b><pre><CopyButton copyId="compose-up" copiedCode={copiedCode} onCopy={copyCode} />docker compose up -d</pre><p>Cria rede, volumes e containers. <code>-d</code> deixa tudo em segundo plano.</p></div>
            <div className="card"><b className="blue">× DESMONTAR</b><pre><CopyButton copyId="compose-down" copiedCode={copiedCode} onCopy={copyCode} />docker compose down</pre><p>Para e remove containers e a rede. Use <code>-v</code> para remover volumes.</p></div>
          </div>
          <div className="chips"><code>docker compose ps</code><code>docker compose logs -f</code><code>docker compose restart app</code><code>docker compose down -v</code></div>
        </Slide>

        <Slide active={currentSlide === 10} className="recap">
          <span className="pill">VOCÊ CHEGOU AO PORTO 🐳</span>
          <h2>Do código ao container.<br /><em>Agora é com você.</em></h2>
          <div className="flow"><span>Dockerfile</span>→<span>Image</span>→<span>Container</span>→<span>Compose</span></div>
          <div className="challenge"><b>⚡ DESAFIO FINAL</b><p>Crie uma aplicação com <strong>web + banco</strong>, conecte os serviços, persista os dados e suba tudo com um único comando.</p><pre><CopyButton copyId="final-challenge" copiedCode={copiedCode} onCopy={copyCode} />docker compose up -d</pre></div>
        </Slide>
      </section>

      <footer>
        <button type="button" aria-label="Slide anterior" onClick={() => goToSlide(currentSlide - 1)} disabled={currentSlide === 0}>←</button>
        <div className="progress"><i style={{ width: `${((currentSlide + 1) / slideLabels.length) * 100}%` }} /></div>
        <span>{`${String(currentSlide + 1).padStart(2, "0")} / ${slideLabels.length}`}</span>
        <button type="button" aria-label="Próximo slide" onClick={() => goToSlide(currentSlide + 1)} disabled={currentSlide === slideLabels.length - 1}>→</button>
      </footer>
    </main>
  );
}
