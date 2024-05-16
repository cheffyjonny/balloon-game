# Introduction

Welcome to 풍선터트리기!! 난이도 상, 중, 하, 그리고 사용자 지정레벨로 이루어진 풍선 터트리기 게임입니다. 테마 설정 기능을 부여하였습니다.
Firebase 활용하여 게임 이어하기 기능 부여하였습니다.

# Structure

```
App
├── DarkModeSwitch
└── MainPage
    ├── Grid
    └── GameOption
        ├── TextField
        └── Option
```

# Logic

## App.tsx

- `react-toggle-dark-mode`: 노드패키지와 Context Hook을 활용하여 구현

## Grid.tsx

- Firebase를 활용하여 게임 저장 및 불러오기 기능 부여
- react-toastify를 활용하여 게임 저장 notification 부여
- `createGame`: 게임 격자, 풍선 생선, DFS 알고리즘을 활용하여 풍선의 연결점을 구현
- `handleSaveGame`: Firebase를 활용하여 데이터베이스 연동

## GameOption.tsx

- `isCustom`: 사용자지정 레벨을 설정할 수 있도록 구현

  <br>
  <br>
  <br>

# Set up instruction

To install the package and run the project: `npm install && npm run dev` <br>
