# Introduction

Welcome to 풍선터트리기!! 난이도 상, 중, 하, 그리고 사용자 지정레벨로 이루어진 풍선 터트리기 게임입니다. 테마 설정 기능을 부여하였습니다.
선택 사항 중 한가지인, 게임 URL 복사 과정을 Firebase와 Render cloud application을 통하여 적용하려고 하였으나 마무리 짓지 못하여, 마무리 지어야 할 부분은 Todo로 주석처리 하였습니다.

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

- `createGame`: 게임 격자, 풍선 생선, DFS 알고리즘을 활용하여 풍선의 연결점을 구현
- `handleSaveGame`: Firebase를 활용하여 데이터베이스 연동

## GameOption.tsx

- `isCustom`: 사용자지정 레벨을 설정할 수 있도록 구현

  <br>
  <br>
  <br>

# Set up instruction

To install the package and run the project: `npm install && npm run dev` <br>
