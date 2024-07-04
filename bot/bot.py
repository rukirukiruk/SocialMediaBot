import os
from datetime import datetime
import requests
from dotenv import load_dotenv
import sqlite3

load_dotenv()

FACEBOOK_API_URL = "https://graph.facebook.com/v13.0"
TWITTER_API_URL = "https://api.twitter.com/2"

FACEBOOK_ACCESS_TOKEN = os.getenv("FACEBOOK_ACCESS_TOKEN")
TWITTER_BEARER_TOKEN = os.getenv("TWITTER_BEARER_TOKEN")

social_media_db_connection = sqlite3.connect("social_media_bot.db")
social_media_db_cursor = social_media_db_connection.cursor()

social_media_db_cursor.execute('''
    CREATE TABLE IF NOT EXISTS posts
    (id INTEGER PRIMARY KEY, content TEXT, post_time TEXT, platform TEXT, status TEXT)
''')
social_media_db_connection.commit()

def submit_post_to_platform(content, platform):
    try:
        if platform.lower() == "facebook":
            post_url = f"{FACEBOOK_API_URL}/me/feed"
            post_params = {"message": content, "access_token": FACEBOOK_ACCESS_TOKEN}
            post_response = requests.post(post_url, params=post_params)
            post_response.raise_for_status()
        elif platform.lower() == "twitter":
            post_url = f"{TWITTER_API_URL}/tweets"
            post_headers = {"Authorization": f"Bearer {TWITTER_BEARER_TOKEN}"}
            post_payload = {"text": content}
            post_response = requests.post(post_url, headers=post_headers, json=post_payload)
            post_response.raise_for_status()
        else:
            raise ValueError("Unsupported platform")

    except requests.exceptions.RequestException as req_exception:
        return {"error": str(req_exception)}

    except Exception as generic_exception:
        return {"error": str(generic_exception)}

    return post_response.json()

def schedule_post_for_publication(content, publication_time, platform):
    try:
        dt_publication_time = datetime.strptime(publication_time, "%Y-%m-%d %H:%M:%S")
        if datetime.now() >= dt_publication_time:
            raise ValueError("Publication time must be in the future")

        social_media_db_cursor.execute("INSERT INTO posts (content, post_time, platform, status) VALUES (?, ?, ?, ?)",
                                       (content, publication_time, platform, "scheduled"))
        social_media_db_connection.commit()
    except ValueError as val_exception:
        print(f"Error: {val_exception}")
    except Exception as generic_exception:
        print(f"Error: {generic_exception}")

def retrieve_scheduled_posts():
    try:
        social_media_db_cursor.execute("SELECT * FROM posts WHERE status='scheduled'")
        return social_media_db_cursor.fetchall()
    except Exception as exception:
        print(f"Error fetching scheduled posts: {exception}")
        return []

def publish_scheduled_posts():
    posts_to_publish = retrieve_scheduled_posts()
    for post in posts_to_publish:
        post_id, content, post_time, platform, status = post
        try:
            if datetime.strptime(post_time, "%Y-%m-%d %H:%M:%S") <= datetime.now():
                publication_response = submit_post_to_platform(content, platform)
                if "error" not in publication_response:
                    social_media_db_cursor.execute("UPDATE posts SET status=? WHERE id=?", ("posted", post_id))
                    social_media_db_connection.commit()
                print(f"Posted: {publication_response}")
        except Exception as post_exception:
            print(f"Error posting scheduled post: {post_exception}")

def retrieve_platform_analytics(platform):
    try:
        if platform.lower() == "facebook":
            return {"total_posts": 10, "likes": 150, "comments": 40}
        elif platform.lower() == "twitter":
            return {"total_tweets": 5, "retweets": 100, "likes": 200}
        else:
            raise ValueError("Unsupported platform")
    except ValueError as val_exception:
        print(f"Error: {val_exception}")
        return None

if __name__ == "__main__":
    try:
        schedule_post_for_publication("Scheduled post for Twitter", "2023-10-15 18:30:00", "twitter")
        publish_scheduled_posts()
        print(retrieve_platform_analytics("facebook"))

    except Exception as runtime_exception:
        print(f"Runtime Error: {runtime_exception}")