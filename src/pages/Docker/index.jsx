import WorkshopDeck from "/src/components/WorkshopDeck";

import { dockerIcon } from "/src/utils/icons";
import "./docker.css";

const slides = [
  {
    label: "Início",
    title: "Docker sem",
    emphasis: "mistério.",
    text: "Entenda, execute e desenvolva com containers. Uma oficina prática para sair do “funciona na minha máquina”.",
    tags: ["image", "container", "volume"],
  },
  {
    label: "O que é Docker?",
    title: "Empacote uma vez.",
    emphasis: "Execute em qualquer lugar.",
    text: "Docker cria, distribui e executa aplicações em containers isolados, levando código, dependências e configuração juntos.",
    detail:
      "O ambiente deixa de ser uma surpresa: o mesmo container funciona do computador local ao servidor.",
  },
  {
    label: "Instalação",
    title: "Prepare sua",
    emphasis: "máquina.",
    text: "No Windows, ative WSL 2 e instale Docker Desktop. Em Linux, instale o Docker Engine pela documentação da sua distribuição.",
    code: "docker --version\ndocker run hello-world",
  },
  {
    label: "Containers",
    title: "Um processo.",
    emphasis: "Isolado e descartável.",
    text: "Um container é uma instância em execução de uma image. Ele pode ser iniciado, inspecionado, parado e removido sem afetar o host.",
    code: "docker run -d --name web -p 8080:80 nginx\ndocker ps\ndocker stop web\ndocker rm web",
  },
  {
    label: "Images",
    title: "O molde imutável",
    emphasis: "do container.",
    text: "Uma image é o artefato reutilizável. O Dockerfile descreve como construí-la e cada container executa uma instância dela.",
    code: "docker build -t minha-api:1.0 .\ndocker images\ndocker run minha-api:1.0\ndocker pull postgres:16",
  },
  {
    label: "Volumes",
    title: "Containers vão embora.",
    emphasis: "Os dados ficam.",
    text: "Volumes persistem dados fora do ciclo de vida de containers, protegendo informações como arquivos enviados e dados de banco.",
    code: "docker volume create meus-dados\ndocker run -d -v meus-dados:/var/lib/postgresql/data postgres:16\ndocker volume ls",
  },
  {
    label: "Networking",
    title: "Containers conversam",
    emphasis: "pelo nome.",
    text: "Em uma rede Docker, serviços descobrem uns aos outros pelo nome do container. Use database:5432, não localhost, dentro da rede.",
    code: "docker network create minha-rede\ndocker run -d --name database --network minha-rede postgres:16\ndocker run -d --name frontend --network minha-rede minha-app",
  },
  {
    label: "Docker exec",
    title: "Entre no container.",
    emphasis: "Veja o que acontece.",
    text: "docker exec executa comandos dentro de um container ativo. É útil para diagnóstico e inspeção, não para mudanças permanentes.",
    code: "docker exec -it meu-container sh\nls\nenv",
  },
  {
    label: "Docker Compose",
    title: "Uma aplicação inteira.",
    emphasis: "Um único arquivo.",
    text: "Compose define serviços, redes, volumes e variáveis de ambiente em um arquivo declarativo, facilitando a execução local.",
    code: 'services:\n  app:\n    build: .\n    ports: ["3000:3000"]\n  db:\n    image: postgres:16',
  },
  {
    label: "Up & Down",
    title: "Suba tudo.",
    emphasis: "Desmonte sem drama.",
    text: "docker compose up cria e inicia os serviços. docker compose down para e remove containers e a rede criada para a aplicação.",
    code: "docker compose up -d\ndocker compose ps\ndocker compose logs -f\ndocker compose down",
  },
  {
    label: "Recap",
    title: "Do código ao container.",
    emphasis: "Agora é com você.",
    text: "Combine Dockerfile, image, container, volumes e Compose para construir ambientes reproduzíveis e fáceis de compartilhar.",
    code: "docker compose up -d",
  },
];

export default function DockerWorkshop() {
  return (
    <WorkshopDeck
      title="Docker"
      accent="#137cfa"
      icon={dockerIcon}
      iconAlt="Docker"
      number="01"
      slides={slides}
    />
  );
}
