
from knowledge_base import CAREER_KNOWLEDGE_BASE


def analyze_career_answers(answers):
    results = []

    normalized_answers = [
        str(answer).strip().lower()
        for answer in answers
        if answer
    ]

    for career_name, details in CAREER_KNOWLEDGE_BASE.items():
        keywords = [
            keyword.lower()
            for keyword in details["keywords"]
        ]

        matched_keywords = []

        for answer in normalized_answers:
            for keyword in keywords:
                if keyword in answer or answer in keyword:
                    if keyword not in matched_keywords:
                        matched_keywords.append(keyword)

        total_keywords = len(set(keywords))
        match_count = len(matched_keywords)

        percentage = round(
            (match_count / total_keywords) * 100
        ) if total_keywords else 0

        results.append({
            "career": career_name,
            "match_percentage": percentage,
            "matched_keywords": matched_keywords,
            "skills": details["skills"],
            "description": details["description"],
        })

    results.sort(
        key=lambda item: item["match_percentage"],
        reverse=True
    )

    return results
