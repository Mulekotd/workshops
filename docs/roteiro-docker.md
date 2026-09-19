# Roteiro de apresentação — Workshop Docker

**Duração sugerida:** 50 a 60 minutos  
**Público:** pessoas iniciando em desenvolvimento e infraestrutura

## Abertura — Docker sem mistério (3 min)

“Hoje vamos tirar o Docker do campo do ‘comando misterioso’ e usá-lo para resolver um problema bem concreto: fazer a aplicação rodar do mesmo jeito na máquina de todo mundo. Ao final, vocês vão saber diferenciar image, container e volume, e subir uma aplicação com Docker Compose.”

Pergunte: “Quem já ouviu a frase ‘funciona na minha máquina’?” Use as respostas para conectar o problema à proposta do Docker.

## O que é Docker? (5 min)

“Docker empacota a aplicação com o que ela precisa para executar: código, dependências e configurações. Esse pacote roda em um ambiente isolado chamado container. Assim, reduzimos diferenças entre desenvolvimento, teste e produção.”

Reforce que container não é uma máquina virtual completa: ele compartilha o sistema operacional do host, por isso costuma ser mais leve e rápido para iniciar.

Transição: “Para usar isso na prática, primeiro precisamos preparar a máquina.”

## Instalação (5 min)

“No Windows, o caminho mais comum é Docker Desktop com WSL 2 ativo. Em Linux, usamos o Docker Engine. Depois da instalação, estes dois comandos confirmam que está tudo pronto.”

Execute ou peça que acompanhem:

```bash
docker --version
docker run hello-world
```

Explique que `hello-world` baixa uma image pequena, cria um container, executa uma mensagem e encerra. Esse único comando já mostra o fluxo essencial do Docker.

## Containers (7 min)

“Uma image é o molde; um container é a instância desse molde em execução. Pense em uma receita e no prato preparado.”

Apresente o ciclo de vida com Nginx:

```bash
docker run -d --name web -p 8080:80 nginx
docker ps
docker stop web
docker rm web
```

Explique cada opção: `-d` mantém em segundo plano, `--name` dá um nome legível e `-p 8080:80` publica a porta 80 do container na porta 8080 da máquina. Abra `http://localhost:8080` se possível.

## Images (6 min)

“Images são artefatos reutilizáveis e imutáveis. Nós podemos baixá-las de um registry, como o Docker Hub, ou criá-las com um Dockerfile.”

Mostre os comandos do slide e destaque as tags: `postgres:16` fixa a versão e evita surpresas causadas por usar uma versão indefinida.

“Ao construir uma image, o Docker executa as instruções do Dockerfile e produz camadas. O resultado é o mesmo molde que pode ser executado em qualquer ambiente compatível.”

## Volumes (6 min)

“Containers são descartáveis por design. Isso é excelente para código e processos, mas um banco de dados não pode perder seus dados quando o container é removido. É para isso que existem volumes.”

Execute ou explique:

```bash
docker volume create meus-dados
docker run -d -v meus-dados:/var/lib/postgresql/data postgres:16
docker volume ls
```

“O volume fica gerenciado pelo Docker e sobrevive ao container. Não use o sistema de arquivos interno do container como armazenamento permanente.”

## Networking (5 min)

“Em uma rede Docker, os containers se enxergam pelo nome. Se a aplicação precisa falar com o banco, ela usa `database:5432`, e não `localhost`.”

Explique que `localhost`, de dentro de um container, aponta para o próprio container. Mostre a sequência de criação da rede e dos serviços. Cite que o Compose cria uma rede para o projeto automaticamente na maioria dos casos.

## Docker exec (4 min)

“Quando algo não funciona, `docker exec` nos permite investigar dentro de um container que já está rodando.”

```bash
docker exec -it meu-container sh
ls
env
```

Avise: “Alterações manuais feitas aqui são temporárias. Se precisarmos mudar algo de verdade, atualizamos o Dockerfile, a configuração ou os dados persistidos.”

## Docker Compose (7 min)

“Aplicações reais raramente têm um único container. Normalmente há frontend, API, banco e talvez uma fila. O Compose descreve esse conjunto em um arquivo.”

Leia o exemplo de `services` e relacione cada serviço a um container. Destaque que portas, volumes, redes e variáveis de ambiente também pertencem a essa definição. A ideia é que uma pessoa nova no projeto precise de poucos comandos para começar.

## Up & Down (5 min)

“Com a definição pronta, usamos `docker compose up -d` para criar e iniciar os serviços. `ps` mostra o estado, `logs -f` acompanha os logs e `down` desmonta o ambiente.”

```bash
docker compose up -d
docker compose ps
docker compose logs -f
docker compose down
```

Esclareça: “`down` não remove volumes nomeados por padrão. Para apagar dados deliberadamente, seria preciso usar uma opção adicional; façam isso apenas quando souberem que podem perder esses dados.”

## Encerramento — Recap (3 min)

“Vamos fechar o mapa mental: Dockerfile cria uma image; image gera containers; volumes preservam dados; redes conectam serviços; Compose organiza a aplicação inteira. Com isso, o ambiente deixa de ser uma surpresa e passa a ser parte do projeto.”

Proponha o desafio final: cada participante deve subir um serviço com Compose, acessar pelo navegador, verificar os logs e derrubá-lo ao fim. Reserve os últimos minutos para dúvidas e problemas de instalação.
