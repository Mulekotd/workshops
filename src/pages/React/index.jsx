import WorkshopDeck from "/src/components/WorkshopDeck";

import { reactIcon } from "/src/utils/icons";
import "./react.css";

const slides = [
  {
    label: "Início",
    title: "React de",
    emphasis: "verdade.",
    text: "Construa interfaces em componentes, cuide do estado e transforme dados em experiências interativas.",
    tags: ["componentes", "estado", "UI"],
  },
  {
    label: "Conceito",
    title: "UI como função",
    emphasis: "do estado.",
    text: "React descreve o que a tela deve mostrar para cada estado. Quando os dados mudam, ele atualiza somente o necessário no DOM.",
    detail:
      "Pense em componentes como funções reutilizáveis que recebem dados e retornam interface.",
  },
  {
    label: "JSX",
    title: "Escreva interface",
    emphasis: "no JavaScript.",
    text: "JSX parece HTML, mas é JavaScript. Use chaves para expressões, className para classes CSS e feche todas as tags.",
    code: 'export default function Welcome() {\n  const name = "Ana";\n  return <h1>Olá, {name}!</h1>;\n}',
  },
  {
    label: "Componentes",
    title: "Divida para",
    emphasis: "conquistar.",
    text: "Componentes pequenos, com uma responsabilidade clara, são mais fáceis de testar, entender e reutilizar.",
    code: "function Button() {\n  return <button>Salvar</button>;\n}\n\nexport default function App() {\n  return <Button />;\n}",
  },
  {
    label: "Props",
    title: "Dados entram",
    emphasis: "por props.",
    text: "Props são entradas somente de leitura. Um componente pai passa valores; o filho os usa para renderizar variações da mesma interface.",
    code: 'function Avatar({ name }) {\n  return <img alt={name} src={`/users/${name}.png`} />;\n}\n\n<Avatar name="ana" />',
  },
  {
    label: "Estado",
    title: "Quando a tela",
    emphasis: "precisa lembrar.",
    text: "useState cria um valor que sobrevive a novas renderizações. Nunca altere o estado diretamente: use a função atualizadora.",
    code: 'import { useState } from "react";\n\nconst [count, setCount] = useState(0);\n<button onClick={() => setCount(count + 1)}>\n  {count}\n</button>',
  },
  {
    label: "Eventos",
    title: "Responda à",
    emphasis: "interação.",
    text: "Passe uma função ao evento, em vez de chamá-la durante a renderização. Eventos comuns: onClick, onChange e onSubmit.",
    code: 'function Form() {\n  function handleSubmit(event) {\n    event.preventDefault();\n    console.log("enviado");\n  }\n  return <form onSubmit={handleSubmit}>...</form>;\n}',
  },
  {
    label: "Effects",
    title: "Conecte ao",
    emphasis: "mundo externo.",
    text: "useEffect sincroniza o componente com APIs, timers ou assinaturas. Inclua dependências e sempre limpe recursos que ficarem ativos.",
    code: "useEffect(() => {\n  const id = setInterval(loadData, 5000);\n  return () => clearInterval(id);\n}, []);",
  },
  {
    label: "Prática",
    title: "Comece pequeno.",
    emphasis: "E evolua.",
    text: "Crie uma lista de tarefas: um componente Task, props para título, estado para os itens e eventos para adicionar e concluir. Esse exercício reúne os fundamentos.",
    code: "npm create vite@latest minha-app -- --template react\ncd minha-app\nnpm install\nnpm run dev",
  },
];
export default function ReactWorkshop() {
  return (
    <WorkshopDeck
      title="React"
      accent="#087ea4"
      icon={reactIcon}
      iconAlt="React"
      number="03"
      slides={slides}
    />
  );
}
