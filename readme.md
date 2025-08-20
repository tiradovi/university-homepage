# 🏫 우리대학교 홈페이지

한국 대학교의 공식 홈페이지를 구현한 완전한 웹 애플리케이션입니다. 반응형 디자인과 사용자 관리 시스템, 동적 콘텐츠 관리를 통해 실제 대학 웹사이트와 유사한 완성도 높은 경험을 제공합니다.

## 라이브 데모

<div align="center">

###  **[배포된 웹사이트 보기](https://ghibli-movie-theater-gn2t.vercel.app/)**

[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://ghibli-movie-theater-gn2t.vercel.app/)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://ghibli-movie-theater-gn2t.vercel.app/)

**별도 설치 없이 바로 체험 가능**

</div>

## 프로젝트 개요

이 프로젝트는 현실적인 대학교 홈페이지를 완전히 구현한 정적 웹 애플리케이션입니다. 18개 학과의 상세 정보, 실시간 공지사항 관리, 사용자 인증 시스템 등 실제 대학 웹사이트에서 필요한 모든 기능을 포함합니다.

### 주요 특징

- **완전한 사용자 시스템**: 회원가입, 로그인, 프로필 관리, 세션 관리
- **동적 콘텐츠 관리**: 공지사항 CRUD, 자료실 파일 관리
- **반응형 웹 디자인**: 모바일-퍼스트, 4단계 브레이크포인트
- **다크 모드 지원**: 시스템 설정 자동 감지 및 테마 전환

## 기술 스택

### Frontend
- **HTML5**: 시맨틱 마크업, 웹 접근성 준수
- **CSS3**: Flexbox, Grid, 미디어 쿼리, CSS Variables
- **JavaScript (ES6+)**: 모듈화, 이벤트 위임, 비동기 처리
- **jQuery 3.7.1**: DOM 조작 및 AJAX

### 디자인 & UI/UX
- **반응형 웹 디자인**: Mobile-First 접근법
- **CSS 미디어 쿼리**: 4단계 브레이크포인트 (360px, 480px, 768px, 1024px)
- **다크 모드**: `prefers-color-scheme` 자동 감지
- **사용자 경험**: 로딩 애니메이션, 호버 효과, 부드러운 전환

### 데이터 관리
- **LocalStorage**: 사용자 정보, 공지사항 영구 저장
- **SessionStorage**: 로그인 상태, 임시 데이터
- **JSON**: 구조화된 데이터 관리 (자료실 등)

## 프로젝트 구조

```
university-homepage/
│
├── 📄 index.html                 # 메인 홈페이지 (슬라이더, 공지사항 미리보기)
├── 📝 readme.md                  # 프로젝트 문서
│
├── 🎨 css/                       # 스타일시트
│   └── style.css               # 통합 스타일시트 (4,000+ lines)
│
├── 🖼️ img/                      # 이미지 리소스
│   ├── banner/                 # 메인 배너 이미지 (3개)
│   ├── college/                # 단과대학 이미지 (6개)
│   ├── faculty/                # 교수진 사진 (학장 포함 6개)
│   ├── icons/                  # UI 아이콘 (7개)
│   ├── logo/                   # 로고 (일반/다크모드 버전)
│   └── news/                   # 뉴스 이미지 (2개)
│
├── ⚙️ js/                        # JavaScript 파일
│   ├── common.js               # 공통 기능 (네비게이션, 로그인 상태 등)
│   ├── index.js                # 홈페이지 슬라이더 & 공지사항
│   ├── colleges.js             # 대학/학과 소개 모달 시스템
│   ├── introduce.js            # 학교 소개 탭 네비게이션
│   ├── login.js                # 로그인 처리 & 팝업
│   ├── mypage.js               # 마이페이지 (프로필, 세션 관리)
│   ├── notice.js               # 공지사항 CRUD 시스템
│   ├── register.js             # 회원가입 실시간 유효성 검사
│   └── resources.js            # 자료실 파일 관리
│
├── 📊 json/                      # 데이터 파일
│   └── resources.json          # 자료실 파일 정보 (10개 샘플)
│
├── 📁 files/                     # 다운로드 파일
│   └── example.txt             # 다운로드 테스트 파일
│
└── 📃 page/                      # 서브 페이지
    ├── colleges.html           # 대학 및 학과 소개 (18개 학과)
    ├── introduce.html          # 학교 소개 (4개 탭)
    ├── login.html              # 로그인 팝업
    ├── mypage.html             # 마이페이지 (프로필 관리)
    ├── notice.html             # 공지사항 게시판
    ├── register.html           # 회원가입
    ├── resources.html          # 자료실 (6개 카테고리)
    └── content/                # 학과별 상세 정보 (HTML fragments)
        ├── architecture/       # 건축대학 (3개 학과)
        ├── business/           # 경영대학 (3개 학과)
        ├── engineering/        # 공과대학 (3개 학과)
        ├── humanities/         # 인문대학 (3개 학과)
        ├── social/             # 사회과학대학 (3개 학과)
        └── sports/             # 스포츠대학 (3개 학과)
```

## 실행 방법

### 온라인에서 바로 체험
**가장 쉬운 방법** 별도 설치 없이 바로 사용 가능합니다.

👉 **[https://ghibli-movie-theater-gn2t.vercel.app/](https://ghibli-movie-theater-gn2t.vercel.app/)**

### 로컬 환경에서 실행

#### 요구 사항
- 웹 브라우저 (Chrome, Firefox, Safari, Edge)
- 로컬 웹 서버 (개발 환경용)

#### 설치 및 실행 방법

1. **저장소 클론**
```bash
git clone https://github.com/your-username/university-homepage.git
cd university-homepage
```

2. **로컬 서버 실행**

**VS Code Live Server 사용 (권장):**
- VS Code에서 프로젝트 열기
- Live Server 확장 프로그램 설치
- `index.html` 우클릭 → "Open with Live Server"

3. **브라우저에서 접속**
```
http://localhost:5500
```

## 핵심 기능 하이라이트

### 1. 스마트 슬라이더 시스템 (index.js)
```javascript
// 무한 루프 슬라이더 with 자동재생
function moveSlide(direction) {
  slideIndex += direction;
  
  $slideWrap.stop(true, true).animate({
    marginLeft: -slideIndex * slideWidth + "px"
  }, 500, () => {
    if (slideIndex >= slideCount) {
      slideIndex = 0;
      $slideWrap.css("margin-left", "0px");
    }
  });
}
```

### 2. 실시간 유효성 검사 (register.js)
```javascript
// 실시간 입력 검증
const validators = {
  id: {
    regex: /^[0-9]{8,12}$/,
    msgValid: "사용 가능한 아이디입니다.",
    msgInvalid: "숫자 8~12글자 사이로 작성해주세요."
  },
  pw: {
    regex: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,20}$/,
    msgValid: "사용 가능한 비밀번호입니다.",
    msgInvalid: "영문자 + 숫자 포함 8~20자로 작성해주세요."
  }
};
```

### 3. 동적 공지사항 관리 (notice.js)
```javascript
// CRUD 기능 구현
function saveNotice() {
  const newNotice = {
    title: $("#notice-title").val().trim(),
    content: $("#notice-content").val().trim(),
    category: $("#notice-category").val(),
    author: getSession("loggedInUser").name,
    date: new Date().toISOString().slice(0, 10)
  };
  
  notices.push(newNotice);
  setStorage("notices", notices);
  renderNotices();
}
```

### 4. 세션 관리 시스템 (mypage.js)
```javascript
// 30분 자동 로그아웃 with 연장 기능
function startSessionTimer(sessionUser) {
  sessionTimerInterval = setInterval(() => {
    const remaining = sessionDuration - (Date.now() - sessionUser.loginTime);
    if (remaining > 0) {
      const min = Math.floor(remaining / 60000);
      const sec = Math.ceil((remaining % 60000) / 1000);
      $("#timer").text(`${min}분 ${sec}초`);
    } else {
      handleLogout("세션이 만료되어 자동 로그아웃됩니다.");
    }
  }, 1000);
}
```

## 테스트 계정 및 데이터

### 샘플 사용자 계정
```javascript
// 테스트용 계정 (회원가입 후 생성)
{
  아이디: "12345678",          // 숫자 8-12자
  비밀번호: "test1234",        // 영문+숫자 8-20자
  이름: "홍길동",              // 한글 2-15자
  성별: "M"                    // M/F
}
```

## 브라우저 호환성

### 지원 브라우저
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### 주요 기능 호환성
- ✅ CSS Grid & Flexbox
- ✅ ES6+ JavaScript (모듈화, 화살표 함수, 템플릿 리터럴)
- ✅ jQuery 3.7.1
- ✅ CSS 미디어 쿼리 & CSS Variables
- ✅ LocalStorage & SessionStorage
- ✅ `prefers-color-scheme` (다크 모드)

## 📱 모바일에서 체험하기

모바일 기기에서 다음 URL을 입력하여 반응형 디자인을 직접 체험해보세요:

**🔗 https://ghibli-movie-theater-gn2t.vercel.app/**
