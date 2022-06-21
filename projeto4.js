const prompt = require("prompt-sync")();
console.clear();
console.log();

console.log(`                   A PROFECIA DO DRAGÃO

 Em uma terra muito distante e uma época desconhecida onde a magia e
 espadas faziam parte do dia-a-dia das pessoas, abaixo da grande e majestosa
 montanha do dragão existia um pacifico e magico vilarejo onde milhares
 de pessoas viviam em paz e tranquilidade, mas nem tudo e flores nesse
 mundo, existia uma profecia milenar que cada idoso, adulto e criança,
 pobre ou rico, fraco ou forte desse vilarejo conhecia e essa profecia
 trazia calafrios até aos mais poderosos magos e mais fortes guerreiros.
 A profecia dizia que
 " 10 dias após o alinhamento planetário o grande Dragão Bahamut
 despertará do seu longo sono milenar para trazer o caos e destruição
 desse mundo e no dia do alinhamento planetário as estrelas escolherá
 aquele que possui o coração puro para se tornar o escolhido e ter
 em suas mãos o fardo de carregar o destino de todos os seres vivos
 que será decidido na grande batalha entre o Dragão e o Escolhido."
 `);

console.log(`               →→→ INSTRUÇÕES ←←←
 - Você criará seu personagem lhe nomeando e escolhendo sua classe.
 - Você passará 10 dias se preparando para a batalha final com o Dragão.
 - Cada dia terá 3 periodos (MANHA - TARDE - NOITE).
 - Cada periodo você terá 3 opções distintas onde você conseguirá diferentes upgrades/itens para seu personagem.
 - No 11° dia você irá batalhar com o Dragão Bahamut.
 - A batalha será de turnos, cada turno o jogador e o dragão terá uma ação.
 - Vez do jogador ele terá 5 opções:
     [1] - Atacar (Passa o turno)
     [2] - Esquivar (Gasta 4 de mana e passa o turno)
     [3] - Pedra de teleporte (Para esquivar sem usar mana ou fator secreto, passa o turno)
     [4] - Potion de vida (Recupera 5 de vida e não passa o turno)
     [5] - Potion de mana (Recupera 5 de mana e não passa o turno)
 - Vez do dragão
     [1] - Ataque normal
     [2] - Dragon Breath (Acontece a cada 3 turnos)
     [3] - Dragon Bomb
 - O jogo terá 5 finais diferentes.
 - Bom jogo e boa sorte.
 - Jogue com o terminal MAXIMIZADO
 `)

//REGISTRO DE PERSONAGEM
let nome = prompt(`Digite o nome do heroi: `);
let classe = "";
console.log(`
    →→  CLASSES  ←←
---------------------------------
|  [MAGO]        [GUERREIRO]    |
|  [Vida - 8  ]  [Vida - 11 ]   |
|  [Mana - 10 ]  [Mana - 7  ]   |
|  [Ataque - 8]  [Ataque - 9]   |
---------------------------------
`);
let classeValidada = validacao(classe,"mago","guerreiro",null,null,null,null,"[Mago] ou [Guerreiro]");
//VARIAVEIS E FUNÇÕES CONTROLE DO TEMPO
let dias = 10;
let turno = ["manhã", "tarde", "noite"];

//VARIAVEIS E FUNÇÕES DO PERSONAGEM
let jogador = {
  classe: classeValidada,
  nome: nome,
  hpMax: 0,
  hpAtual: 0,
  manaMax: 0,
  manaAtual: 0,
  ataque: 0,
  level: 0,
  xp: 0,
  runaTeleporte: 0,
  potionVida: 0,
  potionMana: 0,
  esquiva: false,

  classeEscolhida: function () {
    if (this.classe == "mago") {
      this.hpMax = 8;
      this.hpAtual = 8;
      this.manaMax = 10;
      this.manaAtual = 10;
      this.ataque = 8;
    } else {
      this.hpMax = 11;
      this.hpAtual = 11;
      this.manaMax = 7;
      this.manaAtual = 7;
      this.ataque = 8;
    }
  },
  esquivar: function(){
    this.esquiva = true;
    this.manaAtual = this.manaAtual - 5;
  },
  aumentarDano: function () {
      this.ataque++;
  },
  tomarDano: function (dano) {
    if(this.esquiva == false){
      this.hpAtual = this.hpAtual - dano;
    };
  },
  gastarMana: function () {
    this.manaAtual--;
  },
  aumentarMana: function () {
    this.manaMax++;
  },
  curarMana: function (cura) {
    if (this.manaAtual < this.manaMax) {
      this.manaAtual += cura;
      if (this.manaAtual > this.manaMax) {
        this.manaAtual = this.manaMax;
      };
    };
  },
  aumentarVida: function () {
    this.hpMax++;
  },
  curarVida: function (cura) {
    if (this.hpAtual < this.hpMax) {
      this.hpAtual += cura;
      if (this.hpAtual > this.hpMax) {
        this.hpAtual = this.hpMax;
      }
    }
  },
  uparLevel: function () {
    this.xp++;
    if (this.xp == 2) {
      this.level++;
      this.hpMax++;
      this.manaMax++;
      this.ataque++;
      this.xp = 0;
    }
  },
  droparItensMontanha: function (dias) {
    if (dias % 2 == 0) {
      this.runaTeleporte++;
    } else {
      this.potionVida++;
    }
  },
  droparItensBiblioteca: function (dias) {
    if (dias % 2 == 0) {
      this.potionMana++;
    } else {
      this.runaTeleporte++;
    }
  },
  runaEsquiva: function(){
    this.esquiva = true;
  },
  selfdestruction: function(){
    this.hpAtual = 0;
    dragao.hp = 0;
  }
};

//FUNÇÃO DO DISPLAY DE STATUS
function display() {
  console.clear();
  console.log(`  ◘ STATUS ◘                  [DIA ${i}]
  -----------------------------------------------------------------------
  [Nome   - ${jogador.nome}]             [Level - ${jogador.level}]        
  [Classe - ${jogador.classe}]               [XP    - ${jogador.xp}]
  [Vida   - ${jogador.hpAtual}/${jogador.hpMax}]                [PotV  - ${jogador.potionVida}]   
  [Mana   - ${jogador.manaAtual}/${jogador.manaMax}]              [PotM  - ${jogador.potionMana}]
  [Ataque - ${jogador.ataque}]                  [Runa  - ${jogador.runaTeleporte}]`);
};
//FUNÇÃO PARA LORE DA HISTORIA
function lore(escolha, periodo, dias) {
  let num = Math.floor((Math.random() + 1) * 10);
  if (dias % 2 == 0 && periodo == "manhã") {
    if (escolha == 1) {
      console.log(`Você encontrou ${num} Orc's e matou todos eles. 
      [+ 1 XP e -2 de vida]`);
    } else if (escolha == 2) {
      console.log(`Treinar e muito bom, principalmente quando preciso batalhar contra um fucking DRAGÃO. Me sinto mais forte depois desse treinamento
      [+ 1 Ataque e + 1 Vida Máxima]`);
    } else if (escolha == 3) {
      console.log(`Meditando eu tive uma visão o dragão usava um poder chamado Dragon Breath e tinha um padrão para ele usar esse poder mas não conseguir identificar.
      [+ 1 Ataque e + 1 Mana Máxima]`);
    }
  } else if (dias % 2 == 0 && periodo == "tarde") {
    if (escolha == 1) {
      console.log(`Você encontrou ${num} Bandidos e matou todos eles.
      [+ 1 XP e -2 de vida]`);
    } else if (escolha == 2) {
      console.log(`As escamas de um Dragão são muito resistentes por isso vou melhorar minhas armas para causar mais dano.
      [+ 1 Ataque]`);
    } else if (escolha == 3) {
      console.log(`As montanhas estão calmas vou explorar para ver se encontro algo OH! encontrei uma runa de teleporte
      [+ 1 Vida Máxima e + 1 Runa Teleporte]`);
    }
  } else if (dias % 2 == 0 && periodo == "noite") {
    if (escolha == 1) {
      console.log(`Você encontrou ${num} Lobos e matou todos eles.
      [+ 1 XP e -2 de vida]`);
    } else if (escolha == 2) {
      console.log(`Preciso polir meus equipamentos, não posso demorar para matar o Dragão tem um ataque dele que não posso me defender e causa muita destruição mas não tenho informações suficientes sobre ele, vou estudar na biblioteca!! 
      [+ 1 Ataque]`);
    } else if (escolha == 3) {
      console.log(`No livro dos ancião diz que apos o 10° ataque o dragão usa uma habilidade chamada DRAGON BOMB esse poder avassalador e capaz de detruir toda a aldeia.
      [+ 1 Mana Máxima e + 1 Pot Mana]`);
    }
  } else if (dias % 2 != 0 && periodo == "manhã") {
    if (escolha == 1) {
      console.log(`Você encontrou ${num} Bruxos e matou todos eles.
      [+ 1 XP e -2 de vida]`);
    } else if (escolha == 2) {
      console.log(`No treinamento percebi que preciso entender o padrão de ataques do Dragão para criar minhas estrategia!
      [+ 1 Vida Máxima e + 1 Ataque]`);
    } else if (escolha == 3) {
      console.log(`Durante a meditação eu vi um mundo em chamas, completamente destruido, tudo estava em se tornando cinzas. (RESPIRA FUNDO) Preciso detruir esse Dragão custe oque custar.
      [+ 1 Ataque e + 1 Mana Máxima] `);
    }
  } else if (dias % 2 != 0 && periodo == "tarde") {
    if (escolha == 1) {
      console.log(`Você encontrou ${num} Hydras e matou todos eles.
      [+ 1 XP e -2 de vida]`);
    } else if (escolha == 2) {
      console.log(`Melhor defesa é o Ataque! vou arrancar o coro desse calango da peste!
      [+ 1 Ataque]`);
    } else if (escolha == 3) {
      console.log(`Explorando a montanha encontrei um pergaminho mas está em uma lingua que não conheço, irei leva-lo para biblioteca para traduzilo!
      [+ 1 Mana Máxima e + 1 pot de vida]`);
    }
  } else if (dias % 2 != 0 && periodo == "noite") {
    if (escolha == 1) {
      console.log(`Você encontrou ${num} Cyclops e matou todos eles.
      [+ 1 XP e -2 de vida] `);
    } else if (escolha == 2) {
      console.log(`Polindo meu equipamento eu vi todos do vilarejo eu amo todos aqui e não quero ver nehum deles morrer!
      [+ 1 Ataque]`);
    } else if (escolha == 3) {
      console.log(`Trouxe o pergaminho e estou traduzindo usando as escrituras antigas nele diz "O coração do Dragão e seu maior ponto fraco mas para acessa-lo precisa entrar dentro do Dragão! mas cuidado apos destruido ele causa uma explosão que destroi o seu destruidor dessa forma os dois perecem na eternidade" 
      será que consigo entrar dentro do Dragão com uma Runa de Teleporte?.
      [+ 1 Mana Máxima e + 1 Runa de teleporte]`);
    };
  };
};
//FUNÇÃO DE VALIDAÇÃO PARA AS ENTRADAS DO JOGADOR
function validacao(variavel, entrada1 = "", entrada2 = "", entrada3 = "", entrada4 = "", entrada5 = "",entrada6 = "", arg = "") {
  while (true) {
    variavel = prompt(`Digite ${arg} para fazer a sua escolha: `).toLowerCase();
    if (variavel == entrada1 || variavel == entrada2 || variavel == entrada3 || variavel == entrada4 || variavel == entrada5 || variavel == entrada6) {
      return variavel;
    } else {
      console.log("ERRO!, Digite uma opção valida!");
    };
  };
};
jogador.classeEscolhida();
//CRONOGRAMA PARA PREPARAÇÃO DO ATO FINAL
for (i = 1; i <= dias && jogador.hpAtual > 0; i++) {
//DISPLAY PARA ESCOLHAS DURANTE A PREPARAÇÃO
  for (let periodo of turno) {
    jogador.curarVida(1);
    console.log(`----------------------------------------------------------------
        OPÇÕES                          [PERIODO - ${periodo}]`);
    if (periodo === "manhã") {
      console.log(`        [1] - Caçar
        [2] - Treinar
        [3] - Meditar`);
    } else if (periodo === "tarde") {
      console.log(`        [1] - Caçar
        [2] - Melhorar Armas
        [3] - Explorar Montanha`);
    } else {
      console.log(`        [1] - Caçar
        [2] - polir equipamento
        [3] - Estudar biblioteca`);
    };
//ESCOLHAS DO JOGADOR JA VALIDADAS
    let escolha = "";
    let escolhaValidada = validacao(escolha,1,2,3,null,null,null,"[1], [2] ou [3]");
//CONDIÇÕES DAS ESCOLHAS
    if (escolhaValidada == 1 && periodo == "manhã") {
      jogador.tomarDano(1);
      jogador.uparLevel();
    } else if (escolhaValidada == 2 && periodo == "manhã") {
      jogador.aumentarVida();
      jogador.aumentarDano();
    } else if (escolhaValidada == 3 && periodo == "manhã") {
      jogador.aumentarMana();
      jogador.aumentarDano();
    } else if (escolhaValidada == 1 && periodo == "tarde") {
      jogador.tomarDano(1);
      jogador.uparLevel();
    } else if (escolhaValidada == 2 && periodo == "tarde") {
      jogador.aumentarDano();
    } else if (escolhaValidada == 3 && periodo == "tarde") {
      jogador.aumentarVida();
      jogador.droparItensMontanha(i);
    } else if (escolhaValidada == 1 && periodo == "noite") {
      jogador.tomarDano(1);
      jogador.uparLevel();
    } else if (escolhaValidada == 2 && periodo == "noite") {
      jogador.aumentarDano();
    } else if (escolhaValidada == 3 && periodo == "noite") {
      jogador.aumentarMana();
      jogador.droparItensBiblioteca(i);
    };
//DISPLAY E LORE DA HISTORIA.
    display();
    console.log("---------------------- Console Lore ----------------------");
    lore(escolhaValidada, periodo, i);
  };
};
//VARIAVEIS E FUNÇÕES DO DRAGÃO
let dragao = {
  nome: "Bahamut",
  classe: "Dragão Lendario",
  hp: 100,
  ataque: 4,
  dragonBreath: 10,

  tomarDano: function(dano){
    this.hp = this.hp - dano;
  }
};
//DISPLAY DO ATO FINAL
function displayFinal() {
  console.clear();
  console.log(`  ◘ Heroi ◘              [BATALHA FINAL]              ◘ Dragão ◘ 
  -----------------------------------------------------------------------
  [Nome   - ${jogador.nome}]                           [Nome   - ${dragao.nome}]
  [Classe - ${jogador.classe}]                             [Classe - ${dragao.classe}]
  [Level  - ${jogador.level} ]                               [Level  - ??]
  [Ataque - ${jogador.ataque}]                               [Ataque - ${dragao.ataque}]
  [Vida   - ${jogador.hpAtual}/${jogador.hpMax}]                            [Vida   - ${dragao.hp}]
  [Mana   - ${jogador.manaAtual}/${jogador.manaMax}]               
  [PotV   - ${jogador.potionVida}]               
  [PotM   - ${jogador.potionMana}]                
  [Runa   - ${jogador.runaTeleporte}]
  `);
};

jogador.hpAtual = jogador.hpMax
jogador.manaAtual = jogador.manaMax

console.log(`
-------------------------------- ╩ A GRANDE BATALHA ╩ --------------------------------
Um grande terremoto acontece! todos escutam um estrondoso rugido vindo das montanhas, derrepente tudo fica escuro e a silhueta do dragão aparece na frente do sol, a sombra transformava o dia em noite no vilarejo e o corajo heroi olha nos olhos do dragão e começa o ato final.
`)
prompt(`Aperter [ENTER] para proseguir para a batalha final!`)

let cont = 0
while(true){
  cont++;
  jogador.esquiva = false;
  displayFinal();
  console.log(`--------------------- →→ OPÇÕES DA BATALHA ←← ----------------------`)
  if(jogador.hpAtual > 4){
    console.log(`                                   █ Turno ${cont}█
  [1] - Atacar (Passa o turno)
  [2] - Esquivar (Gasta 4 de mana e passa o turno)
  [3] - Pedra de teleporte (Para esquivar sem usar mana passa o turno)
  [4] - Potion de vida (Recupera 5 de vida e não passa o turno)
  [5] - Potion de mana (Recupera 5 de mana e não passa o turno) 
  `);
  } else{
    console.log(`                                   █ Turno ${cont}█
  [1] - Atacar (Passa o turno)
  [2] - Esquivar (Gasta 4 de mana e passa o turno)
  [3] - Pedra de teleporte (Para esquivar sem usar mana passa o turno)
  [4] - Potion de vida (Recupera 5 de vida e não passa o turno)
  [5] - Potion de mana (Recupera 5 de mana e não passa o turno)
  [6] - Teleportar para dentro do Dragão (Precisa de uma Runa) 
  `);
  }
  let jogada = "";
  let jogadaValidada = validacao(jogada, 1, 2, 3, 4, 5, 6, "[1 a 5]");
  if(jogadaValidada == 1){
    dragao.tomarDano(jogador.ataque);
  }else if (jogadaValidada == 2){
    if(jogador.manaAtual >= 5){
      jogador.esquivar();
    } else {
      console.log(`Você não tem mana use pot ou escolha outra ação`)
      continue
    };
  }else if (jogadaValidada == 3){
    if(jogador.runaTeleporte > 0){
      jogador.runaEsquiva();
    } else {
      console.log(`Você não tem runas para utilizar`);
    }
  }else if (jogadaValidada == 4){
    if(jogador.potionVida > 0){
      jogador.curarVida(10);
    }else {
      console.log(`Você não tem potion de vida`);
    };
    continue;
  }else if (jogadaValidada == 5){
    if(jogador.potionMana > 0){
      jogador.curarMana(10);
    }else{
      console.log(`Você não tem potion de mana`)
    };
    continue;
  }else if (jogadaValidada == 6){
    if(jogador.hpAtual < 5 && jogador.runaTeleporte > 0){
      jogador.selfdestruction();
    };
  };
  if(cont % 3 == 0){
    jogador.tomarDano(dragao.dragonBreath);
  } else {
    jogador.tomarDano(dragao.ataque);
  };
  if(jogador.hpAtual <= 0 && dragao.hp > 0){
    console.log(`---------------------- FINAL ------------------------
    Você MORREU e toda a vida no planeta foi reduzido a cinzas!`)
    break
  }else if(dragao.hp <= 0 && jogador.hpAtual > 0 && cont < 11){
    console.log(`---------------------- FINAL ------------------------
    Você matou o Dragão e salvou todos tornado um heroi lendario`)
    break
  }else if(dragao.hp <= 0 && jogador.hpAtual > 0 && cont > 11){
    console.log(`---------------------- FINAL ------------------------
    Você matou o Dragão e salvou o mundo, mas toda sua Vila foi destruida e as pessoas que você ama todos estão mortos!`)
    break
  }else if(dragao.hp <= 0 && jogador.hpAtual <= 0 && cont < 11){
    console.log(`---------------------- FINAL ------------------------
    A unica saida que o heroi encontrou para salvar o mundo foi se sacrificando e destruindo o coração do Dragao por dentro, seu nome será lembrado por varias gerações e uma enorme estatua foi feita no meio do vilarejo em sua homenagem!`)
    break
  }else if(dragao.hp <= 0 && jogador.hpAtual <= 0 && cont > 11){
    console.log(`---------------------- FINAL ------------------------
    Após ter o vilarejo destruida e com irá em seus olhos o jovem heroi teleportou-se para dentro do dragão e destruiu seu coração se sacrificando mas salvando o mundo do terrivel destino que seu vilarejo teve! `)
    break
  };
};