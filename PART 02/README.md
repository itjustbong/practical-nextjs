# NextJS 실전 감각 익히기

- Nextjs 및 웹팩, 바벨 등 소개
- SSR, SSG, ISR 렌더링 전략 소개
- NextJS 기초, 내장 컴포넌트 (\_app, \_document)

# 📌 NextJS 알아보기

**NextJS**

- 서버 사이드 렌더링(SSR), 정적 사이트 생성(SSG), Incremental Static Generation(ISR) 지원 등
- 리액트는 SEO의 효과를 거의 볼 수 없으며, 첫 화면을 표시하기 위해 앱 실행 초기에 성능 부담이 발생
- 서버에서 미리 렌더링해두는 방식 고려 → 리액트 앱을 순수한 HTML페이지로 미리 렌더링 → 요청시 즉각 반응
  → 이후, 클라이언트에서 번들이 다 다운로드되면, 상호 작용할 수 있도록 조치
- 넥스트의 주요 기능: 코드 분할, 서버사이드렌더링, 파일기반라우팅, 경로기반프리페칭

### 넥스트와 비슷한 프레임워크

**Gatsby**

- 정적 사이트 생성만 지원, 모든 페이지를 빌드 시점에 미리 렌더링해서 정적 콘텐츠 형태로 생성 → 바로 CDN 제공 가능.

**Nuxt.js**

- 뷰 진영의 Next.js

**특징**

- 넥스트는 “설정보다는 관습”이라는 취지로 개발됨.
- tsconfig.json에 기초적인 설정이 되어 있으며, 원하는 경우 파일을 직접 수정할 수 있으나, Next.js가 바벨의 플러그인을 활용해서 설정을 관리하기 때문에 주의 사항이 있음.
- @babel/plugin-transform-typescript: const enum 사용 불가
- export =, import 구문 사용 불가, ECMAScript 구문으로 바꾸어야 함.

<aside>
📌 export , import 관련해서 차이점 및 설명 알아두기

</aside>

### 바벨

- 자바스크립트 트랜스컴파일러
- 최신 자바스크립트 코드 하위 호환성을 보장하도록 변환
- 설정을 커스텀하고 싶다면, .babelrc 파일로.
  해당 파일에는 `{presets: ["next/bable"]}` 이 기본 값으로는 있어야 해.
- if 새로운 플러그인을 활용하고 싶다면

```json
// 파이프라인 관련 기능을 활용하고 싶다면,

{
  "presets": ["next/babel"],
  "plugins": ["@babel/plugin~", { "proposal": "fsharp" }]
}
```

### 웹팩

- 특정 라이브러리, 페이지 등의 코드를 전부 포함하는 번들을 만들어 줌.
- 모단 자원에 대해 각기 다른 컴파일 번들, 최소화 작업을 조율하고 처리해주는 일종의 인프라
- SASS나 LESS와 같은 CSS 전처리기를 사용해서 스타일을 만들고 싶다면, 웹 팩 설정을 수정해서 SASS나 LESS 파일들을 분석 및 처리하여 CSS 파일들을 만들도록 해야 함.
- 빌드 과정에서 설정을 커스텀 하기 위해서는 next.config.js 파일의 기본값을 변경할 수 있음.

# 📌  렌더링 전략

### 서버 사이드 렌더링

- HTML 페이지를 동적으로 렌더링하고 브라우저로 전송 → 서버에서 렌더링한 페이지에 스크립트 코드를 집어넣어서 나중에 웹 페이지를 동적으로 처리할 수도 있는데 이를 **하이드레이션**이라고 함
- 하이드레이션 덕분에, SPA처럼 작동할 수 있음 → CSR과 SSR의 장점을 모두 가짐.

**예시**

1. 블로그 글 HTML 파일 Client 전달
2. Client에서 피룡한 스크립트 다운로드
3. DOM위에 각 스크립트 코드를 하이드레이션 진행

**장점**

- 더 안전한 웹
  - 서버에서 렌더링하기 때문에, 쿠키 관리, 주요 API, 데이터 검증 등과 같은 작업을 서버에서 처리
- 더 뛰어난 웹 호환성
  - 클라이언트 환경이 JS에 관계없이 웹 페이지를 제공할 수 있음.
- 더 뛰어안 SEO

**단점**

- 서버 유지 비용
  - 사용자 요청시마다 작동해야하는 서버.
- 페이지에 대한 요청을 처리하는 시간이 길어짐.
  - 데이터 fetching이 추가되는 경우 추가 요청이 서버에서 발생함.
- 페이지간의 이동이 CSR이나 SSG보다는 느릴 수 있음
  - 단, Nextjs에서는 이를 해결하기 위한 기능을 제공

**getServerSideProps**

- 비동기 함수를 export함.
- 빌드 과정에서 해당 함수를 출력하는 모든 페이지를 찾아서 서버가 페이지 요청을 처리할 때 해당 함수를 호출하도록 만듬.
- 항상 서버에서만 실행됨.
- props라는 속성값을 갖는 객체를 반환함.
- Next는 해당 props를 컴포넌트로 전달하여 서버와 클라이언트 모두 props에 접근하고 사용할 수 있음.

**주의사항**

- 브라우저 전용 API를 사용해야 하는 컴포넌트가 있다면 해당 컴포넌트를 반드시 브라우저에서 렌더링하도록 명시해줘야 함.

### CSR

- React의 기본 렌더링 방식

**장점**

- 네이티브 애플리케이션과 유사하게 작동
  - 전체 JS파일을 다운로드 한다는 것은 렌더링할 모든 페이지가 이미 브라우저에 다운되어 있다는 뜻.
  - 다른 페이지로 이동하면 서버에서 그 페이지에 해당하는 새로운 컨텐츠 다운 X
  - 그냥 페이지의 컨텐츠를 새로운 것으로 바꿈.
- 쉬운 페이지 전환
  - 브라우저 화면을 새로 고칠 필요없이 다른 페이지로의 이동을 가능케 함.
- Lazy loading과 성능
  - CSR을 사용하면 웹 앱에서는 최소한의 HTML마크업만 렌더링함.
  - 사용자가 버튼을 클릭하면 보이는 모달은 실제 HTML페이지에 마크업으로 존재하지 않음.
  - 리액트가 필요에따라 동적으로 생성
- 서버 부하 감소
  - 서버에서 할일은 정적파일만 전달하는 것.

**단점**

- 모든 파일을 내려받기 위해 초기 로딩 속도가 오래걸릴 수 있음.

Next는 기본적으로 대부분의 컴포넌트를 서버에서 렌더링하거나 빌드 시점에 미리 렌더링함.

그렇기 때문에 주요 Client API에 접근하지 못함.

### 특정 컴포넌트를 브라우저에서 렌더링하도록

**useEffect**

- useEffect가 리액트 하이드레이션 이후 브라우저에서 실행되도록 만들면 됨.

```jsx
useEffect(() => {
  // componentDidMount와 동일한 시점에 작동함.
  // client에서만 작동함.
}, []);

// client에서만 컴포넌트를 렌더링하고 싶다면,
const [client, setClient] = ~useEffect(() => {
  setClient(true);
}, []);
// 와 같이 활용할 수 있음
```

**proces.browser 변수**

- 조건에 따라서 스크립트와 컴포넌트를 조건별로 실행.
- Vercel 에서 해당 지원은 곧 중단 될 것.
- 대신 typeof window === ‘undefined’ ? ‘서버’ : ‘클라이언트’ 로 구별

**동적 컴포넌트 로딩: dynamic**

- 코드를 브라우저 환경에서만 작동시킬 수 있음

```jsx
const Highlight = dynamic(() => import('../component'), { ssr: false });

function DynamicPage() {
  return (
    <div>
      <Highlight /> // 해당 컴포넌트는 Client에서만 렌더링 됨.
    </div>
  );
}
```

- CSR은 동적 웹 페이지를 만들 때, SSR보다 더 좋은 선택이 될 수 있음.
- SEO가 필요없는 경우에, 그냥 JS코드를 먼더 다운로드한 다음 클라이언트에서 필요한 데이터를 직접 가져가도록 만들자

**관리자 페이지, 비공개 프로필은 어떤 전략?**

- Client에 정적 페이지를 제공하면서 필요한 데이터를 한번에 브라우저로 전송 가능?

## 정적 사이트 생성(SSG)

- 일부 또는 전체 페이지를 빌드 시점에 미리 렌더링
- HTML 마크업 형태로 제공
- **하이드레이션** 덕분에, 여전히 상호작용 가능

**장점**

- 쉬운 확장
  - CDN을 통해 파일을 제공하거나 캐시에 저장하기 쉬움.
- 뛰어난 성능
  - 서버 쪽에 데이터를 요구하지도 않음. 그냥 모든게 다 있음.
  - 각 요청별로 발생할 수 있는 지연 시간 최소화
- 더 안전한 API요청
  - 클라이언트에서 외부 API 호출 X

**ISR**

- SSG인데, 주기적으로 Next가 정적 페이지를 재생성 함.
- 사용예시
  - 특정 페이지에서 엄청나게 많은 데이터를 가져오는 대쉬보드 → CSR에서는 데이터 페칭에 수초가 소요.
  - 만약 데이터가 자주 변하지 않는다면 SSG와 ISR을 사용해서 데이터를 캐싱할 수 있음.
- **getStaticProps** + **revalidate**

```jsx
export async function getStaticProps() {
  // ~
  return {
    props: {},
    revalidate: 600, // 10분 마다
  };
}
```

- 정적 페이지를 생성하는 시점
  - 빌드시
  - 10분 이후, 새로운 요청이 들어온 시점 (해당 요청에 대해서는 기존의 static 파일 전달)
  - Next는 ISR을 최대한 지연시켜서 처리함, 10분후에 요청이 없다면 먼저 재생성하지는 않음.

# 📌 Nextjs 기초와 내장 컴포넌트

**동적 웹 사이트 개발**

- 라우팅 시스템, 클라이언트 네비게이션, 이미지 최적화, 메타데이터 처리
- \_app.js, \_document.js

### **라우터**

- 기존의 리액트에서 활용하던 라우터 라이브러리 들은 클라이언트 환경에서만 활용 가능.
- Nextjs에서는 **파일시스템 기반 페이지와 라우팅**을 제공함

**사용예시 @페이지**

```jsx
// pages/greet/[name].js

export async function getServerSideProps({ params }) {
  const { name } = params;
  return {
    props: { name },
  };
}
```

**사용예시 @컴포넌트**

```jsx
import { useRouter } from 'next/router';

function Greet() {
  const { query } = useRouter();
  return <>{query.name}</>;
}
```

### 클라이언트 내비게이션: Link

- NextJS는 기본적으로 현재 화면에 표시되는 페이지의 모든 Link에 대해 연결된 부분 또는 페이지를 **미리 읽어옴!** → 확인해보기

```jsx
<Link href="/naver" preload={false}></Link> // 미리 불러오지 않음.
```

- router.push VS Link
  - router.push 는 Link처럼 연결된 페이지를 미리 불러오지 못함.

### 정적 자원 제공

- /public 디렉토리 안에 있는 모든 파일은 Next가 정적 자원으로 간주하고 제공함.
- 최적화 되지 않은 이미지를 제공하는 것은 UX에 나쁜 영향을 줌
  - 누적 레이아웃 이동(CLS) → 레이아웃 변경
- 자동 이미지 최적화
  - 클라이언트가 이미지를 요구할 때, 최적화를 진행함.
  - 화면 크기별로 이미지를 조절할 수 있음 → srcset 활용 → 외부 이미지일 경우 next.config 파일의 images.domains에 호스트명을 추가해야 함.
  - 클라이언트가 요청한 사이즈에 맞도록 이미지 파일 제공
  - 지원되는 브라우저에서는 자동으로 Webp 이미지 파일 변환 및 제공

**외부 서비스를 통한 자동 이미지 최적화**

- 기본으로 실행되고 있는 서버에서 자동으로 이미지를 최적화 함 → **서버 부하**
- 만약, 서버의 성능이 낮다면 → 외부 서비스를 통해 자동 이미지 최적화 위임

```jsx
// next.config.js
module.exports = {
	images: {
		loader: 'akamai', // 기본으로는 Vercel, 다른 외부 서비스도 있음
		domains: ['images.unsplash.com']
	}
}

// CustomImage
const loader = ({src, width, quality}) => {
	// loader에 다른 서비스를 붙이기 위해서는 해당 서비스들의 API를 참고할 것.
	return `https://test.com/${src}?w=${width}&q=${quality}`
}

function CustomImage(){
	return (
		<Image
			loader={loader}
			src="/myimage.jpg"
			// ~
		>
	)
}
```

### 메타데이터

- 페이스북에서는 OG라는 프로토콜을 통해 어떤 데이터를 카드에 표시할지 파악함.
- 메타 데이터가 있어야 SEO최적화 좋음

**중복된 메타데이터**

- 한 페이지에서 다수의 컴포넌트가 Head 정보를 변경하고자 한다면, 다음과 같이 할 수 있음
  - 원래는 title이 여러개가 생성되지만, key값이 있으면 변경이 됨.

```jsx
<title key="htmlTitle">타이틀 고유 값</title>
```

### 공통 메타 태그 그룹

```jsx
import Head from 'next/head';

function PostMeta(props) {
  return (
    <Head>
      <title> {props.title} </title>
      <meta name="description" content={props.subtitle} />

      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.subtitle} />
      <meta property="og:image" content={props.image} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content={props.image} />
    </Head>
  );
}

export default PostMeta;

// 컴포넌트
<PostMeta {...post}>
```

# \_app와 \_document

- 페이지 초기화 과정에 작업이 필요한 경우
- 페이지를 렌더링할 때마다 렌더링한 HTML을 클라이언트에 보내기 전에 특정 작업을 해야하는 경우
- getServerSideProps나 getStaticProps와 같은 함수를 사용해서 데이터를 불러오는 용도로 사용할 수 없음 → getInitialProps를 활용할 수 있으나 해당 함수 사용시, Next가 모든 페이지를 서버에서 렌더링 → 동적 페이지에 대한 정적 최적화를 진행하지 않음.
- 주된 사용목적은 페이지 이동시, 서로 다른 페이지 간 상태 유지(테마, 장바구니 등), 전역 스타일 추가, 페이지 레이아웃 관리, 페이지 속성에 데이터 추가 하는 것이 목적
- HTML 태그 등의 커스텀은 불가 → \_document에서 작업

**\_app**

```jsx
function MyApp({ Component, pageProps }) {
  // 페이지 컴포넌트와 그 페이지로 가는 props를 반환함.
  return <Component {...pageProps} />;
}
```

- 테마 세팅 with **Context**

```jsx
// components/themeContext.js
import { createContext } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => null,
});

export default ThemeContext;
```

```jsx
// _app.js
import { useState } from 'react';
import ThemeContext from '../components/themeContext';
import Navbar from '../components/Navbar';

const themes = {
  dark: {
    background: 'black',
    color: 'white',
  },
  light: {
    background: 'white',
    color: 'black',
  },
};

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        style={{
          width: '100%',
          minHeight: '100vh',
          ...themes[theme],
        }}
      >
        <Navbar />
        <Component {...pageProps} />
      </div>
    </ThemeContext.Provider>
  );
}

export default MyApp;
```

```jsx
// Navbar.js
import { useContext } from 'react';
import Link from 'next/link';
import themeContext from './themeContext';

function Navbar() {
  const { toggleTheme, theme } = useContext(themeContext);
  const newThemeName = theme === 'dark' ? 'light' : 'dark';
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
      }}
    >
      <div>My Website</div>
      <div>
        <Link href="/">Home </Link>
        <Link href="/about">About </Link>
        <Link href="/contacts">Contacts </Link>
        <button onClick={toggleTheme}>Set {newThemeName} theme</button>
      </div>
    </div>
  );
}

export default Navbar;
```

**\_document**

- <head><html><body> 와 같은 기본적인 HTML태그를 정의할 필요 X

```jsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  // 하기 함수 호출시, 동적 페이지에 대한 최적화 불가.
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  // 하기 주요 4대 컴포넌트는 항상 있어야 해.
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```
