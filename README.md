# 🤖 Martingale Trading Bot

<p align="center">
  <img src="public/martingale-bot-icon.png" alt="Martingale Trading Bot" width="200"/>
</p>

베이스드앱(Based.One) 거래소에서 동작하는 마팅게일 베팅법 기반 자동 트레이딩 봇입니다.

## 기능

- **그리드 트레이딩 전략**: 설정한 가격 범위 내에서 자동으로 그리드 주문 배치
- **롱/숏 전략 지원**: 시장 상황에 맞게 롱 또는 숏 포지션 선택
- **자동 익절**: 목표 수익률 달성 시 자동으로 포지션 청산
- **그리드 리셋**: 익절 후 현재 가격에서 새로운 그리드 자동 생성
- **실시간 모니터링**: 포지션, 주문, 수익률 실시간 추적

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm start
```

앱이 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 베이스드앱에서 실행

1. [https://testnet.based.one](https://testnet.based.one) 방문
2. 우측 하단의 버그 아이콘 클릭
3. App ID: `martingale01`
4. URL: `http://localhost:3000`
5. "Load app" 클릭

## 사용 방법

1. **트레이딩 설정**
   - 코인 선택 (BTC, ETH, SOL 등)
   - 레버리지 설정 (1x ~ 100x)
   - 가격 범위 설정 (From Price ~ To Price)
   - 그리드 개수 설정 (2 ~ 50)
   - 전략 선택 (Long/Short)
   - 익절 목표 설정 (%)

2. **트레이딩 시작**
   - "Start Trading" 버튼 클릭
   - 봇이 자동으로 그리드 주문 배치

3. **모니터링**
   - 실시간 포지션 및 수익률 확인
   - 그리드 주문 상태 확인
   - 익절 목표가 확인

4. **중지**
   - "Stop Trading" 버튼으로 언제든지 중지 가능

## 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── TradingConfigForm.tsx
│   ├── TradingDashboard.tsx
│   └── ControlPanel.tsx
├── services/           # 비즈니스 로직
│   ├── BasedAppApiService.ts
│   ├── GridManager.ts
│   ├── PositionManager.ts
│   ├── TakeProfitManager.ts
│   └── TradingOrchestrator.ts
├── types/             # TypeScript 타입 정의
│   └── index.ts
├── utils/             # 유틸리티 함수
│   ├── calculations.ts
│   └── validation.ts
├── constants/         # 상수 정의
│   └── index.ts
└── App.tsx           # 메인 앱 컴포넌트
```

## 주요 개념

### 그리드 트레이딩

설정한 가격 범위 내에서 일정한 간격으로 매수/매도 주문을 배치하는 전략입니다.

- **롱 전략**: 현재 가격 아래로 매수 주문 배치
- **숏 전략**: 현재 가격 위로 매도 주문 배치

### 마팅게일 방식

가격이 하락할수록 더 많은 포지션을 축적하여 평균 진입가를 낮추는 전략입니다.

### 자동 익절

모든 포지션의 평균 진입가를 기준으로 목표 수익률에 도달하면 자동으로 전체 포지션을 청산합니다.

## 주의사항

⚠️ **위험 경고**

- 이 봇은 데모/교육 목적으로 제작되었습니다
- 실제 자금을 사용하기 전에 충분히 테스트하세요
- 레버리지 거래는 높은 위험을 수반합니다
- 시장 변동성에 따라 큰 손실이 발생할 수 있습니다
- 투자 결정은 본인의 책임입니다

## 라이선스

MIT

## 문의

문제가 발생하거나 질문이 있으시면 이슈를 등록해주세요.
