import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import re

client = MongoClient("mongodb://localhost:27017")
db = client.smartjob
jobs = db.jobs

url = "https://ssc.nic.in"
html = requests.get(url).text
soup = BeautifulSoup(html, "html.parser")

for link in soup.find_all("a"):
    text = link.get_text().lower()
    if "cgl" in text or "chsl" in text:
        job = {
            "job_title": link.get_text(),
            "apply_url": url + link.get("href"),
            "qualification": "Graduate",
            "min_age": 18,
            "max_age": 32,
            "experience_required": 0,
            "skills_required": [],
            "category_relaxation": {"OBC":3,"SC":5,"ST":5}
        }

        jobs.update_one(
            {"job_title": job["job_title"]},
            {"$set": job},
            upsert=True
        )

print("SSC jobs updated")
