from fastapi import FastAPI, UploadFile, File
import fitz  # PyMuPDF
import docx
import spacy
import re

nlp = spacy.load("en_core_web_sm")
app = FastAPI()

SKILLS = ["python", "java", "c++", "react", "node", "sql", "mongodb", "html", "css", "javascript"]

def extract_text(file):
    if file.filename.endswith(".pdf"):
        pdf = fitz.open(stream=file.file.read(), filetype="pdf")
        return " ".join(page.get_text() for page in pdf)
    else:
        doc = docx.Document(file.file)
        return " ".join(p.text for p in doc.paragraphs)

def extract_data(text):
    text_lower = text.lower()

    skills = [s for s in SKILLS if s in text_lower]

    degree = "Unknown"
    if "b.tech" in text_lower or "bachelor" in text_lower:
        degree = "B.Tech"
    if "m.tech" in text_lower or "master" in text_lower:
        degree = "M.Tech"

    experience = re.findall(r"(\d+)\+?\s*years", text_lower)
    experience = experience[0] if experience else "0"

    return {
        "skills": skills,
        "degree": degree,
        "experience_years": experience
    }

@app.post("/parse-cv")
async def parse_cv(file: UploadFile = File(...)):
    text = extract_text(file)
    data = extract_data(text)
    return data
