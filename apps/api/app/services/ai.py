import json
from anthropic import Anthropic
from app.config import settings
from app.schemas import AiReport


SYSTEM_PROMPT = """
You analyze a time capsule message for EchoArchive.
Return strict JSON with these keys:
mood, themes, presentSelf, futureAdvice, revealSummary.
Keep the tone warm, specific, and emotionally intelligent.
"""


def fallback_report(message: str) -> AiReport:
    lowered = message.lower()
    themes = []
    for keyword, theme in [
        ("work", "career"),
        ("job", "career"),
        ("love", "love"),
        ("family", "family"),
        ("build", "craft"),
        ("future", "future"),
        ("scared", "courage"),
        ("hope", "hope")
    ]:
        if keyword in lowered and theme not in themes:
            themes.append(theme)

    if not themes:
        themes = ["identity", "reflection", "growth"]

    return AiReport(
        mood="Reflective, hopeful, a little uncertain",
        themes=themes[:4],
        presentSelf=(
            "You are capturing a version of yourself that is trying to turn the present into something the future can hold."
        ),
        futureAdvice=(
            "When this opens, look for the thread that stayed true, not just the goals that changed."
        ),
        revealSummary=(
            "This capsule reads like a careful note from someone learning how to trust time."
        )
    )


async def analyze_capsule(message: str) -> AiReport:
    if not settings.anthropic_api_key:
        return fallback_report(message)

    client = Anthropic(api_key=settings.anthropic_api_key)
    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=700,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": message}]
    )
    text = response.content[0].text
    data = json.loads(text)
    return AiReport(**data)
