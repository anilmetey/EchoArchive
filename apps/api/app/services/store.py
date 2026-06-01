from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import List

from app.schemas import AiReport, Capsule, CapsuleStatus

DATA_DIR = Path("apps/api/data")
DATA_FILE = DATA_DIR / "capsules.json"


def _seed_capsules() -> List[Capsule]:
    now = datetime.now(timezone.utc)
    return [
        Capsule(
            id="first-year",
            userId="demo-user",
            userName="Demo User",
            title="First year after the leap",
            message="I hope you remember how much courage it took to begin. You were scared, but you still chose motion.",
            unlockAt=datetime(2027, 5, 31, 9, 0, tzinfo=timezone.utc),
            createdAt=now,
            status=CapsuleStatus.locked,
            visibility="private",
            mediaType="audio",
            mediaName="voice-note-demo.mp3",
            aiReport=AiReport(
                mood="Hopeful, tense, determined",
                themes=["career", "identity", "courage"],
                presentSelf="You are in a threshold season: alert, ambitious, and trying to prove that momentum can be built on uncertain ground.",
                futureAdvice="Do not measure this year only by outcomes. Measure it by the promises you kept when nobody was watching.",
                revealSummary="Past you left a small flare for a future day: proof that the beginning mattered."
            )
        ),
        Capsule(
            id="family-table",
            userId="demo-user",
            userName="Demo User",
            title="The table at home",
            message="Record this: mom laughing at the end of the table, everyone talking over each other, and for once nobody rushing away.",
            unlockAt=datetime(2026, 1, 1, 12, 0, tzinfo=timezone.utc),
            createdAt=datetime(2023, 12, 31, 22, 10, tzinfo=timezone.utc),
            status=CapsuleStatus.unlocked,
            visibility="anonymous_public",
            mediaType="audio",
            mediaName="family-table-demo.mp3",
            aiReport=AiReport(
                mood="Warm, grateful, protective",
                themes=["family", "belonging", "memory"],
                presentSelf="You were noticing the ordinary scene while it was still happening, which means some part of you already knew it mattered.",
                futureAdvice="Make more records of the small rooms where you felt safe. They become maps later.",
                revealSummary="An ordinary family moment preserved before time had a chance to make it rare."
            )
        ),
        Capsule(
            id="launch-day",
            userId="demo-user",
            userName="Demo User",
            title="Before the product launch",
            message="I know you are nervous. Ship it anyway. People cannot love, critique, or remember the thing you keep hidden forever.",
            unlockAt=datetime(2026, 11, 3, 10, 0, tzinfo=timezone.utc),
            createdAt=now,
            status=CapsuleStatus.locked,
            visibility="private",
            mediaType="video",
            mediaName="launch-demo.mp4",
            aiReport=AiReport(
                mood="Electric, anxious, ambitious",
                themes=["career", "shipping", "confidence"],
                presentSelf="You are holding a lot of pressure, but underneath it is a clean desire to finally let your work meet the world.",
                futureAdvice="Do not edit the bravery out of your own story just because the launch was imperfect.",
                revealSummary="This capsule carries the charge of someone standing right before a door."
            )
        ),
        Capsule(
            id="letter-after-breakup",
            userId="demo-user",
            userName="Anonymous",
            title="After the breakup",
            message="You think this version of loneliness will last forever. It will not. One day you will be thankful you did not shrink to keep someone.",
            unlockAt=datetime(2025, 9, 12, 8, 0, tzinfo=timezone.utc),
            createdAt=datetime(2020, 9, 12, 8, 0, tzinfo=timezone.utc),
            status=CapsuleStatus.unlocked,
            visibility="anonymous_public",
            mediaType="photo",
            mediaName="breakup-letter-demo.jpg",
            aiReport=AiReport(
                mood="Heartbroken, honest, quietly strong",
                themes=["love", "self-worth", "healing"],
                presentSelf="You were grieving, but the message shows a stubborn instinct for dignity even before the pain had loosened.",
                futureAdvice="Let tenderness return without mistaking it for surrender.",
                revealSummary="A note from the ache, written by someone who had not yet seen how much room would open."
            )
        ),
        Capsule(
            id="ten-year-student",
            userId="demo-user",
            userName="Anonymous",
            title="Ten years from the dorm room",
            message="I do not know if we became impressive. I hope we became kind. I hope we still ask strange questions at 2 a.m.",
            unlockAt=datetime(2024, 10, 5, 2, 0, tzinfo=timezone.utc),
            createdAt=datetime(2014, 10, 5, 2, 0, tzinfo=timezone.utc),
            status=CapsuleStatus.unlocked,
            visibility="anonymous_public",
            mediaType="video",
            mediaName="dorm-room-demo.mp4",
            aiReport=AiReport(
                mood="Young, curious, a little dramatic",
                themes=["identity", "friendship", "future"],
                presentSelf="You were less interested in certainty than in staying alive to possibility, which is its own kind of wisdom.",
                futureAdvice="Do not become too polished to recognize the odd, bright person who wrote this.",
                revealSummary="A ten-year echo from a room full of cheap lights, big questions, and borrowed confidence."
            )
        ),
        Capsule(
            id="rainy-night-code",
            userId="demo-user",
            userName="Demo User",
            title="Rainy night code",
            message="It is 1:42 a.m. and the build finally works. Remember this exact feeling: tired, ridiculous, and proud.",
            unlockAt=datetime(2026, 12, 18, 1, 42, tzinfo=timezone.utc),
            createdAt=now,
            status=CapsuleStatus.locked,
            visibility="private",
            mediaType="photo",
            mediaName="rainy-code-demo.jpg",
            aiReport=AiReport(
                mood="Exhausted, playful, proud",
                themes=["craft", "career", "persistence"],
                presentSelf="You are building proof that stubborn attention can turn confusion into something that runs.",
                futureAdvice="Remember the version of you who stayed with the problem before it became easy to explain.",
                revealSummary="A late-night artifact from the messy middle of learning."
            )
        ),
        Capsule(
            id="airport-goodbye",
            userId="demo-user",
            userName="Anonymous",
            title="Airport goodbye",
            message="I cried after security and then bought terrible coffee. Leaving is strange: half grief, half proof that movement is possible.",
            unlockAt=datetime(2022, 12, 1, 7, 10, tzinfo=timezone.utc),
            createdAt=datetime(2019, 12, 1, 7, 10, tzinfo=timezone.utc),
            status=CapsuleStatus.unlocked,
            visibility="anonymous_public",
            mediaType="video",
            mediaName="airport-demo.mp4",
            aiReport=AiReport(
                mood="Raw, courageous, homesick",
                themes=["travel", "family", "change"],
                presentSelf="You were learning that choosing a new life can coexist with mourning the old one.",
                futureAdvice="Do not flatten brave choices into easy ones. Both truths can stay.",
                revealSummary="A departure note that understood movement as both ache and arrival."
            )
        )
    ]


def _ensure_data_file() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if not DATA_FILE.exists():
        save_capsules(_seed_capsules())


def _refresh_status(capsule: Capsule) -> Capsule:
    if capsule.unlockAt <= datetime.now(timezone.utc):
        capsule.status = CapsuleStatus.unlocked
    return capsule


def list_capsules() -> List[Capsule]:
    _ensure_data_file()
    data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    capsules = [_refresh_status(Capsule(**item)) for item in data]
    existing_ids = {capsule.id for capsule in capsules}
    for capsule in _seed_capsules():
        if capsule.id not in existing_ids:
            capsules.append(_refresh_status(capsule))
    save_capsules(capsules)
    return capsules


def save_capsules(capsules: List[Capsule]) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    DATA_FILE.write_text(
        json.dumps([json.loads(capsule.model_dump_json()) for capsule in capsules], indent=2),
        encoding="utf-8"
    )


def add_capsule(capsule: Capsule) -> Capsule:
    capsules = list_capsules()
    capsules.insert(0, capsule)
    save_capsules(capsules)
    return capsule


def get_capsule(capsule_id: str) -> Capsule | None:
    for capsule in list_capsules():
        if capsule.id == capsule_id:
            return capsule
    return None
