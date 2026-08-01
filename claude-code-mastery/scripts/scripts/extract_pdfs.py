from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

from pypdf import PdfReader

ROOT = Path(r"C:\mycode\claude code tips")
OUT = ROOT / "manual" / "content" / "pdf-extracted"
IMG = ROOT / "manual" / "assets" / "pdf-images"

SOURCES = [
    ("pdf-agentic-10", ROOT / "manual pdf" / "10 Agentic AI Concepts You Need to Master Before 2027.pdf"),
    ("pdf-agentic-15", ROOT / "manual pdf" / "15 Agentic AI Concepts Everyone Needs - by Hamza Khalid.pdf"),
    ("pdf-reddit-25", ROOT / "manual pdf" / "25 Claude Code Tips from 11 Months of Intense Use _ r_ClaudeAI.pdf"),
    ("pdf-ruben-27", ROOT / "manual pdf" / "27 Claude tips after 1,800 hours. - by Ruben Hassid.pdf"),
    ("pdf-linkedin-32", ROOT / "manual pdf" / "32 Claude Code Tips_ From Basics to Advanced - by YK.pdf"),
    ("pdf-official-best-practices", ROOT / "manual pdf" / "Best practices for Claude Code - Claude Code Docs.pdf"),
    ("pdf-ralph-loop", ROOT / "manual pdf" / "Claude Code Ralph Loop_ From Basic Prompts to Autonomous Overnight Builds.pdf"),
    ("pdf-claudemd-masterclass", ROOT / "manual pdf" / "CLAUDE.md Masterclass_ With Hooks, Subagents & Pro Automation.pdf"),
    ("pdf-graphify-obsidian", ROOT / "manual pdf" / "Graphify + Obsidian + Claude Code = CHEAT CODE.pdf"),
    ("pdf-ykdojo-repo", Path(r"C:\mycode\CLAUDE~2\MANUAL~2\YKDOJO~1.PDF")),
]

OUT.mkdir(parents=True, exist_ok=True)
IMG.mkdir(parents=True, exist_ok=True)

manifest = []
for source_id, pdf_path in SOURCES:
    raw = pdf_path.read_bytes()
    reader = PdfReader(pdf_path)
    page_records = []
    headings = []
    links = set()
    extracted_images = []
    source_img_dir = IMG / source_id
    source_img_dir.mkdir(parents=True, exist_ok=True)

    for index, page in enumerate(reader.pages, start=1):
        text = page.extract_text(extraction_mode="layout") or ""
        clean_lines = [re.sub(r"\s+", " ", line).strip() for line in text.splitlines()]
        clean_lines = [line for line in clean_lines if line]
        for line in clean_lines:
            if (re.match(r"^(#{1,6}\s+|(?:Tip|Concept|Step|Phase|Part|Chapter|Rule|Pattern|Level)\s*#?\d+[:.\- ]|\d{1,2}[.)]\s+)", line, re.I)
                    or (len(line) <= 90 and line == line.title() and len(line.split()) >= 2)):
                headings.append({"page": index, "text": line[:180]})
        annotations = page.get("/Annots") or []
        for annotation_ref in annotations:
            try:
                annotation = annotation_ref.get_object()
                action = annotation.get("/A")
                if action and action.get("/URI"):
                    links.add(str(action.get("/URI")))
            except Exception:
                pass
        try:
            for image_index, image in enumerate(page.images, start=1):
                if len(image.data) < 10_000:
                    continue
                suffix = Path(image.name).suffix or ".bin"
                safe_name = f"page-{index:03d}-image-{image_index:02d}{suffix.lower()}"
                destination = source_img_dir / safe_name
                if not destination.exists():
                    destination.write_bytes(image.data)
                extracted_images.append({
                    "page": index,
                    "localPath": destination.relative_to(ROOT / "manual").as_posix(),
                    "bytes": len(image.data),
                })
        except Exception as exc:
            extracted_images.append({"page": index, "error": str(exc)})
        page_records.append({"page": index, "text": "\n".join(clean_lines)})

    all_text = "\n\n".join(f"## Page {p['page']}\n\n{p['text']}" for p in page_records)
    (OUT / f"{source_id}.md").write_text(
        f"# {pdf_path.stem}\n\nSource file: `{pdf_path}`\n\n{all_text}\n", encoding="utf-8"
    )
    record = {
        "id": source_id,
        "file": str(pdf_path),
        "filename": pdf_path.name,
        "sha256": hashlib.sha256(raw).hexdigest(),
        "bytes": len(raw),
        "pages": len(reader.pages),
        "title": str((reader.metadata or {}).get("/Title") or pdf_path.stem),
        "author": str((reader.metadata or {}).get("/Author") or ""),
        "subject": str((reader.metadata or {}).get("/Subject") or ""),
        "textCharacters": sum(len(p["text"]) for p in page_records),
        "wordCount": len(re.findall(r"\b\w+\b", all_text)),
        "headings": headings,
        "links": sorted(links),
        "embeddedImages": extracted_images,
        "extractedText": f"content/pdf-extracted/{source_id}.md",
    }
    manifest.append(record)

(ROOT / "manual" / "data" / "pdf-source-manifest.json").write_text(
    json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8"
)
print(json.dumps([
    {"id": r["id"], "pages": r["pages"], "words": r["wordCount"], "headings": len(r["headings"]), "images": len(r["embeddedImages"])}
    for r in manifest
], indent=2))
