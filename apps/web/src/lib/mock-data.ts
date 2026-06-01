import type { Capsule } from "@/types/capsule";

export const capsules: Capsule[] = [
  {
    id: "first-year",
    title: "First year after the leap",
    message:
      "I hope you remember how much courage it took to begin. You were scared, but you still chose motion.",
    unlockAt: "2027-05-31T09:00:00.000Z",
    createdAt: "2026-05-31T09:00:00.000Z",
    status: "locked",
    visibility: "private",
    mediaType: "audio",
    aiReport: {
      mood: "Hopeful, tense, determined",
      themes: ["career", "identity", "courage"],
      presentSelf:
        "You are in a threshold season: alert, ambitious, and trying to prove to yourself that momentum can be built on uncertain ground.",
      futureAdvice:
        "Do not measure this year only by outcomes. Measure it by the promises you kept when nobody was watching.",
      revealSummary:
        "Past you left a small flare for a future day: proof that the beginning mattered."
    }
  },
  {
    id: "twenty-nine",
    title: "Open when I turn 29",
    message:
      "Be softer with yourself. Build the life, yes, but do not become a machine while building it.",
    unlockAt: "2026-02-14T09:00:00.000Z",
    createdAt: "2024-02-14T09:00:00.000Z",
    status: "unlocked",
    visibility: "anonymous_public",
    mediaType: "photo",
    aiReport: {
      mood: "Reflective, tender, slightly restless",
      themes: ["self-worth", "love", "pace"],
      presentSelf:
        "You were learning that discipline without gentleness turns into a room with no windows.",
      futureAdvice:
        "Keep the ambition, but give it a home inside a life you can actually feel.",
      revealSummary:
        "The message reads like a hand on your shoulder from someone who knew you before the next layer arrived."
    }
  },
  {
    id: "five-year-vault",
    title: "Five year vault",
    message:
      "If you are reading this, ask yourself: did you keep making things that felt like you?",
    unlockAt: "2031-05-31T09:00:00.000Z",
    createdAt: "2026-05-31T09:00:00.000Z",
    status: "locked",
    visibility: "private",
    mediaType: "video",
    aiReport: {
      mood: "Curious, focused, quietly intense",
      themes: ["creativity", "legacy", "craft"],
      presentSelf:
        "You are thinking about time as a material, not just a deadline. That is the core of this capsule.",
      futureAdvice:
        "Protect the parts of your work that still surprise you. They are usually where the real signal lives.",
      revealSummary:
        "A long-range note from a version of you that wanted the future to stay strange in a good way."
    }
  },
  {
    id: "summer-reset",
    title: "Summer reset note",
    message:
      "You promised to stop confusing exhaustion with progress. I hope you took more walks, called people back, and let the quiet days count.",
    unlockAt: "2026-08-20T18:30:00.000Z",
    createdAt: "2026-05-18T20:15:00.000Z",
    status: "locked",
    visibility: "private",
    mediaType: "photo",
    aiReport: {
      mood: "Soft, overworked, ready to breathe",
      themes: ["rest", "balance", "friendship"],
      presentSelf:
        "You are trying to renegotiate your relationship with effort, and there is a clear wish to make life feel wider than productivity.",
      futureAdvice:
        "If you are calmer now, protect what made that possible. If you are not, begin again without turning it into a punishment.",
      revealSummary:
        "A reminder that recovery was never a detour from becoming yourself."
    }
  },
  {
    id: "launch-day",
    title: "Before the product launch",
    message:
      "I know you are nervous. Ship it anyway. People cannot love, critique, or remember the thing you keep hidden forever.",
    unlockAt: "2026-11-03T10:00:00.000Z",
    createdAt: "2026-05-29T16:40:00.000Z",
    status: "locked",
    visibility: "private",
    mediaType: "video",
    aiReport: {
      mood: "Electric, anxious, ambitious",
      themes: ["career", "shipping", "confidence"],
      presentSelf:
        "You are holding a lot of pressure, but underneath it is a clean desire to finally let your work meet the world.",
      futureAdvice:
        "Do not edit the bravery out of your own story just because the launch was imperfect.",
      revealSummary:
        "This capsule carries the charge of someone standing right before a door."
    }
  },
  {
    id: "family-table",
    title: "The table at home",
    message:
      "Record this: mom laughing at the end of the table, everyone talking over each other, and for once nobody rushing away.",
    unlockAt: "2026-01-01T12:00:00.000Z",
    createdAt: "2023-12-31T22:10:00.000Z",
    status: "unlocked",
    visibility: "anonymous_public",
    mediaType: "audio",
    aiReport: {
      mood: "Warm, grateful, protective",
      themes: ["family", "belonging", "memory"],
      presentSelf:
        "You were noticing the ordinary scene while it was still happening, which means some part of you already knew it mattered.",
      futureAdvice:
        "Make more records of the small rooms where you felt safe. They become maps later.",
      revealSummary:
        "An ordinary family moment preserved before time had a chance to make it rare."
    }
  },
  {
    id: "letter-after-breakup",
    title: "After the breakup",
    message:
      "You think this version of loneliness will last forever. It will not. One day you will be thankful you did not shrink to keep someone.",
    unlockAt: "2025-09-12T08:00:00.000Z",
    createdAt: "2020-09-12T08:00:00.000Z",
    status: "unlocked",
    visibility: "anonymous_public",
    mediaType: "photo",
    aiReport: {
      mood: "Heartbroken, honest, quietly strong",
      themes: ["love", "self-worth", "healing"],
      presentSelf:
        "You were grieving, but the message shows a stubborn instinct for dignity even before the pain had loosened.",
      futureAdvice:
        "Let tenderness return without mistaking it for surrender.",
      revealSummary:
        "A note from the ache, written by someone who had not yet seen how much room would open."
    }
  },
  {
    id: "ten-year-student",
    title: "Ten years from the dorm room",
    message:
      "I do not know if we became impressive. I hope we became kind. I hope we still ask strange questions at 2 a.m.",
    unlockAt: "2024-10-05T02:00:00.000Z",
    createdAt: "2014-10-05T02:00:00.000Z",
    status: "unlocked",
    visibility: "anonymous_public",
    mediaType: "video",
    aiReport: {
      mood: "Young, curious, a little dramatic",
      themes: ["identity", "friendship", "future"],
      presentSelf:
        "You were less interested in certainty than in staying alive to possibility, which is its own kind of wisdom.",
      futureAdvice:
        "Do not become too polished to recognize the odd, bright person who wrote this.",
      revealSummary:
        "A ten-year echo from a room full of cheap lights, big questions, and borrowed confidence."
    }
  },
  {
    id: "first-solo-trip",
    title: "First solo trip",
    message:
      "If this opens later, remember the train window, the blue morning, and the fact that being alone did not mean being abandoned.",
    unlockAt: "2025-04-22T06:15:00.000Z",
    createdAt: "2022-04-22T06:15:00.000Z",
    status: "unlocked",
    visibility: "anonymous_public",
    mediaType: "photo",
    aiReport: {
      mood: "Free, nervous, awake",
      themes: ["independence", "travel", "self-trust"],
      presentSelf:
        "You were testing whether solitude could become a place of strength instead of a place of fear.",
      futureAdvice:
        "Keep giving yourself evidence that you can move through the world on your own terms.",
      revealSummary:
        "A small travel memory that turned into proof of self-trust."
    }
  },
  {
    id: "birthday-voice",
    title: "Voice note before 30",
    message:
      "Thirty sounds huge from here. I hope you stopped apologizing for wanting a beautiful life, not just a useful one.",
    unlockAt: "2028-03-09T09:30:00.000Z",
    createdAt: "2026-03-09T09:30:00.000Z",
    status: "locked",
    visibility: "private",
    mediaType: "audio",
    aiReport: {
      mood: "Tender, expectant, brave",
      themes: ["identity", "age", "desire"],
      presentSelf:
        "You are thinking about adulthood as something you can design instead of something that simply happens to you.",
      futureAdvice:
        "Let wanting more be information, not evidence that you are ungrateful.",
      revealSummary:
        "A birthday capsule about permission, appetite, and the shape of a life."
    }
  },
  {
    id: "rainy-night-code",
    title: "Rainy night code",
    message:
      "It is 1:42 a.m. and the build finally works. Remember this exact feeling: tired, ridiculous, and proud.",
    unlockAt: "2026-12-18T01:42:00.000Z",
    createdAt: "2026-05-30T01:42:00.000Z",
    status: "locked",
    visibility: "private",
    mediaType: "photo",
    aiReport: {
      mood: "Exhausted, playful, proud",
      themes: ["craft", "career", "persistence"],
      presentSelf:
        "You are building proof that stubborn attention can turn confusion into something that runs.",
      futureAdvice:
        "Remember the version of you who stayed with the problem before it became easy to explain.",
      revealSummary:
        "A late-night artifact from the messy middle of learning."
    }
  },
  {
    id: "old-friend-message",
    title: "Message from an old friend",
    message:
      "We used to talk every day. If we drifted, I hope you still remember that some friendships do not disappear; they become rooms you can revisit.",
    unlockAt: "2023-06-02T19:00:00.000Z",
    createdAt: "2018-06-02T19:00:00.000Z",
    status: "unlocked",
    visibility: "anonymous_public",
    mediaType: "audio",
    aiReport: {
      mood: "Nostalgic, gentle, accepting",
      themes: ["friendship", "distance", "memory"],
      presentSelf:
        "You were trying to honor a bond without demanding that it stay frozen in its most intense form.",
      futureAdvice:
        "Reach out when the thought is warm. It does not need to become a whole performance.",
      revealSummary:
        "A soft record of friendship changing shape without losing meaning."
    }
  },
  {
    id: "studio-wall",
    title: "Studio wall photo",
    message:
      "Every sticky note on this wall is a tiny refusal to give up on the larger picture. Please tell me one of them became real.",
    unlockAt: "2024-02-19T15:00:00.000Z",
    createdAt: "2021-02-19T15:00:00.000Z",
    status: "unlocked",
    visibility: "anonymous_public",
    mediaType: "photo",
    aiReport: {
      mood: "Inventive, impatient, alive",
      themes: ["creativity", "craft", "future"],
      presentSelf:
        "You were surrounded by fragments, but the message shows you could already sense a constellation forming.",
      futureAdvice:
        "Keep messy evidence of your imagination. Finished things often need the chaos that came before them.",
      revealSummary:
        "A wall of unfinished ideas that became a portrait of momentum."
    }
  },
  {
    id: "airport-goodbye",
    title: "Airport goodbye",
    message:
      "I cried after security and then bought terrible coffee. Leaving is strange: half grief, half proof that movement is possible.",
    unlockAt: "2022-12-01T07:10:00.000Z",
    createdAt: "2019-12-01T07:10:00.000Z",
    status: "unlocked",
    visibility: "anonymous_public",
    mediaType: "video",
    aiReport: {
      mood: "Raw, courageous, homesick",
      themes: ["travel", "family", "change"],
      presentSelf:
        "You were learning that choosing a new life can coexist with mourning the old one.",
      futureAdvice:
        "Do not flatten brave choices into easy ones. Both truths can stay.",
      revealSummary:
        "A departure note that understood movement as both ache and arrival."
    }
  }
];

export const archiveEntries = capsules.filter(
  (capsule) => capsule.status === "unlocked" && capsule.visibility === "anonymous_public"
);
