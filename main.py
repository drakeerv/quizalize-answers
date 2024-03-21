import requests
import base64
import json

QUIZ_ID = input("Enter the quiz ID: ")

HEADERS = {
    "content-type": "application/json",
}

json_data = {
    "variables": {
        "contentId": base64.b64encode(b"Content:" + QUIZ_ID.encode()).decode()
    },
    "query": "query ContentPreviewModalRendererQuery($contentId:ID!){content:node(id:$contentId){... on Content{payload}}}",
}

response = requests.post("https://app.quizalize.com/ql/apollo", headers=HEADERS, json=json_data).json()
questions = json.loads(response["data"]["content"]["payload"])["questions"]

with open("questions.json", "w") as file:
    json.dump(questions, file, indent=4)

print("Questions saved to questions.json")