import { useCallback, useEffect, useRef, useState } from "react";
import "./workshop-deck.css";

const COPY_FEEDBACK_DURATION = 1200;
const NEXT_SLIDE_KEYS = ["ArrowRight", "PageDown", " "];
const PREVIOUS_SLIDE_KEYS = ["ArrowLeft", "PageUp"];

function CodeBlock({ code, copyId, copiedCode, onCopy }) {
  const buttonLabel = copiedCode === copyId ? "Copiado!" : "Copiar";

  return (
    <pre>
      <button className="copy" type="button" onClick={() => onCopy(copyId, code)}>
        {buttonLabel}
      </button>
      {code}
    </pre>
  );
}

function HeroSlide({ slide, icon, iconAlt, onStart }) {
  return (
    <>
      <div>
        <h1>{slide.title}<br /><em>{slide.emphasis}</em></h1>
        <p className="lead">{slide.text}</p>
        <button className="primary" type="button" onClick={onStart}>
          Começar workshop &rarr;
        </button>
      </div>
      <div className="hero-art">
        <div className="whale"><img className="hero-icon" src={icon} alt={iconAlt} /></div>
        {slide.tags?.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
    </>
  );
}

function ContentSlide({ slide, index, title, copiedCode, onCopy }) {
  return (
    <>
      <div className="eyebrow">
        {String(index).padStart(2, "0")} — {slide.label.toUpperCase()}
      </div>
      <h2>{slide.title}<br /><em>{slide.emphasis}</em></h2>
      <div className="split">
        <div>
          <p className="big">{slide.text}</p>
          {slide.note && <div className="callout">{slide.note}</div>}
        </div>
        <div>
          {slide.code ? (
            <CodeBlock copyId={`${title}-${index}`} code={slide.code} copiedCode={copiedCode} onCopy={onCopy} />
          ) : (
            <div className="card">{slide.detail}</div>
          )}
        </div>
      </div>
    </>
  );
}

export default function WorkshopDeck({ title, accent, icon, iconAlt, number, slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const copyTimeoutRef = useRef(null);

  const lastSlideIndex = slides.length - 1;

  const goToSlide = useCallback((slideIndex) => {
    const nextSlideIndex = Math.max(0, Math.min(lastSlideIndex, slideIndex));

    setCurrentSlide(nextSlideIndex);
    setIsMenuOpen(false);
  }, [lastSlideIndex]);

  const copyCode = useCallback((copyId, code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(copyId);
    window.clearTimeout(copyTimeoutRef.current);

    copyTimeoutRef.current = window.setTimeout(
      () => setCopiedCode(null),
      COPY_FEEDBACK_DURATION
    );
  }, []);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (NEXT_SLIDE_KEYS.includes(event.key)) {
        event.preventDefault();
        goToSlide(currentSlide + 1);
      }

      if (PREVIOUS_SLIDE_KEYS.includes(event.key)) {
        event.preventDefault();
        goToSlide(currentSlide - 1);
      }

      if (event.key === "Home") goToSlide(0);
      if (event.key === "End") goToSlide(lastSlideIndex);
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      window.clearTimeout(copyTimeoutRef.current);
    };
  }, [currentSlide, goToSlide, lastSlideIndex]);

  const progressWidth = `${((currentSlide + 1) / slides.length) * 100}%`;

  return (
    <main className={`deck deck--${title.toLowerCase()}`} style={{ "--blue": accent }}>
      <header>
        <button className="brand" type="button" onClick={() => goToSlide(0)}>
          <img className="brand-icon" src={icon} alt={iconAlt} />
          <b>{title}<em>LAB</em></b>
        </button>
        <small>WORKSHOP &bull; {number}</small>
        <button className="menu-button" type="button" aria-label="Abrir menu" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((isOpen) => !isOpen)}>
          &#9776;
        </button>
      </header>

      <aside className={isMenuOpen ? "open" : ""}>
        <p>CONTEÚDO</p>
        {slides.map((slide, index) => (
          <button key={slide.label} className={currentSlide === index ? "active" : ""} type="button" onClick={() => goToSlide(index)}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {slide.label}
          </button>
        ))}
      </aside>

      <section className="stage">
        {slides.map((slide, index) => {
          const isHero = index === 0;
          const isActive = currentSlide === index;
          const slideClassName = `slide ${isHero ? "hero" : ""} ${isActive ? "active" : ""}`.trim();

          return (
            <article key={slide.label} className={slideClassName}>
              {isHero ? (
                <HeroSlide slide={slide} icon={icon} iconAlt={iconAlt} onStart={() => goToSlide(1)} />
              ) : (
                <ContentSlide slide={slide} index={index} title={title} copiedCode={copiedCode} onCopy={copyCode} />
              )}
            </article>
          );
        })}
      </section>

      <footer>
        <button type="button" aria-label="Slide anterior" onClick={() => goToSlide(currentSlide - 1)} disabled={currentSlide === 0}>&larr;</button>
        <div className="progress"><i style={{ width: progressWidth }} /></div>
        <span>{String(currentSlide + 1).padStart(2, "0")} / {slides.length}</span>
        <button type="button" aria-label="Próximo slide" onClick={() => goToSlide(currentSlide + 1)} disabled={currentSlide === lastSlideIndex}>&rarr;</button>
      </footer>
    </main>
  );
}
