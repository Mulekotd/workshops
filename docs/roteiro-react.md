# Roteiro de apresentação — Workshop React

**Duração sugerida:** 45 a 55 minutos  
**Público:** pessoas com noções básicas de HTML, CSS e JavaScript

## Abertura — React de verdade (3 min)

“React nos ajuda a construir interfaces divididas em componentes. Em vez de manipular a tela manualmente a cada mudança, descrevemos como ela deve aparecer para cada estado dos dados.”

Apresente o resultado esperado: ao final, a turma deve conseguir criar componentes, passar dados por props, guardar dados com estado e responder a interações.

## Conceito — UI como função do estado (5 min)

“Uma forma útil de pensar em React é: interface é uma função do estado. Se os dados mudam, React calcula o que precisa mudar na tela.”

Use um contador como exemplo mental: com `count = 0`, o botão mostra zero; ao atualizar para um, a mesma descrição de interface passa a mostrar um. Explique que componentes são funções reutilizáveis que recebem dados e retornam interface.

## JSX (5 min)

“JSX parece HTML, mas é JavaScript. Por isso usamos chaves para incluir expressões, `className` no lugar de `class` e fechamos todas as tags.”

Leia o exemplo `Welcome`. Aponte que `name` é uma variável JavaScript e que `{name}` a insere no JSX. Peça que a turma altere o nome e confirme a atualização na tela.

## Componentes (6 min)

“Componentes bons são pequenos e têm uma responsabilidade clara. Em vez de uma página enorme, podemos ter `Header`, `Button`, `TaskList` e `Task`.”

Mostre o `Button` e depois o uso em `App`. Explique a convenção: nomes de componentes começam com letra maiúscula e são usados como tags, por exemplo `<Button />`. Evite quebrar a interface em componentes demais antes de haver uma responsabilidade clara.

## Props (6 min)

“Props são dados que entram no componente. O componente pai fornece valores; o filho os lê, mas não deve alterá-los.”

No exemplo de `Avatar`, destaque a desestruturação `{ name }`, o uso do nome no `alt` e a interpolação na URL. Mostre como o mesmo componente pode renderizar pessoas diferentes apenas mudando a prop. Relacione `alt` à acessibilidade: imagens informativas precisam de uma descrição útil.

## Estado (8 min)

“Quando a interface precisa lembrar algo entre renderizações, usamos estado. `useState` nos entrega o valor atual e uma função para solicitar sua atualização.”

Leia o contador linha a linha. Diga explicitamente: “Não façam `count = count + 1`; em React, usamos `setCount`.” Se houver tempo, altere para a forma funcional `setCount((currentCount) => currentCount + 1)` e explique que ela é especialmente segura quando a atualização depende do valor anterior.

## Eventos (5 min)

“Eventos ligam a interface às ações da pessoa usuária. Nós passamos uma função, não chamamos a função durante a renderização.”

No formulário, explique `onSubmit={handleSubmit}` e `event.preventDefault()`: sem ele, o navegador recarregaria a página. Cite `onClick`, `onChange` e `onSubmit` como os eventos mais frequentes. Peça que a turma substitua o `console.log` por uma ação visível na tela.

## Effects (6 min)

“`useEffect` é para sincronizar o componente com algo fora do React: uma API, um timer, uma assinatura ou uma biblioteca externa. Não é a primeira ferramenta para calcular valores que já podem ser calculados durante a renderização.”

Explique o exemplo do intervalo: ele é criado quando o componente entra em cena e `clearInterval` o remove na limpeza. Alerte que dependências devem refletir os valores usados pelo effect; efeitos sem limpeza podem causar vazamentos e comportamentos duplicados.

## Prática — Lista de tarefas (8 min)

“Agora vamos reunir os fundamentos em uma lista de tarefas. Criem um componente `Task` que recebe título por prop. No componente principal, guardem a lista em estado. Usem eventos para adicionar e concluir tarefas.”

Apresente o início de projeto com Vite, caso a turma esteja em ambiente local:

```bash
npm create vite@latest minha-app -- --template react
cd minha-app
npm install
npm run dev
```

Circule pela turma com três perguntas-guia: “Que dado precisa persistir entre renderizações?”, “Qual componente recebe esse dado?” e “Que evento muda esse estado?”

## Encerramento (3 min)

“O mapa do React é: componentes organizam a interface; props levam dados para baixo; estado guarda o que muda; eventos pedem mudanças; effects conectam com o mundo externo.”

Como próximo passo, sugira transformar a lista em uma aplicação mais completa: salvar em uma API ou no armazenamento local, filtrar tarefas e separar componentes conforme a interface crescer.
