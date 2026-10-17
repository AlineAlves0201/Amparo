"use client";
import { useEffect, useRef, useState } from "react";
import {
  HeartHandshake,
  Home,
  Clock,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Check,
  Smartphone,
  QrCode,
  HeartPulse,
  Tv,
  Wifi,
  Landmark,
  FileText,
  HandHeart,
  Phone,
  Star,
  CalendarDays,
} from "lucide-react";
import { Button, SafetyNote } from "@/components/ui";
import {
  categories,
  money,
  requestSchema,
  selectDemoAssistant,
  transitions,
  type Category,
  type ServiceState,
} from "@/lib/demo";
const icons = {
  Smartphone,
  QrCode,
  HeartPulse,
  Tv,
  Wifi,
  Landmark,
  FileText,
  HandHeart,
};
type View =
  | "home"
  | "details"
  | "review"
  | "searching"
  | "service"
  | "rating"
  | "done"
  | "history"
  | "help";
const labels: Record<ServiceState, string> = {
  assigned: "Sua assistente foi encontrada!",
  on_the_way: "Ana está a caminho",
  arrived: "Sua assistente chegou",
  in_progress: "Atendimento em andamento",
  completed: "Atendimento concluído",
};
export default function Page() {
  const [view, setView] = useState<View>("home");
  const [category, setCategory] = useState<Category>(categories[0]);
  const [address, setAddress] = useState(
    "Rua das Acácias, 120 — Vila Mariana, São Paulo",
  );
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [state, setState] = useState<ServiceState>("assigned");
  const [excluded, setExcluded] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [code, setCode] = useState("");
  const [ready, setReady] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const assistant = selectDemoAssistant(excluded);
  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(
        localStorage.getItem("amparo-demo-history") ?? "[]",
      );
      if (
        Array.isArray(stored) &&
        stored.every((item) => typeof item === "string")
      ) {
        setHistory(stored.slice(0, 100));
      }
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) heading.current?.focus();
  }, [view, ready]);
  useEffect(() => {
    if (view !== "searching") return;
    const timer = setTimeout(() => {
      setState("assigned");
      setView("service");
    }, 2500);
    return () => clearTimeout(timer);
  }, [view]);
  function navigate(next: View) {
    setError("");
    setView(next);
  }
  function validate() {
    const result = requestSchema.safeParse({
      categoryId: category.id,
      address,
      safetyConsent: consent,
    });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    if (category.sensitive && !consent) {
      setError("Confirme que você leu as orientações de segurança.");
      return;
    }
    navigate("review");
  }
  function finish() {
    const next = [
      `${category.name} · ${money(category.price)} · ${rating} estrelas`,
      ...history,
    ];
    setHistory(next);
    try {
      localStorage.setItem("amparo-demo-history", JSON.stringify(next));
    } catch {}
    navigate("done");
  }
  return (
    <div className="shell">
      <aside className="sidebar">
        <a href="/" className="brand" aria-label="Amparo, início">
          <HeartHandshake size={35} />
          amparo<span>●</span>
        </a>
        <div className="side-content">
          <p className="eyebrow">SEU DIA MAIS SIMPLES</p>
          <nav aria-label="Menu principal">
            {[
              { id: "home", label: "Início", icon: Home },
              { id: "history", label: "Meus atendimentos", icon: Clock },
              { id: "help", label: "Ajuda e segurança", icon: ShieldCheck },
            ].map((item) => (
              <button
                key={item.id}
                className={
                  view === item.id ||
                  (item.id === "home" && !["history", "help"].includes(view))
                    ? "nav-item active"
                    : "nav-item"
                }
                onClick={() => navigate(item.id as View)}
              >
                <item.icon size={23} />
                {item.label}
                {item.id === "home" && <span className="nav-dot" />}
              </button>
            ))}
          </nav>
          <div className="side-note">
            <HeartHandshake size={30} />
            <h3>
              Ao seu lado,
              <br />
              no seu ritmo.
            </h3>
            <p>Mais confiança para aproveitar o mundo digital.</p>
            <span>Com cuidado, sempre. ♡</span>
          </div>
        </div>
        <div className="profile">
          <div className="avatar">HL</div>
          <div>
            <strong>Helena Lopes</strong>
            <small>Conta de demonstração</small>
          </div>
        </div>
      </aside>
      <div className="workspace">
        <header>
          <span>
            <span className="live-dot" /> Um cuidado a mais no seu dia
          </span>
          <div className="demo-tag">Ambiente de demonstração</div>
        </header>
        <main id="main">
          <div className="mobile-brand">
            <HeartHandshake /> amparo
          </div>
          {view === "home" && (
            <>
              <div className="greeting">
                <div>
                  <p className="eyebrow">BEM-VINDA AO AMPARO</p>
                  <h1 ref={heading} tabIndex={-1}>
                    Olá, Helena <span className="wave">☀</span>
                  </h1>
                  <p>Com o que podemos ajudar hoje?</p>
                </div>
                <span className="trust-badge">
                  <ShieldCheck size={19} /> Você está em boas mãos
                </span>
              </div>
              <section className="hero">
                <div className="hero-copy">
                  <span className="pill">
                    TECNOLOGIA COM MAIS TRANQUILIDADE
                  </span>
                  <h2>
                    Uma ajuda de verdade.
                    <br />
                    Bem pertinho de você.
                  </h2>
                  <p>
                    Conte com pessoas verificadas para facilitar
                    <br className="desktop" /> suas tarefas digitais, no seu
                    tempo.
                  </p>
                  <a href="#services" className="hero-link">
                    Encontre a ajuda que precisa <ArrowRight size={20} />
                  </a>
                </div>
                <div className="hero-art" aria-hidden="true">
                  <div className="orbit orbit-one" />
                  <div className="orbit orbit-two" />
                  <div className="art-phone">
                    <div className="phone-speaker" />
                    <HeartHandshake size={64} />
                    <span>
                      Você pode contar
                      <br />
                      com a gente.
                    </span>
                    <div className="phone-check">
                      <Check size={24} />
                    </div>
                  </div>
                  <span className="art-bubble bubble-heart">♡</span>
                  <span className="art-bubble bubble-check">
                    <ShieldCheck />
                  </span>
                  <span className="art-spark">✦</span>
                </div>
              </section>
              <section id="services">
                <div className="section-title">
                  <div>
                    <h2>Escolha a ajuda que você precisa</h2>
                    <p>
                      É simples: você escolhe, e nós encontramos a pessoa certa.
                    </p>
                  </div>
                  <span>8 formas de ajudar</span>
                </div>
                <div className="category-grid">
                  {categories.map((item) => {
                    const Icon = icons[item.icon];
                    return (
                      <button
                        className="category-card"
                        key={item.id}
                        onClick={() => {
                          setCategory(item);
                          setConsent(false);
                          setRating(0);
                          setReview("");
                          setCode("");
                          setExcluded([]);
                          navigate("details");
                        }}
                      >
                        <span className={`category-icon ${item.id}`}>
                          <Icon size={27} />
                        </span>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <span className="card-bottom">
                          A partir de {money(item.price)}{" "}
                          <ArrowRight size={19} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
              <div className="bottom-panels">
                <SafetyNote />
                <div className="how">
                  <span className="round-icon">
                    <Clock />
                  </span>
                  <div>
                    <strong>Ajuda agora ou no melhor horário</strong>
                    <p>Você escolhe o momento. Nós cuidamos do encontro.</p>
                  </div>
                </div>
              </div>
              <p className="demo-disclaimer">
                Demonstração com pessoas e endereços fictícios. Nenhum serviço
                ou pagamento real.
              </p>
            </>
          )}
          {view === "details" && (
            <section className="flow">
              <button className="back" onClick={() => navigate("home")}>
                <ArrowLeft size={20} /> Voltar aos serviços
              </button>
              <p className="eyebrow">PASSO 1 DE 2 · SEU ATENDIMENTO</p>
              <h1 ref={heading} tabIndex={-1}>
                {category.name}
              </h1>
              <p className="intro">
                Uma pessoa preparada vai até você para ajudar, com calma.
              </p>
              <div className="form-card">
                <div className="option-row">
                  <div>
                    <Clock />
                    <strong>Agora</strong>
                    <span>Busca demonstrativa imediata</span>
                  </div>
                  <div>
                    <MapPin />
                    <strong>Presencial</strong>
                    <span>No endereço informado</span>
                  </div>
                </div>
                <label htmlFor="address">Onde será o atendimento?</label>
                <input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  maxLength={200}
                />
                <small>Endereço fictício para testar esta demonstração.</small>
                <div className="price-line">
                  <span>Duração estimada: {category.duration} minutos</span>
                  <strong>{money(category.price)}</strong>
                </div>
                {category.sensitive && (
                  <>
                    <SafetyNote>
                      Você mantém o controle. Nunca compartilhe senhas, PINs ou
                      códigos de autenticação. Autorize pagamentos pessoalmente
                      no aplicativo oficial do banco. Não usamos controle remoto
                      em operações bancárias.
                    </SafetyNote>
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                      />{" "}
                      Li e compreendi as orientações de segurança.
                    </label>
                  </>
                )}
                {error && (
                  <p role="alert" className="error">
                    {error}
                  </p>
                )}
                <Button onClick={validate}>
                  Revisar atendimento <ArrowRight size={20} />
                </Button>
              </div>
              <p className="muted">
                Agendamento e atendimento remoto estarão disponíveis em uma
                próxima etapa.
              </p>
            </section>
          )}
          {view === "review" && (
            <section className="flow">
              <button className="back" onClick={() => navigate("details")}>
                <ArrowLeft size={20} /> Alterar informações
              </button>
              <p className="eyebrow">PASSO 2 DE 2 · CONFIRMAÇÃO</p>
              <h1 ref={heading} tabIndex={-1}>
                Tudo certo para pedir ajuda?
              </h1>
              <div className="form-card">
                <h2>{category.name}</h2>
                <p>
                  <Clock className="inline" /> Agora · Presencial ·{" "}
                  {category.duration} minutos
                </p>
                <p>
                  <MapPin className="inline" /> {address}
                </p>
                <div className="price-line">
                  <span>Valor total simulado</span>
                  <strong>{money(category.price)}</strong>
                </div>
                <p>Sem cobranças extras. Nenhum pagamento será realizado.</p>
                <SafetyNote>
                  Nós encontramos uma pessoa verificada para você. Você poderá
                  recusar a indicação e tentar outra pessoa.
                </SafetyNote>
                <Button onClick={() => navigate("searching")}>
                  Confirmar pedido demonstrativo <ArrowRight size={20} />
                </Button>
              </div>
            </section>
          )}
          {view === "searching" && (
            <section className="flow centered" aria-live="polite">
              <div className="search-ring">
                <HeartHandshake size={55} />
              </div>
              <h1 ref={heading} tabIndex={-1}>
                Buscando uma boa companhia
              </h1>
              <p>Estamos simulando o envio do pedido às pessoas disponíveis.</p>
              <p className="muted">
                Esta animação não executa o motor real de matching.
              </p>
              <Button secondary onClick={() => navigate("home")}>
                Cancelar busca
              </Button>
            </section>
          )}
          {view === "service" && (
            <section className="flow">
              <p className="eyebrow">ACOMPANHE SEU ATENDIMENTO · SIMULAÇÃO</p>
              <h1 ref={heading} tabIndex={-1}>
                {assistant
                  ? labels[state].replace("Ana", assistant.name.split(" ")[0])
                  : "Nenhuma pessoa disponível"}
              </h1>
              {assistant ? (
                <div className="form-card">
                  <div className="assistant">
                    <div className="assistant-avatar">
                      {assistant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h2>{assistant.name}</h2>
                      <span className="verified">
                        <ShieldCheck size={18} /> Identidade verificada · Perfil
                        fictício
                      </span>
                      <p>
                        <Star size={17} className="inline" />{" "}
                        {assistant.average.toFixed(1).replace(".", ",")} ·{" "}
                        {assistant.count} avaliações
                      </p>
                    </div>
                  </div>
                  <p>
                    {category.name} · {money(category.price)}
                  </p>
                  <ol className="progress">
                    {(Object.keys(labels) as ServiceState[]).map((s, i) => (
                      <li
                        key={s}
                        className={
                          i <= Object.keys(labels).indexOf(state)
                            ? "complete"
                            : ""
                        }
                      >
                        <span>{i + 1}</span>
                        {
                          [
                            "Pessoa encontrada",
                            "A caminho",
                            "Chegou",
                            "Em atendimento",
                            "Concluído",
                          ][i]
                        }
                      </li>
                    ))}
                  </ol>
                  {state === "arrived" && (
                    <>
                      <SafetyNote>
                        Seu código de chegada fictício é <strong>4826</strong>.
                        Ele confirma apenas este atendimento. Nunca informe
                        códigos bancários.
                      </SafetyNote>
                      <label htmlFor="arrival">
                        Simular código informado pela assistente
                      </label>
                      <input
                        id="arrival"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        inputMode="numeric"
                        maxLength={4}
                      />
                    </>
                  )}
                  {error && (
                    <p className="error" role="alert">
                      {error}
                    </p>
                  )}
                  <Button
                    onClick={() => {
                      if (state === "arrived" && code !== "4826") {
                        setError(
                          "Digite o código demonstrativo 4826 para continuar.",
                        );
                        return;
                      }
                      setError("");
                      if (state === "completed") navigate("rating");
                      else setState(transitions[state]!);
                    }}
                  >
                    {state === "completed"
                      ? "Avaliar atendimento"
                      : state === "in_progress"
                        ? "Confirmar conclusão"
                        : state === "arrived"
                          ? "Confirmar chegada e iniciar"
                          : "Simular próxima etapa"}
                    <ArrowRight size={20} />
                  </Button>
                  {state === "assigned" && (
                    <Button
                      secondary
                      onClick={() => {
                        setExcluded([...excluded, assistant.id]);
                        navigate("searching");
                      }}
                    >
                      Prefiro outra pessoa
                    </Button>
                  )}
                  <Button secondary onClick={() => navigate("home")}>
                    Cancelar atendimento demonstrativo
                  </Button>
                </div>
              ) : (
                <div className="form-card">
                  <p>
                    Não há outra pessoa na demonstração. Você pode tentar
                    novamente.
                  </p>
                  <Button
                    onClick={() => {
                      setExcluded([]);
                      navigate("searching");
                    }}
                  >
                    Tentar novamente
                  </Button>
                  <Button secondary onClick={() => navigate("home")}>
                    Voltar ao início
                  </Button>
                </div>
              )}
            </section>
          )}
          {view === "rating" && (
            <section className="flow">
              <h1 ref={heading} tabIndex={-1}>
                Como foi seu atendimento?
              </h1>
              <div className="form-card">
                <p>Sua opinião ajuda a melhorar o Amparo.</p>
                <fieldset>
                  <legend>Escolha de 1 a 5 estrelas</legend>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        aria-label={`${n} estrelas`}
                        aria-pressed={rating === n}
                        onClick={() => setRating(n)}
                      >
                        <Star fill={n <= rating ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                </fieldset>
                <label htmlFor="review">Quer contar mais? (opcional)</label>
                <textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  maxLength={500}
                />
                <p className="muted">
                  Não inclua informações pessoais ou financeiras. O comentário
                  não será armazenado nesta etapa.
                </p>
                <Button disabled={!rating} onClick={finish}>
                  Enviar avaliação demonstrativa
                </Button>
              </div>
            </section>
          )}
          {view === "done" && (
            <section className="flow centered">
              <span className="success-icon">
                <Check size={40} />
              </span>
              <h1 ref={heading} tabIndex={-1}>
                Obrigada pela confiança, Helena.
              </h1>
              <p>
                Atendimento demonstrativo concluído e avaliação registrada neste
                navegador.
              </p>
              <Button onClick={() => navigate("home")}>Voltar ao início</Button>
            </section>
          )}
          {view === "history" && (
            <section className="flow">
              <h1 ref={heading} tabIndex={-1}>
                Meus atendimentos
              </h1>
              <p>Histórico demonstrativo salvo apenas neste navegador.</p>
              {history.length ? (
                history.map((item, i) => (
                  <div className="history-item" key={i}>
                    <Check />
                    {item}
                  </div>
                ))
              ) : (
                <div className="form-card">
                  <CalendarDays size={40} />
                  <h2>Seu primeiro atendimento começa aqui</h2>
                  <p>
                    Quando você concluir uma simulação, ela aparecerá nesta
                    página.
                  </p>
                  <Button onClick={() => navigate("home")}>Pedir ajuda</Button>
                </div>
              )}
            </section>
          )}
          {view === "help" && (
            <section className="flow">
              <h1 ref={heading} tabIndex={-1}>
                Ajuda e segurança
              </h1>
              <div className="form-card">
                <SafetyNote />
                <h2>Você decide, sempre.</h2>
                <p>
                  Nunca compartilhe senhas, PINs ou códigos de autenticação. A
                  assistente orienta; você revisa e autoriza suas próprias
                  ações.
                </p>
                <h2>Algo deixou você desconfortável?</h2>
                <p>
                  Interrompa o atendimento. Em uma emergência no Brasil, ligue
                  190. Esta demonstração ainda não possui uma central de suporte
                  ou envio de incidentes.
                </p>
                <p>
                  <Phone className="inline" /> Emergência policial:{" "}
                  <a href="tel:190">190</a>
                </p>
                <Button onClick={() => navigate("home")}>
                  Voltar ao início
                </Button>
              </div>
            </section>
          )}
          <footer>
            <span>
              amparo <span className="footer-heart">♡</span> Tecnologia que
              aproxima.
            </span>
            <span>Autonomia. Respeito. Cuidado.</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
