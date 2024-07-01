import os
from datetime import datetime
import requests
from dotenv import load_dotenv
import sqlite3

load_dotenv()

FACEBOOK_API_URL = "https://graph.facebook.com/v13.0"
TWITTER_API_URL = "https://api.twitter.com/2"

FACEBOOK_ACCESS_TOKEN = os.getenv("FACEBOOK_ACCESS_TOKEN")
TWITTER_BEARer_TOKEN = os.getenv("TWITTER_BEARER_TOKEN")

db_connection = sqlite3.connect("social_media_bot.db")
db_cursor = db_connection.cursor()

db_cursor.execute('''CREATE TABLE IF NOT EXISTS posts
                     (id INTEGER PRIMARY KEY, content TEXT, post_time TEXT, platform TEXT, status TEXT)''')
db_connection.commit()

def create_post(content, platform):
    if platform.lower() == "facebook":
        url = f"{FACEBOOK_API_URL}/me/feed"
        params = {
            "message": content,
            "access_token": FACEBOOK_ACCESS_TOKEN
        }
        response = requests.post(url, params=params)
        return response.json()
    elif platform.lower() == "twitter":
        url = f"{TWITTER_API_URL}/tweets"
        headers = {"Authorization": f"Bearer {TWITTER_BEARer_TOKEN}"}
        payload = {"text": content}
        response = requests.post(url, headers=headers, json=payload)
        return response.json()

    raise ValueError("Unsupported platform")

def schedule_post(content, post_time, platform):
    dt_post_time = datetime.strptime(post_time, "%Y-%m-%d %H:%M:%S")
    if datetime.now() >= dt_post_time:
        raise ValueError("Post time must be in the future")

    db_cursor.execute("INSERT INTO posts (content, post_time, platform, status) VALUES (?, ?, ?, ?)",
                      (content, post_time, platform, "scheduled"))
    db_connection.commit()

def fetch_scheduled_posts():
    db_cursor.execute("SELECT * FROM posts WHERE status='scheduled'")
    return db_cursor.fetchall()

def post_scheduled_posts():
    scheduled_posts = fetch_scheduled_posts()
    for post in scheduled_posts:
        post_id, content, post_time, platform, status = post
        if datetime.strptime(post_time, "%Y-%m-%d %H:%M:%S") <= datetime.now():
            response = create_post(content, platform)
            db_cursor.execute("UPDATE posts SET status=? WHERE id=?", ("posted", post_id))
            db_connection.commit()
            print(f"Posted: {response}")

def fetch_analytics(platform):
    if platform.lower() == "facebook":
        return {"total_posts": 10, "likes": 150, "comments": 40}
    elif platform.lower() == "twitter":
        return {"total_tweets": 5, "retweets": 100, "likes": 200}

    raise ValueError("Unsupported platform")

if __name__ == "__main__":
    try:
        schedule_post("Scheduled post for Twitter", "2023-10-15 18:30:00", "twitter")
        post_scheduled_posts()
        print(fetch_analytics("facebook"))
        
    except Exception as e:
        print(f"Error: {e}")