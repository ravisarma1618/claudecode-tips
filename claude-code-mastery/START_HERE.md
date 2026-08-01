# Start here

Open this file in your browser:

`C:\mycode\claude code tips\manual\index.html`

The root `index.html` is the complete, data-embedded application built from the ten supplied PDFs. It works directly with a `file:///` URL; no server or installation is required.

## What each lesson contains

Every concept is taught with:

1. a plain-language explanation;
2. an objective and reason it matters;
3. a repeatable procedure;
4. an incorrect and improved prompt or approach;
5. advanced nuance, when-to-use, when-not-to-use, and failure modes;
6. source badges opening the extraction record;
7. a practice exercise and measurable success criterion;
8. a knowledge check.

Nineteen source screenshots or diagrams are placed inside the relevant lessons when they add information, including:

- Agent loop: verification-rigor spectrum
- Prompt briefs: voice-transcription example
- Planning: task-decomposition diagram
- Context management: separated terminal workstreams
- Parallel work: Git worktrees diagram
- Automation: bounded polling/backoff terminal example
- Personal operating manual: Claude Code and editor workflow
- Agent goals, tools, memory, orchestration, human review, observability, and stopping conditions
- Ralph loop architecture
- CLAUDE.md hierarchy and hook enforcement
- Graphify/Obsidian concept graph

All are stored locally under `assets/source-images/`, include alt text and a visible source caption, and are recorded in `data/image-manifest.json`.

## Source explorer

Open `index.html#sources`. It contains ten PDF source cards. Select **View extraction record** to see pages, extraction method, verified coverage, words, headings, images, local PDF path, checksum, and limitations. Open `index.html#topic-audit` for the 49-row topic-to-lesson completeness matrix.

## Optional development commands

```powershell
cd "C:\mycode\claude code tips\manual"
npm install
npm run build
npm run serve
npm test
```

`index.template.html` is the maintainable template. The build embeds the JSON data into both root `index.html` and `dist/index.html`.
