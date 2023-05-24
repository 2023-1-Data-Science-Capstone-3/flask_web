import random
import threading
import time
from app import app, db, Count

def update_count_periodically():
    with app.app_context():
        while True:
            # 주소 고정, 첫번째 행의 can, pet 개수 랜덤 업데이트
            address = "서울특별시 구로구 가리봉동 121-30"
            lat= 37.482896
            lng=126.886887
            count = Count.query.first()
            if count:
                count.can_count = random.randint(0, 10)
                count.pet_count = random.randint(0, 10)
                db.session.commit()

            time.sleep(5)  # 5초 대기

if __name__ == '__main__':
    # 쓰레드 실행
    t = threading.Thread(target=update_count_periodically)
    t.start()
