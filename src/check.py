import sys
sys.stdout.reconfigure(encoding='utf-8')

from flask import Flask, jsonify, request
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# 로그인 함수
def login_to_hansung(session, username, password):
    login_url = "https://learn.hansung.ac.kr/login/index.php"
    payload = {
        "username": username,
        "password": password,
        "loginbutton": "로그인",
        "rememberusername": 1,
    }
    response = session.post(login_url, data=payload)

    # 디버깅: 로그인 응답 HTML 출력
    print("로그인 응답 HTML:", response.text[:500])

    if "로그아웃" in response.text:
        return True
    return False

# 현재 주차 계산
def get_current_week():
    start_date = datetime(2024, 9, 2)  # 학기 시작일
    today = datetime.now()
    delta = today - start_date
    return (delta.days // 7) + 1

# 강의 목록 가져오기
def get_courses(session):
    main_url = "https://learn.hansung.ac.kr/"
    response = session.get(main_url)

    # 디버깅: 강의 목록 HTML 출력
    print("강의 목록 HTML:", response.text[:500])

    soup = BeautifulSoup(response.text, "html.parser")
    courses = []
    course_elements = soup.select("ul.my-course-lists li")

    for course_element in course_elements:
        label = course_element.select_one("div.label.label-course")
        if not label or "커뮤니티" in label.text:
            continue

        title_element = course_element.select_one("div.course-title h3")
        link_element = course_element.select_one("a.course_link")

        if title_element and link_element:
            courses.append({
                "title": title_element.text.strip(),
                "link": link_element["href"]
            })
    return courses

# 주차별 강의 정보 가져오기
def fetch_weekly_videos(session, course_url, current_week):
    try:
        attendance_url = f"{course_url}/report/ubcompletion/progress.php"
        response = session.get(attendance_url)

        # 디버깅: 출석부 HTML 확인
        print("출석부 HTML:", response.text[:500])

        soup = BeautifulSoup(response.text, "html.parser")
        table = soup.find("table", class_="user_progress_table")

        if not table:
            return {"error": "테이블을 찾을 수 없습니다. HTML 구조를 확인하세요."}

        rows = table.find("tbody").find_all("tr")
        videos = []

        for row in rows:
            cells = row.find_all("td")
            if len(cells) < 5:
                continue

            week_number = cells[0].text.strip()
            if not week_number.isdigit() or int(week_number) != current_week:
                continue

            video_title = cells[1].text.strip()
            attendance_status = cells[4].text.strip()

            if attendance_status == "X":
                videos.append({"title": video_title, "viewed": False})

        return videos if videos else {"error": "이번 주차 미수강 강의 없음"}
    except Exception as e:
        return {"error": f"예외 발생: {str(e)}"}

# 과제 정보 가져오기
def fetch_assignments(session, course_url):
    try:
        response = session.get(course_url)

        # 디버깅: 과제 섹션 HTML 확인
        print("과제 섹션 HTML:", response.text[:500])

        soup = BeautifulSoup(response.text, "html.parser")
        current_week_section = soup.find("li", class_="section.main.current")

        if not current_week_section:
            return {"error": "이번 주차 섹션을 찾을 수 없습니다."}

        assignments = []
        assignment_rows = current_week_section.select("li.activity.assign")
        for row in assignment_rows:
            title_element = row.find("span.instancename")
            link_element = row.find("a", href=True)

            if title_element and link_element:
                assignments.append({
                    "title": title_element.text.strip(),
                    "link": link_element["href"]
                })
        return assignments
    except Exception as e:
        return {"error": f"예외 발생: {str(e)}"}

@app.route('/api/login', methods=['POST'])
def api_login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    session = requests.Session()
    if not login_to_hansung(session, username, password):
        return jsonify({"error": "로그인 실패"}), 401

    courses = get_courses(session)
    if not courses:
        return jsonify({"error": "강의 목록을 가져올 수 없습니다."}), 404

    current_week = get_current_week()
    results = []

    for course in courses:
        print(f"강의명: {course['title']} - 링크: {course['link']}")  # 디버깅용

        videos = fetch_weekly_videos(session, course["link"], current_week)
        assignments = fetch_assignments(session, course["link"])

        results.append({
            "course_title": course["title"],
            "videos": videos,
            "assignments": assignments
        })
    return jsonify(results)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
