**2071003 황태진**  

맡은 역할
- 전체적인 UI 틀 (초기 화면, 로그인 화면, 매뉴얼 화면, 홈 화면, 알림 화면, 프로필 화면) 설계함
- 초기 화면, 로그인 화면, 매뉴얼 화면, 홈 화면, 프로필 화면에 대한 기능을 구현함  
  
기억나는 점
- 백엔드와 처음으로 같이 협업하는 프로젝트라 기억이 많이 남는다.
- 이번에 개발하면서 홈 화면에 FlatList 컴포넌트를 사용하여 강의와 과제 마감 기한으로 날짜순으로 정렬하는 경험을 쌓았다.
- react-native-push-notification 라이브러리를 이용해서 알림 기능에 대한 경험을 해보았다.

---
# H-Noti-Final

H-Noti-Final 프로젝트의 초기 설정을 위한 단계별 가이드입니다.

## 시작하기

다음은 로컬 환경에서 이 프로젝트를 설정하고 실행하는 방법입니다.

### 요구 사항

- Node.js가 설치되어 있어야 합니다.
- Git이 설치되어 있어야 합니다.
- Expo CLI가 설치되어 있어야 합니다.

### 설치

1. 터미널을 열고 원하는 저장소로 이동합니다.

    ```bash
    cd /path/to/your/preferred/directory
    ```

2. 저장소를 클론합니다.

    ```bash
    git clone https://github.com/Han-NOTI/H-Noti-Final
    ```

3. 프로젝트 디렉토리로 이동합니다.

    ```bash
    cd H-Noti-Final
    ```

4. npm을 사용하여 필요한 패키지를 설치합니다.

    ```bash
    npm install
    ```

5. `react-native-push-notification` 패키지를 설치합니다.

    ```bash
    npm install react-native-push-notification
    ```

6. 함수 디렉토리로 이동합니다.

    ```bash
    cd functions
    ```

7. 함수 디렉토리 내에서 필요한 패키지를 설치합니다.

    ```bash
    npm install
    ```

8. 루트 디렉토리로 돌아갑니다.

    ```bash
    cd ..
    ```

9. Expo 서버를 시작합니다.

    ```bash
    npx expo start
    ```

이 단계들이 끝나면 프로젝트가 로컬 환경에서 성공적으로 실행됩니다.
