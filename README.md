# UBIWHERE SOLIDITY TEST

# ---- INSTALAÇÃO DE EXTENSÕES ---- #

# Utilizar o Visual Studio Code;
# Instalar a extensão Blockchain Development Kit;
# Instalar a extensão Solidity; 
# Instalar a extensão Live Server para criar um servidor local por forma a poder criar um servidor local e testar (no ficheiro .html, com o botão do lado direito fazer "Open with live server");
# Instalar o truffle com o comando npm install -g truffle;
# Fazer login da base de dados Moralis (https://moralis.io/), credenciais: (username: pedrolimas22@hotmail.com // pass: 8_ccYaxSGj#7Y9x);
# (Não necessário) No ficheiro main.js pode-se alterar o id e o URL do servidor;
# No Moralis deve-se declarar individualmente qualquer evento do contrato para registo: reticências, Plugins, Browse, install Sync and Wach Contract Events (os eventos instalados podem ser consultados na aba Installed);
# Na dashboard, podem ser visualizadas as tabelas criadas do lado esquerdo (neste caso, alguns eventos foram registados na tabela "Cars") | A aba Jobs permite sincronizar a tabela com a Blockchain, visto que o frontend escreve diretamente na mesma |;
# Na aba Servers, ir às reticências de UbiwhereNet e no terminal executar truffle migrate --reset --network ethtest compile para compilar e migrar o contrato escrito;
# O utilizador deverá ter uma conta Metamask com fundos para os poder movimentar (selecionar a testnet ropsten na Metamask);
# Foi utilizada uma testnet: Ropsten, pelo que através de https://faucet.ropsten.be/, o utilizador pode pedir fundos de teste;
# Depois de fazer o download do GIT, fazer cd para o diretório - npm install;
# Criar um .env dentro do diretório com o comando touch .env e colocar a Secret Recovery Phrase da carteira (mnemónica);

# --- UTILIZAÇÃO DO CONTRATO --- #

# Este contrato apresenta um frontend elementar embutido para poder testar;
# O utilizador deve então fazer o Login para autenticar a sua carteira com a aplicação e poder interagir com a mesma;
# De seguida, pode criar um carro com um preço e uma disponibilidade, com o botão "Criar" regista-se o mesmo na Base de Dados;
# Com o botão ler, pode-se ler todo o conteúdo da tabela "Cars" do Moralis que faz a ponte entre a Blockchain e o frontend para leituras;
# O botão "Editar" permite alterar o preço e a disponibilidade de qualquer veículo (é criada uma nova linha na tabela com os novos parâmetros, não tendo conseguido construir uma query de alteração);
# O botão eliminar retira um id escolhido da apresentação de resultados de "Ler";
# Os botões de inicialização e término são utilizados pelo dono do carro para iniciar e cessar contrato;
# Os botões "Por Alugar" e "A Alugar", servem para consultar os veículos com disponibilidade a true/false, respetivamente;

# --- NOTAS FINAIS --- # 

# O contrato lançado no deploy é um contrato mais antigo. Quando tento fazer truffle migrate --reset --network ethtest, é-me apresentado um erro que não consegui corrigir. Pelas threads que vi, pode ser do ambiente truffle ou da testnet que utilizei. Desta forma, o contrato lançado é antigo e não tem um evento que deveria ter;
# Os botões de início e fim de aluguer não funcionam devidamente. Como não consegui fazer deploy do último, não consegui testar as funções novas e as alteradas do mesmo;
# Os botões que funcionam corretamente são o Login, Criar, Ler, Editar e Eliminar;

# A aplicação consegue comunicar com a blockchain (Ropsten Testnet) e com a base de dados (Moralis), no entanto não consegui cumprir alguns requisitos do exercício