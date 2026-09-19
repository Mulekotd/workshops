# Roteiro de apresentação — Workshop Git

**Duração sugerida:** 50 a 60 minutos  
**Público:** pessoas iniciando no controle de versão e colaboração em código

## Abertura — Git sem medo (3 min)

“Git é a memória do projeto. Ele registra decisões, permite experimentar sem comprometer a linha principal e torna a colaboração mais segura. Hoje vamos praticar o ciclo completo: obter um projeto, alterar, registrar, sincronizar e integrar mudanças.”

Faça uma distinção inicial: Git é a ferramenta de controle de versão; GitHub e GitLab são serviços que hospedam repositórios Git remotos.

## Repositórios (5 min)

“O repositório guarda arquivos, histórico de commits e referências como branches e tags. O repositório local vive na nossa máquina; o remoto é o ponto compartilhado pelo time.”

Mostre `git init` como início de um repositório local e `git remote add origin URL` como vínculo com o remoto. Execute `git remote -v` para conferir o endereço antes de trabalhar.

Transição: “Na maioria das vezes o projeto já existe no servidor, então em vez de começar do zero nós o clonamos.”

## Clone (4 min)

“`git clone` traz não só os arquivos atuais, mas também todo o histórico e as branches remotas. Depois de clonar, `git status` é o primeiro comando a usar: ele mostra onde estamos e o que mudou.”

```bash
git clone https://github.com/org/projeto.git
cd projeto
git status
```

## Commit (8 min)

“Um commit não é só um salvamento: é uma decisão que deve poder ser entendida depois. Antes de confirmar, verificamos o que mudou, escolhemos o que entra e revisamos a área de preparação.”

```bash
git status
git add src/App.jsx
git diff --staged
git commit -m "Adiciona tela de perfil"
```

Explique a área de staging: `git add` não envia nada ao remoto; ele apenas seleciona a próxima fotografia. Incentive mensagens curtas, específicas e no imperativo. Proponha que cada pessoa edite um arquivo e crie um commit.

## Pull e push (6 min)

“O commit ainda está apenas na nossa máquina. `pull` traz e integra mudanças do remoto; `push` publica nossos commits. Atualizar antes de enviar diminui a chance de conflito.”

Mostre os comandos e explique que `-u` cria o rastreamento entre a branch local e remota. Dê o alerta principal: “Nunca use `push --force` em uma branch compartilhada sem combinar com o time.”

## Branches (7 min)

“Branches nos deixam trabalhar em uma tarefa isolada sem bloquear o restante do time. A `main` deve continuar representando uma versão estável; cada funcionalidade ou correção ganha sua branch.”

```bash
git switch -c feat/login
git switch main
git branch
git branch -d feat/login
```

Sugira nomes previsíveis, como `feat/login`, `fix/menu-mobile` ou `docs/readme`. Lembre que a branch só deve ser apagada depois que seu trabalho foi integrado e não é mais necessária.

## Rebase (5 min)

“Rebase pega nossos commits e os reaplica sobre uma base mais recente. O resultado costuma ser um histórico linear, mas os hashes dos commits mudam.”

Mostre o fluxo de atualização da branch de funcionalidade. Em caso de conflito: resolver os arquivos, adicionar a resolução e usar `git rebase --continue`. Enfatize a regra: “Não faça rebase de commits que outras pessoas já podem ter baseado trabalho em cima deles.”

## Merge (6 min)

“Merge integra duas histórias. Ele preserva a origem das branches e, dependendo do caso, cria um commit de merge.”

Explique o passo a passo no slide: atualizar a `main`, fazer o merge da funcionalidade, resolver conflitos se necessário e publicar. Faça a leitura de um conflito como uma decisão humana: Git aponta o choque, mas o time decide o conteúdo correto.

## Tags (4 min)

“Tags marcam pontos importantes do histórico, normalmente versões publicadas. Diferente de uma branch, uma tag não avança a cada commit.”

Apresente tags anotadas e o padrão de versão semântica, como `v1.0.0`. Lembre que criar a tag localmente não basta: é preciso publicá-la no remoto.

## Worktrees (4 min)

“Worktrees permitem ter duas branches abertas em diretórios diferentes, compartilhando o mesmo repositório. É ótimo quando uma correção urgente aparece enquanto outra tarefa está em andamento.”

Mostre o comando de criação e explique que cada diretório tem arquivos da sua branch, mas o histórico é o mesmo. Use o exemplo de hotfix e finalize removendo o worktree quando ele não for mais necessário.

## Encerramento (3 min)

“O ciclo cotidiano é simples: atualizar, criar uma branch, fazer alterações pequenas, revisar, commitar e publicar. Branches organizam o trabalho; merge ou rebase integram as histórias; tags marcam entregas.”

Desafio final: em duplas, criem branches separadas, alterem arquivos distintos, publiquem, integrem as mudanças e criem uma tag de versão. Reserve o fim para revisar dúvidas sobre conflitos.
