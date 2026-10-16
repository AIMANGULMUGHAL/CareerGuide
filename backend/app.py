
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

from inference_engine import analyze_career_answers

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return jsonify({
        "message": "CareerGuide API is running!"
    })


@app.route("/api/career-guidance", methods=["POST"])
def career_guidance():
    data = request.get_json(silent=True) or {}

    interests = data.get("interests", [])
    skills = data.get("skills", [])

    if not isinstance(interests, list) or not isinstance(skills, list):
        return jsonify({
            "error": "Interests and skills must be lists."
        }), 400

    # Combine the answers submitted by the frontend.
    answers = interests + skills

    recommendations = analyze_career_answers(answers)

    return jsonify({
        "message": "Career recommendations generated successfully.",
        "interests": interests,
        "skills": skills,
        "recommendations": recommendations[:3]
    })




if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=False
    )
