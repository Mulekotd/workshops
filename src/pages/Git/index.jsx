import WorkshopDeck from "/src/components/WorkshopDeck";

import { gitIcon } from "/src/utils/icons";
import "./git.css";

const slides = [
  {
    label: "Início",
    title: "Git sem",
    emphasis: "medo.",
    text: "Controle a história do seu código, colabore com segurança e entregue versões rastreáveis.",
    tags: ["histórico", "colaboração", "versões"],
  },
  {
    label: "Repositórios",
    title: "A casa do",
    emphasis: "histórico.",
    text: "Um repositório guarda arquivos, commits e referências. O local fica na sua máquina; o remoto fica em um servidor compartilhado, como GitHub ou GitLab.",
    code: "git init                 # cria um repositório local\ngit remote add origin URL # conecta ao remoto\ngit remote -v",
  },
  {
    label: "Clone",
    title: "Traga o projeto",
    emphasis: "para perto.",
    text: "Clone cria uma cópia local completa do repositório remoto, incluindo histórico e branches.",
    code: "git clone https://github.com/org/projeto.git\ncd projeto\ngit status",
  },
  {
    label: "Commit",
    title: "Registre uma",
    emphasis: "decisão.",
    text: "Um commit é uma fotografia lógica da alteração. Selecione o que entra e escreva uma mensagem curta no imperativo.",
    code: 'git status\ngit add src/App.jsx\ngit diff --staged\ngit commit -m "Adiciona tela de perfil"',
  },
  {
    label: "Pull & push",
    title: "Sincronize",
    emphasis: "o time.",
    text: "Pull traz mudanças do remoto e integra à branch atual. Push publica seus commits no remoto. Faça pull antes de enviar para reduzir conflitos.",
    code: "git pull origin main\ngit push origin minha-branch\ngit push -u origin minha-branch",
    note: "Evite usar push --force em branches compartilhadas.",
  },
  {
    label: "Branches",
    title: "Isole o trabalho",
    emphasis: "sem isolar o time.",
    text: "Branches permitem desenvolver uma tarefa sem mexer na linha principal. switch troca de contexto; -c cria e já muda para a nova branch.",
    code: "git switch -c feat/login\ngit switch main\ngit branch\ngit branch -d feat/login",
  },
  {
    label: "Rebase",
    title: "Reaplique seus commits",
    emphasis: "sobre a base nova.",
    text: "Rebase move seus commits para o topo de outra branch, deixando o histórico linear. Ele reescreve commits: use apenas em trabalho que não foi compartilhado.",
    code: "git switch feat/login\ngit fetch origin\ngit rebase origin/main\n# resolva conflitos, depois:\ngit rebase --continue",
  },
  {
    label: "Merge",
    title: "Una histórias",
    emphasis: "com intenção.",
    text: "Merge combina o histórico de duas branches. Pode gerar um commit de merge e, se houver conflito, você decide qual conteúdo deve permanecer.",
    code: "git switch main\ngit pull origin main\ngit merge feat/login\ngit push origin main",
  },
  {
    label: "Tags",
    title: "Marque versões",
    emphasis: "importantes.",
    text: "Tags são nomes estáveis para pontos do histórico — normalmente releases. Prefira tags anotadas, que registram autor, data e mensagem.",
    code: 'git tag -a v1.0.0 -m "Primeira versão"\ngit push origin v1.0.0\ngit tag -l',
  },
  {
    label: "Worktrees",
    title: "Duas branches.",
    emphasis: "Dois diretórios.",
    text: "Worktrees permitem abrir outra branch em outra pasta usando o mesmo repositório. Ótimo para corrigir algo urgente sem guardar o trabalho atual.",
    code: "git worktree add ../projeto-hotfix hotfix/login\ncd ../projeto-hotfix\ngit worktree list\ngit worktree remove ../projeto-hotfix",
  },
];

export default function GitWorkshop() {
  return (
    <WorkshopDeck
      title="Git"
      accent="#f05033"
      icon={gitIcon}
      iconAlt="Git"
      number="02"
      slides={slides}
    />
  );
}
