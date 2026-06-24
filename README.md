# 📦 SysAlmoxarifado — Controle de Estoque Mobile

Aplicativo React Native (Expo) para controle de estoque do laboratório de enfermagem. Permite cadastrar, buscar, dar baixa e excluir materiais de consumo e permanentes, com integração ao MockAPI.

## 📸 Screenshots

| Tela Principal | Estoque Crítico | Cadastro |
|:-:|:-:|:-:|
| ![Home](./screenshots/home.png) | ![Critico](./screenshots/estoque-critico.png) | ![Cadastro](./screenshots/cadastro.png) |

> **Nota:** Adicione suas capturas de tela na pasta `screenshots/` antes de publicar.

## 🚀 Como rodar

```bash
# Clone o repositório
git clone https://github.com/gustavobarez/prova-2b-dev-mobile-gustavobarez.git
cd prova-2b-dev-mobile-gustavobarez/sysalmoxarifado

# Instale as dependências
npm install

# Inicie o Expo
npx expo start
```

Escaneie o QR Code com o app **Expo Go** no celular ou pressione `a` para abrir no emulador Android.

## 🔧 Configurar MockAPI

1. Crie um projeto em [mockapi.io](https://mockapi.io)
2. Crie o resource `/materiais` com os campos: `name` (string), `quantidade` (number), `categoria` (string), `dataValidade` (string)
3. Copie a URL base do seu projeto (ex: `https://abc123.mockapi.io/api/v1`)
4. Edite o arquivo `sysalmoxarifado/.env`:

```
MOCKAPI_BASE_URL=https://SEU_ID.mockapi.io/api/v1
```

## ✨ Funcionalidades

- **Cadastro de materiais** — Tela dedicada com nome, quantidade, categoria (consumo/permanente) e data de validade
- **Filtro de pesquisa em tempo real** — Busca por nome do material instantaneamente (testID="input-busca")
- **Totalizador de itens** — Exibe a contagem de materiais filtrados (testID="total-itens")
- **Dashboard com ícones** — Cards coloridos para Total, Zerados, Consumo e Permanente
- **Indicador de estoque crítico** — Cards com quantidade < 10 recebem fundo vermelho claro e borda de alerta (accessibilityLabel="estoque-critico")
- **Baixa de estoque** — Informe a quantidade retirada e o sistema atualiza automaticamente
- **Exclusão de materiais** — Remove o item do estoque
- **Pull to refresh** — Arraste para baixo para recarregar a lista
- **Tratamento de erros de rede** — Todas as requisições têm try/catch com alertas amigáveis, prevenindo crash do app
- **Navegação por telas** — React Navigation com stack (Home → Cadastro)

## 🎨 Design

- **Cor principal:** Verde Lima (#32CD32)
- **Ícones:** @expo/vector-icons (MaterialCommunityIcons)
- **Navegação:** @react-navigation/native-stack
- **Dashboard** com ícones e cores distintas por métrica

## 🧪 Contrato Técnico (testIDs)

| Componente | testID / accessibilityLabel |
|---|---|
| TextInput de Pesquisa | `testID="input-busca"` |
| Totalizador de Itens | `testID="total-itens"` |
| TextInput Nome (Cadastro) | `testID="input-nome"` |
| TextInput Quantidade (Cadastro) | `testID="input-quantidade"` |
| Botão Cadastrar | `testID="btn-cadastrar"` |
| FlatList de Materiais | `testID="lista-materiais"` |
| TextInput Retirada | `testID="input-retirada"` |
| Botão Baixar | `testID="btn-baixar"` |
| Botão Excluir | `testID="btn-excluir"` |
| Card com estoque < 10 | `accessibilityLabel="estoque-critico"` |

## 🏗️ Estrutura do Projeto

```
sysalmoxarifado/
├── App.js                     # Entry point com NavigationContainer
├── src/
│   ├── constants.js           # Cores, endpoints, categorias
│   ├── screens/
│   │   ├── HomeScreen.js      # Tela principal com lista, busca e dashboard
│   │   └── CadastroScreen.js  # Tela de cadastro de novo material
│   ├── components/
│   │   ├── MaterialCard.js    # Card do material com ações (baixar/excluir)
│   │   ├── CadastroModal.js   # Modal legado (substituído por CadastroScreen)
│   │   └── EmptyState.js      # Estado vazio da lista
│   └── utils/
│       └── validacoes.js      # Validação de retirada
└── .env                       # URL do MockAPI
```

## 🛡️ Resiliência

Todas as chamadas de rede (`fetch`) estão protegidas com blocos `try/catch`:
- `HomeScreen.fetchMateriais()` — Alerta se não conseguir carregar o estoque
- `MaterialCard.handleBaixar()` — Toast de erro se falhar a baixa
- `MaterialCard.handleExcluir()` — Toast de erro se falhar a exclusão
- `CadastroScreen.handleCadastrar()` — Alerta se falhar o cadastro

## 📱 Tecnologias

- React Native + Expo
- React Navigation (Stack Navigator)
- @expo/vector-icons (MaterialCommunityIcons)
- MockAPI (backend)
- react-native-dotenv (variáveis de ambiente)

## 👤 Autor

Gustavo Barez — Desenvolvimento Mobile 2025
